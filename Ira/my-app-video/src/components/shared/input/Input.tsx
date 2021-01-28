import React from 'react';
import './styles.scss';

interface IInputProps {
  className: string,
  id: string,
  name: string,
  placeholder: string,
  value: string,

  changeValue(e: string): void,
}

export const Input = ({
                        className,
                        value,
                        changeValue,
                        id,
                        name,
                        placeholder,
                      }: IInputProps) => {
  return (
      <input
        className={className}
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={e => changeValue(e.currentTarget.value)}
      />
  );
}
