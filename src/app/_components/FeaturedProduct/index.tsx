/*eslint-disable*/

/* prettier-ignore */ import React from 'react'

/* prettier-ignore */ import ProductCarousel from '../LatestProduct/ProductCarousal'

/* prettier-ignore */ import classes from './index.module.scss'

const getProduct = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/featured`)
  return res.json()
}

const FeaturedProduct = async () => {
  // const [products, setProducts] = useState(null)

  const products = await getProduct()

  {
    /*

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

*/
  }

  return (
    <div className={classes.container}>
      <div className={classes.titleWrapper}>
        <h3>Featured Produtcs</h3>
      </div>
      <div>
        <ProductCarousel products={products.docs[0].relatedProducts} />
      </div>
    </div>
  )
}

export default FeaturedProduct
/*eslint-enable*/
