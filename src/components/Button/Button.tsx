import * as React from 'react'

import ButtonBase, { ButtonBaseProps } from '../ButtonBase'

import classNames from 'classnames/bind'
import styles from './Button.module.css'

const cx = classNames.bind(styles)

export interface ButtonProps extends ButtonBaseProps {
  fullWidth?: boolean
}

const Button = (props: ButtonProps) => {
  const { className, fullWidth, ...other } = props

  return (
    <ButtonBase className={cx('root', fullWidth && 'fullWidth')} {...other} />
  )
}

export default Button