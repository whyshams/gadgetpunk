/*eslint-disable*/

'use client'

/* prettier-ignore */ import React, { useState, useEffect } from 'react'

/* prettier-ignore */ import ProductCarousel from '../LatestProduct/ProductCarousal'

/* prettier-ignore */ import classes from './index.module.scss'

const FeaturedProduct: React.FC = () => {
  const [products, setProducts] = useState(null)

  const getProduct = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/featured`)
        .then(r => r.json())
        .then(d => setProducts(d.docs[0].relatedProducts))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getProduct()
  }, [])

  return (
    <div className={classes.container}>
      <div className={classes.titleWrapper}>
        <h3>Featured Produtcs</h3>
      </div>
      <div>
        <ProductCarousel products={products} />
      </div>
    </div>
  )
}

export default FeaturedProduct
/*eslint-enable*/
