'use client'

import * as React from 'react'

import Image from 'next/image'
import Typography from '@/components/Typography'

import notfoundImage from './image-not-found.jpg'
import className from 'classnames/bind'
import styles from './MoveCard.module.css'
const cx = className.bind(styles)

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)
    
export interface MoveCardProps {
  className?: string
  title?: string
  posterPath?: string
  releaseDate?: string
}

const MoveCard = (props: MoveCardProps) => {
  const { className, title = "", posterPath, releaseDate } = props
  const [error, setError] = React.useState(false)

  const handleError = () => {
    setError(true)
  }

  return (
    <div className={cx('root', className)}>
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
      <div className={cx('card-body')}>
        <Typography color='black'>{title}</Typography>
        <Typography color='black'>{releaseDate}</Typography>
      </div>
    </div>
  )
}

export default MoveCard