import * as React from 'react'

import Link from 'next/link'
import Typography from '@/components/Typography'
import PosterImage from '@/components/PosterImage'

import className from 'classnames/bind'
import styles from './MoveCard.module.css'
const cx = className.bind(styles)
    
export interface MoveCardProps {
  href: string
  className?: string
  title?: string
  posterPath?: string | null
  releaseDate?: string
}

const MoveCard = (props: MoveCardProps) => {
  const { className, title = "", posterPath, releaseDate, href } = props
  
  return (
    <div className={cx('root', className)}>
      <Link href={href}>
        <PosterImage className={cx('img')} src={posterPath} alt={title} />
      </Link>
      <div className={cx('card-body')}>
        <Typography>{title}</Typography>
        <Typography>{releaseDate}</Typography>
      </div>
    </div>
  )
}

export default MoveCard