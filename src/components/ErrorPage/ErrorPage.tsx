import React from 'react'

import Container from "../Container";
import Typography from "../Typography";
import Button from "../Button";

import classNames from 'classnames/bind'
import styles from './ErrorPage.module.css'

const cx = classNames.bind(styles)

export interface ErrorPageProps {
  onClick: () => void
}

const ErrorPage = (props: ErrorPageProps) => {
  const { onClick } = props

  return (
    <div className={cx('root')}>
      <Container className={cx('container')}>
        <Typography fontSize={32} fontWeight={700}>Something went wrong!</Typography>
        <Button onClick={onClick}>Try again</Button>
      </Container>
    </div>
  )
}

export default ErrorPage