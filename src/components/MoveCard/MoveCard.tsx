'use client'

import * as React from 'react'

import Image from 'next/image'
import Typography from '@/components/Typography'
import Link from 'next/link'

import className from 'classnames/bind'
import shimmer from '@/utils/shimmer'
import toBase64 from '@/utils/toBase64'
import notfoundImage from './image-not-found.jpg'
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
  const [error, setError] = React.useState(!posterPath)

  const handleError = () => {
    setError(true)
  }

  return (
    <div className={cx('root', className)}>
      <Link href={href}>
        <Image
          className={cx('img')}
          loading="lazy"
          src={error ? notfoundImage : `https://www.themoviedb.org/t/p/w220_and_h330_face${posterPath}`}
          width={220}
          height={330}
          alt={title}
          placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(220, 330))}`}
          onError={handleError}
        />
      </Link>
      <div className={cx('card-body')}>
        <Typography color='black'>{title}</Typography>
        <Typography color='black'>{releaseDate}</Typography>
      </div>
    </div>
  )
}

export default MoveCard