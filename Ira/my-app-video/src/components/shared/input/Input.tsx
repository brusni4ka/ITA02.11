import React from 'react';
import './styles.scss';

interface IInputProps {
  value: string,

  changeValue(e: string): void,
}

export const Input = ({
                        value,
                        changeValue,
                      }: IInputProps) => {
  return (
    <>
      <input
        className="form-input"
        type="text"
        id="search"
        name="search"
        placeholder="search..."
        value={value}
        onChange={e => changeValue(e.currentTarget.value)}
      />
    </>
  );
}
