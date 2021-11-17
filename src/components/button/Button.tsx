import React, { FC, MouseEventHandler, ReactNode } from 'react';

import styles from './Button.module.scss';

export interface ButtonProps {
  children?: ReactNode;
  testId?: string;
  variant?: 'link' | 'dark';
  icon?: string;
  className?: string;
  tooltip?: string;
  isDisabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = ({
  children,
  testId,
  icon,
  variant,
  tooltip,
  isDisabled,
  className,
  onClick,
}) => {
  const classNames = `${styles.button} ${variant ? styles[variant] : ''} ${
    children ? '' : styles['iconButton']
  } ${className}`;

  return (
    <button
      type="button"
      data-testid={testId || 'button'}
      className={classNames}
      disabled={isDisabled}
      title={tooltip}
      onClick={onClick}
    >
      {children}
      {icon && <i className={`${styles.icon} ${icon}`} />}
    </button>
  );
};

export default Button;
