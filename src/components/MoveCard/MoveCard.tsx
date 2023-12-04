import * as React from 'react'
import Image from 'next/image'
import placeholder from './placeholder.png'

import styles from './MoveCard.module.css'

export interface MoveCardProps {
  title?: React.ReactNode
  posterPath?: string
  releaseDate?: string
}

const MoveCard = (props: MoveCardProps) => {
  const { title, posterPath, releaseDate } = props
  return (
    <div>
      {title}
      <Image
        loading="lazy"
        src={`https://www.themoviedb.org/t/p/w220_and_h330_face${posterPath}`}
        width={220}
        height={330}
        alt="" />
      {releaseDate}
    </div>
  )
}

export default MoveCard