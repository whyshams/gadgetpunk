/*eslint-disable*/

/* prettier-ignore */ import React, { Fragment } from 'react'

/* prettier-ignore */ import { Category, Product } from '../../../payload/payload-types'
/* prettier-ignore */ import { AddToCartButton } from '../../_components/AddToCartButton'
/* prettier-ignore */ import { Gutter } from '../../_components/Gutter'
/* prettier-ignore */ import { Media } from '../../_components/Media'
/* prettier-ignore */ import { Price } from '../../_components/Price'

/* prettier-ignore */ import classes from './index.module.scss'
/* prettier-ignore */ import { Blocks } from '../../_components/Blocks'

export const ProductHero: React.FC<{
  product: Product
}> = ({ product }) => {
  const { title, categories, layout, meta: { image: metaImage, description } = {} } = product

  return (
    <>
      <Gutter className={classes.productHero}>
        <div className={classes.mediaWrapper}>
          {!metaImage && <div className={classes.placeholder}>No image</div>}
          {metaImage && typeof metaImage !== 'string' && (
            <Media imgClassName={classes.image} resource={metaImage} fill />
          )}
        </div>

        <div className={classes.details}>
          <h3 className={classes.title}>{title}</h3>

          <div className={classes.categoryWrapper}>
            <div className={classes.categories}>
              {categories?.map((category, index) => {
                const { title: categoryTitle } = category as Category

                const titleToUse = categoryTitle || 'Generic'
                const isLast = index === categories.length - 1

                return (
                  <p key={index} className={classes.category}>
                    {titleToUse} {!isLast && <Fragment>, &nbsp;</Fragment>}
                    <span className={classes.separator}>|</span>
                  </p>
                )
              })}
            </div>
            <p className={classes.stock}> In stock</p>
          </div>

          <Price product={product} button={false} />

          <div className={classes.description}>
            <h6>Description</h6>
            <p>{description}</p>
          </div>
          <div>
            <AddToCartButton product={product} className={classes.addToCartButton} />
          </div>
        </div>
      </Gutter>

      <Blocks blocks={layout} />
    </>
  )
}
/*eslint-enable*/
