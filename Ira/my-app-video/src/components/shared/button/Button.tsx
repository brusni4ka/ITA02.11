import React from 'react';
import {IButton} from "../../../interfaces/IButton";
import './styles.scss';

export const Button = ({title, className, onClick}: IButton) => {
  return <button className={className} onClick={onClick}>{title}</button>
}
