import * as React from 'react'

import classNames from 'classnames/bind'
import styles from './Card.module.css'
const cx = classNames.bind(styles)

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = (props: CardProps) => {
  const { className, ...other } = props
  return (
    <div className={cx('root', className)} {...other}/>
  )
}

export default Card