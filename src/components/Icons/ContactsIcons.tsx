import React from 'react';
import classNames from 'classnames';

import { Icon } from 'types/types';

import styles from './Icon.module.scss';

const { icon } = styles;

const GithubIcon = ({ className }: Icon): JSX.Element => {
  return (
    <svg
      fill="none"
      className={classNames(icon, className)}
      width="30"
      height="30"
      viewBox="0 0 30 30"
      id="github"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 0H27C28.65 0 30 1.35 30 3V27C30 28.65 28.65 30 27 30H19.1325C19.1329 29.9292 19.1332 29.8553 19.1336 29.7787C19.1392 28.6893 19.1477 27.0448 19.1477 25.6702C19.1477 24.2351 18.6557 23.2966 18.1044 22.8217C21.5298 22.4412 25.1261 21.1411 25.1261 15.2327C25.1261 13.554 24.5313 12.1803 23.5456 11.1058C23.7032 10.7168 24.231 9.15241 23.3917 7.03564C23.3917 7.03564 22.1029 6.6221 19.1665 8.61236C17.9382 8.27058 16.623 8.10063 15.3162 8.09402C14.0086 8.10063 12.6924 8.27058 11.466 8.61236C8.52772 6.6221 7.23708 7.03564 7.23708 7.03564C6.3996 9.15241 6.92739 10.7168 7.08601 11.1058C6.10219 12.1803 5.50264 13.554 5.50264 15.2327C5.50264 21.126 9.09327 22.4459 12.5083 22.834C12.0693 23.2182 11.6718 23.8961 11.5321 24.8894C10.6559 25.2831 8.42763 25.9619 7.05577 23.6119C7.05577 23.6119 6.2438 22.1353 4.7001 22.0267C4.7001 22.0267 3.19794 22.0079 4.59435 22.9614C4.59435 22.9614 5.60271 23.4344 6.30234 25.2113C6.30234 25.2113 7.20496 28.2024 11.483 27.2733C11.4852 27.6601 11.488 28.1091 11.4908 28.5576C11.494 29.0702 11.4972 29.5821 11.4996 30H3C1.35 30 0 28.65 0 27V3C0 1.35 1.35 0 3 0Z" />
    </svg>
  );
};

export default GithubIcon;
