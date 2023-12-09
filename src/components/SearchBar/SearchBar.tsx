import * as React from 'react'

import classNames from 'classnames/bind'
import styles from './SearchBar.module.css'

const cx = classNames.bind(styles)

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement>{

}

const SearchBar = (props: SearchBarProps) => {
  return (
    <div className={cx('root')}>
      <input className={cx('input')} placeholder='Search Movies' {...props}/>
    </div>
  )
}

export default SearchBar