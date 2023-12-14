/*eslint-disable*/

'use client'

/* prettier-ignore */ import React, { useEffect, useState } from 'react'

/* prettier-ignore */ import { Product } from '../../../payload/payload-types'
/* prettier-ignore */ import { AddToCartButton } from '../AddToCartButton'
/* prettier-ignore */ import { RemoveFromCartButton } from '../RemoveFromCartButton'
/* prettier-ignore */ import { usePathname } from 'next/navigation'

/* prettier-ignore */ import classes from './index.module.scss'

export const priceFromJSON = (priceJSON: number, quantity: number = 1, raw?: boolean): number => {
  let price

  if (priceJSON) {
    try {
      const priceValue = priceJSON * quantity

      if (raw) return priceValue

      price = priceValue.toLocaleString('en-BD', {
        style: 'currency',
        currency: 'BDT', // TODO: use `parsed.currency`
      })

      // ... (remaining logic)
    } catch (e) {
      console.error(`Cannot parse priceJSON`) // eslint-disable-line no-console
    }
  }

  return price
}

export const Price: React.FC<{
  product: Product
  quantity?: number
  button?: 'addToCart' | 'removeFromCart' | false
}> = props => {
  const { product, product: { priceJSON } = {}, button = 'addToCart', quantity } = props

  const [price, setPrice] = useState<{
    actualPrice: number
    withQuantity: number
  }>(() => ({
    actualPrice: priceFromJSON(priceJSON),
    withQuantity: priceFromJSON(priceJSON, quantity),
  }))

  /* prettier-ignore */ useEffect(() => {
/* prettier-ignore */    setPrice({
/* prettier-ignore */      actualPrice: priceFromJSON(priceJSON),
/* prettier-ignore */      withQuantity: priceFromJSON(priceJSON, quantity),
/* prettier-ignore */    })
 /* prettier-ignore */ }, [priceJSON, quantity])

  /* prettier-ignore */ const pathName = usePathname()

  return (
    <div className={classes.actions}>
      {typeof price?.actualPrice !== 'undefined' && (
        <div className={classes.price}>
          <p>{price?.withQuantity}</p>
          {quantity > 1 && (
            <small className={classes.priceBreakdown}>{`${price.actualPrice} x ${quantity}`}</small>
          )}
        </div>
      )}
      {button && button === 'addToCart' && pathName !== '/products' && (
        <AddToCartButton product={product} appearance="default" />
      )}
      {button && button === 'removeFromCart' && <RemoveFromCartButton product={product} />}
    </div>
  )
}
/*eslint-enable*/
