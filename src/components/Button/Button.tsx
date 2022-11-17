import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

const { button, btnIcon } = styles;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: 'close' | 'confirm' | 'cancel' | 'boardBtn';
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, kind, icon, ...rest }) => {
  return (
    <button
      className={classNames(button, { [`${styles[kind || '']}`]: kind }, className)}
      {...rest}
    >
      {icon && <span className={btnIcon}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
