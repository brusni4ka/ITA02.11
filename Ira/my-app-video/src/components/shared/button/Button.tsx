import React from 'react';
import {Link} from 'react-router-dom';
import {IButtonProps} from "../../../interfaces/IButtonProps";
import './styles.scss';

export const Button = ({
                         title,
                         className,
                         onClick,
                         type = "button",
                         isLink = false,
                         to = '',
                         id,
                       }: IButtonProps) => {

  return (
    <>
      {
        isLink ?
          <Link className={className} to={to}>{title}</Link>
          :
          <button
            className={className}
            onClick={onClick}
            type={type}
            id={id}
          >{title}</button>
      }
    </>
  )
}
