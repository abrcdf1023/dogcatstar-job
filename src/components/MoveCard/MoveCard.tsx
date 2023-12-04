import * as React from 'react'

import cx from 'classnames'
import Image from 'next/image'
import Typography from '@/components/Typography'

import styles from './MoveCard.module.css'

export interface MoveCardProps {
  className?: string
  title?: string
  posterPath?: string
  releaseDate?: string
}

const MoveCard = (props: MoveCardProps) => {
  const { className, title = "", posterPath, releaseDate } = props
  return (
    <div className={cx(styles.root, className)}>
      <Typography>{title}</Typography>
      <Image
        className={styles.img}
        loading="lazy"
        src={`https://www.themoviedb.org/t/p/w220_and_h330_face${posterPath}`}
        width={220}
        height={330}
        alt={title}
      />
      <Typography>{releaseDate}</Typography>
    </div>
  )
}

export default MoveCard