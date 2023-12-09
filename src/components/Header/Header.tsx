import * as React from 'react'

import Link from 'next/link'

import className from 'classnames/bind'
import styles from './Header.module.css'

const cx = className.bind(styles)

const Header = () => {
  return (
    <header className={cx('root')}>
      <div className={cx('content')}>
        <Link href="/" className={cx('logo')}>
          Dog Cat Stater
        </Link>
        <Link href="/watchlist">Watch List</Link>
      </div>
    </header>
  )
}

export default Header