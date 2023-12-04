
import React from 'react';

import cx from 'classnames'
import styles from './Grid.module.css';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  container?: boolean;
}

const Grid = (props: GridProps) => {
  const { className, container, ...other } = props;
  return <div className={cx('root', className, {
    [styles.item]: !container,
    [styles.container]: container,
  })} {...other} />
};

export default Grid;
