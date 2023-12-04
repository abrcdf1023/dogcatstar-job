import * as React from 'react'

import cx from 'classnames'
import styles from './Container.module.css'

export interface ContainerProps {
  className?: string
}

const Container = (props: React.PropsWithChildren<ContainerProps>) => {
  const { className } = props
  return (
    <div className={cx(styles.root, className)} {...props}></div>
  )
}

export default Container