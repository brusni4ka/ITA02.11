export interface IButtonProps {
  title: string,
  className: string,
  type?: 'submit' | 'button',
  isLink?: boolean,
  to?: string

  onClick?(e?: any): void,
}
