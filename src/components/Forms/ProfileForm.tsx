import React, { useEffect, useState } from 'react';
import styles from './Forms.module.scss';
import Input from '../Input/Input';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Button from '../Button/Button';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { loginOptions, nameOptions, passwordOptions } from './formInputOptions';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import {
  deleteUser,
  logout,
  resetLoadingStatus,
  selectUser,
  selectUserLoadingStatus,
  selectUserUpdatingStatus,
  updateUser,
} from '../../store/userSlice';
import { SignUpResponse } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import Modal from '../Modal';
import ConfirmationModal from '../Modal/ConfirmationModal';
import modalStyles from '../Modal/ConfirmationModal/ConfirmationModal.module.scss';

const ProfileForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userLoadingStatus = useAppSelector(selectUserLoadingStatus);
  const userUpdatingStatus = useAppSelector(selectUserUpdatingStatus);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const isLoading = userLoadingStatus === 'loading' || userUpdatingStatus === 'loading';

  useEffect(() => {
    return () => {
      dispatch(resetLoadingStatus());
    };
  }, []);

  const nameInputParams = {
    ...register('name', nameOptions),
  };
  const loginInputParams = {
    ...register('login', loginOptions),
  };
  const passwordInputParams = {
    ...register('password', passwordOptions),
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const args = {
      id: user.id,
      userData: data as SignUpResponse,
    };
    dispatch(updateUser(args)).then((response) => {
      if (response.type === 'user/updateUser/rejected') {
        setErrorMessage(response.payload as string);
      }
    });
  };

  const handleDeleteUserClick = async () => {
    await dispatch(deleteUser(user.id));
    navigate('/auth');
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate('/auth');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Enter your name:"
        defaultValue={user.name}
        reactHookFormProps={nameInputParams}
      />
      {errors.name && <ErrorMessage>{errors.name.message as string}</ErrorMessage>}
      <Input
        label="Enter your login:"
        defaultValue={user.login}
        reactHookFormProps={loginInputParams}
      />
      {errors.login && <ErrorMessage>{errors.login.message as string}</ErrorMessage>}
      <Input label="Choose password:" type="password" reactHookFormProps={passwordInputParams} />
      {errors.password && <ErrorMessage>{errors.password.message as string}</ErrorMessage>}
      <div className={styles.buttons}>
        <Button className={styles.sign} type="submit" disabled={isLoading}>
          Update profile
        </Button>
        <Button
          className={styles.back}
          type="button"
          onClick={handleLogoutClick}
          disabled={isLoading}
        >
          Logout
        </Button>
        <Button
          className={styles.delete}
          type="button"
          onClick={() => {
            setIsModalOpened(true);
          }}
          disabled={isLoading}
        >
          Delete user
        </Button>
      </div>
      {isLoading && <Loader />}
      {(userLoadingStatus === 'failed' || userUpdatingStatus === 'failed') && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
      {userUpdatingStatus === 'succeeded' && <ErrorMessage>User data updated</ErrorMessage>}
      <Modal
        kind={'confirmation'}
        onClose={() => {
          setIsModalOpened(false);
        }}
        isOpen={isModalOpened}
      >
        <p className={modalStyles.content}>WARNING! Your profile will be permanently deleted!</p>
        <ConfirmationModal
          entity="user"
          onCancel={() => {
            setIsModalOpened(false);
          }}
          onConfirm={handleDeleteUserClick}
        />
      </Modal>
    </form>
  );
};

export default ProfileForm;
