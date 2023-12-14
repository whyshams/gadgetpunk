/*eslint-disable*/

'use client'

/* prettier-ignore */ import React, { useState, useEffect } from 'react'

/* prettier-ignore */ import ProductCarousel from './ProductCarousal'

/* prettier-ignore */ import classes from './index.module.scss'

const LatestProduct: React.FC = () => {
  const [products, setProducts] = useState(null)

  const getProduct = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products`)
        .then(r => r.json())
        .then(d => setProducts(d.docs))
    } catch (error) {
      console.log(error)
    }
  }
  /* prettier-ignore */ useEffect(() => {
 /* prettier-ignore */   getProduct()
  /* prettier-ignore */}, [])

  return (
    <div className={classes.container}>
      <div className={classes.titleWrapper}>
        <h3>New Collection</h3>
      </div>
      <div>
        <ProductCarousel products={products} />
      </div>
    </div>
  )
}

export default LatestProduct
/*eslint-enable*/
