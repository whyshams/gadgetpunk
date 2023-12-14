/*eslint-disable*/

/* prettier-ignore */ import React from 'react'

/* prettier-ignore */ import ProductCarousel from './ProductCarousal'

/* prettier-ignore */ import classes from './index.module.scss'

const getProduct = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products`)
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const LatestProduct = async () => {
  const products = await getProduct()

  return (
    <div className={classes.container}>
      <div className={classes.titleWrapper}>
        <h3>New Collection</h3>
      </div>
      <div>
        <ProductCarousel products={products?.docs} />
      </div>
    </div>
  )
}

export default LatestProduct
/*eslint-enable*/
