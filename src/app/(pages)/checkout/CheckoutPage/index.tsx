/* eslint-disable */

'use client'

/* prettier-ignore */ import React, { Fragment, useEffect } from 'react'
/* prettier-ignore */ import { loadStripe } from '@stripe/stripe-js'
/* prettier-ignore */ import Link from 'next/link'
/* prettier-ignore */ import { useRouter } from 'next/navigation'
/* prettier-ignore */ import axios from 'axios'
/* prettier-ignore */ import { Settings } from '../../../../payload/payload-types'
/* prettier-ignore */ import { HR } from '../../../_components/HR'
/* prettier-ignore */ import { Media } from '../../../_components/Media'
/* prettier-ignore */ import { Price } from '../../../_components/Price'
/* prettier-ignore */ import { useAuth } from '../../../_providers/Auth'
/* prettier-ignore */ import { useCart } from '../../../_providers/Cart'
/* prettier-ignore */ import { useTheme } from '../../../_providers/Theme'

/* prettier-ignore */ import classes from './index.module.scss'

const apiKey = `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
const stripe = loadStripe(apiKey)
/* eslint-enable */

export const CheckoutPage: React.FC<{
  settings: Settings
}> = props => {
  const {
    settings: { productsPage },
  } = props

  const { user } = useAuth()
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)
  const [clientSecret, setClientSecret] = React.useState()
  const [hasMadePaymentIntent, setHasMadePaymentIntent] = React.useState(false)
  const { theme } = useTheme()

  const { cart, cartIsEmpty, cartTotal } = useCart()

  useEffect(() => {
    if (user !== null && cartIsEmpty) {
      router.push('/cart')
    }
  }, [router, user, cartIsEmpty])

  const makeIntent = async () => {
    try {
      const { data } = await axios.post(
        'https://gadgetpunkbackend.onrender.com/api/bkash/payment/create',
        { amount: cartTotal, orderId: 1 },
        { withCredentials: true },
      )
      console.log(data)
      window.location.href = data.bkashURL
    } catch (e) {
      setError('Something went wrong.')
    }
  }

  return (
    <Fragment>
      {cartIsEmpty && (
        <div>
          {'Your '}
          <Link href="/cart">cart</Link>
          {' is empty.'}
          {typeof productsPage === 'object' && productsPage?.slug && (
            <Fragment>
              {' '}
              <Link href={`/${productsPage.slug}`}>Continue shopping?</Link>
            </Fragment>
          )}
        </div>
      )}
      {!cartIsEmpty && (
        <div className={classes.items}>
          {cart?.items?.map((item, index) => {
            if (typeof item.product === 'object') {
              const {
                quantity,
                product,
                product: { id, title, meta },
              } = item

              if (!quantity) return null

              const isLast = index === (cart?.items?.length || 0) - 1

              const metaImage = meta?.image

              return (
                <Fragment key={index}>
                  <div className={classes.row}>
                    <div className={classes.mediaWrapper}>
                      {!metaImage && <span className={classes.placeholder}>No image</span>}
                      {metaImage && typeof metaImage !== 'string' && (
                        <Media
                          className={classes.media}
                          imgClassName={classes.image}
                          resource={metaImage}
                          fill
                        />
                      )}
                    </div>
                    <div className={classes.rowContent}>
                      <h6 className={classes.title}>{title}</h6>
                      <Price product={product} button={false} quantity={quantity} />
                    </div>
                  </div>
                  {!isLast && <HR />}
                </Fragment>
              )
            }
            return null
          })}
          <div className={classes.orderTotal}>{`Order total: ${cartTotal.formatted}`}</div>
          <button onClick={makeIntent}>Pay Now</button>
        </div>
      )}
    </Fragment>
  )
}
