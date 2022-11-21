import React, { TextareaHTMLAttributes } from 'react';
import styles from './Textarea.module.scss';
import cn from 'classnames';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  reactHookFormProps?: Record<string, unknown>;
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  className = '',
  reactHookFormProps,
  ...rest
}) => {
  return (
    <label className={`${styles.label} ${className}`}>
      {label}
      <textarea
        className={cn(styles.textarea, { [`${styles[className || '']}`]: className })}
        {...rest}
        {...reactHookFormProps}
        autoComplete="off"
        rows={8}
        cols={5}
      />
    </label>
  );
};

export default Textarea;

{
  /* <label className={cn(styles.label, className)}>
      {label}
      <input
        className={cn(styles.input, { [`${styles[className || '']}`]: className })} */
}
