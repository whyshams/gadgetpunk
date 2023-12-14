'use client'
import React from 'react'
import { IconContext } from 'react-icons'
import { CiCircleMinus } from 'react-icons/ci'
import Link from 'next/link'

import { Category , Media } from '../../../../payload/payload-types'
import { useFilter } from '../../../_providers/Filter'

import classes from './index.module.scss'

type CategoryCardProps = {
  category: Category
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const media = category.media as Media
  const { setCategoryFilters } = useFilter()

  return (
    <Link
      href="/products"
      className={classes.card}
      style={{ backgroundImage: `url(${media.url})` }}
      onClick={() => setCategoryFilters([category.id])}
    >
      <div className={classes.title}>
        <p>{category.title}</p>
        <div className={classes.button}>
          <IconContext.Provider
            value={{
              color: '#fdd51d',
              size: '40',
            }}
          >
            <CiCircleMinus />
          </IconContext.Provider>
          <div>MORE</div>
        </div>
      </div>
    </Link>
  )
}

export default CategoryCard
