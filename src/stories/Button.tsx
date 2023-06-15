import React, { ButtonHTMLAttributes } from 'react';
import './button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ primary = false, backgroundColor, size = 'medium', label, ...props }: ButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  const buttonStyle = backgroundColor ? { backgroundColor } : {};

  return (
    <button type="button" className={['storybook-button', `storybook-button--${size}`, mode].join(' ')} style={buttonStyle} {...props}>
      {label}
    </button>
  );
};
