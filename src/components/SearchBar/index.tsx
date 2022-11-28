import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';

import { SearchData } from 'types/types';

import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import { SearchIcon } from 'components/Icons/Icons';

import styles from './SearchBar.module.scss';

const { form, btn, iconContainer, icon, inputWrapper, clear, input } = styles;

type SearchBarProps = {
  className?: string;
  placeholder?: string;
  onSubmit: (data: string) => void;
  value: string;
  saveSearchValue: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  className,
  placeholder = 'Search...',
  onSubmit,
  value,
  saveSearchValue,
}) => {
  const { register, handleSubmit, watch, setValue, setFocus, getValues } = useForm<SearchData>({
    defaultValues: { search: value },
  });
  const watchSearch = watch('search');

  const searchInputParams = {
    ...register('search'),
  };

  const handleClear = () => {
    setValue('search', '');
    setFocus('search', { shouldSelect: true });
  };

  const submit = ({ search }: SearchData) => {
    onSubmit(search);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      onSubmit(getValues('search'));
    }
  };

  useEffect(() => {
    !value && setValue('search', value);
  }, [setValue, value]);

  useEffect(() => {
    return () => {
      saveSearchValue(getValues('search'));
    };
  }, [getValues, saveSearchValue]);

  return (
    <form className={classNames(form, className)} onSubmit={handleSubmit(submit)}>
      <Input
        className={inputWrapper}
        inputClassName={input}
        placeholder={placeholder}
        reactHookFormProps={searchInputParams}
        onKeyDown={handleKeyDown}
      />
      {watchSearch && <Button className={clear} kind="close" onClick={handleClear} />}
      <Button
        className={classNames(btn)}
        iconClassName={iconContainer}
        type="submit"
        icon={<SearchIcon className={icon} />}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
      />
    </form>
  );
};

export default SearchBar;
