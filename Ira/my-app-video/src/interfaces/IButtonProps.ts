export interface IButtonProps {
  title: string,
  className: string,
  type?: 'submit' | 'button',
  isLink?: boolean,
  to?: string,
  id?: string,

  onClick?(e?: any): void,
}
