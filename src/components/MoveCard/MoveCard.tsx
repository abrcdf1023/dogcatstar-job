import * as React from 'react'

import Image from 'next/image'
import Typography from '@/components/Typography'

import className from 'classnames/bind'
import styles from './MoveCard.module.css'
const cx = className.bind(styles)

export interface MoveCardProps {
  className?: string
  title?: string
  posterPath?: string
  releaseDate?: string
}

const MoveCard = (props: MoveCardProps) => {
  const { className, title = "", posterPath, releaseDate } = props
  return (
    <div className={cx('root', className)}>
      <Image
        className={cx('img')}
        loading="lazy"
        src={`https://www.themoviedb.org/t/p/w220_and_h330_face${posterPath}`}
        width={220}
        height={330}
        alt={title}
      />
      <div className={cx('card-body')}>
        <Typography color='black'>{title}</Typography>
        <Typography color='black'>{releaseDate}</Typography>
      </div>
    </div>
  )
}

export default MoveCard