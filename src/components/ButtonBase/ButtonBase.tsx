import * as React from 'react'

import className from 'classnames/bind'
import styles from './ButtonBase.module.css'
const cx = className.bind(styles)

export interface ButtonBaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const ButtonBase = (props: ButtonBaseProps) => {
  const { className, ...other } = props
  return (
    <button className={cx('root', className)} {...other} />
  )
}