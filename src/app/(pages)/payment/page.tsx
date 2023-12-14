/* eslint-disable*/

'use client'

/* prettier-ignore */ import React, { Fragment, useEffect, useState } from 'react'

/* prettier-ignore */ import { useRouter } from 'next/navigation'

/* prettier-ignore */ import { useAuth } from '../../_providers/Auth'
/* prettier-ignore */ import { useCart } from '../../_providers/Cart'

/* prettier-ignore */ import axios from 'axios'
import { Gutter } from '../../_components/Gutter'
import Image from 'next/image'
import Link from 'next/link'

import classes from './index.module.scss'
import { HR } from '../../_components/HR'

export default function Payment() {
  /* prettier-ignore */ const { user } = useAuth()
  /* prettier-ignore */ const router = useRouter()
  /* prettier-ignore */ const [error, setError] = useState(null)

  /* prettier-ignore */ const { cart, cartIsEmpty, cartTotal, clearCart } = useCart()

  useEffect(() => {
    if (user !== null && cartIsEmpty) {
      router.push('/cart')
    }
  }, [router, user, cartIsEmpty])

  const makePayment = async () => {
    try {
      const { data } = await axios.post(
        'https://gadgetpunkbackend.onrender.com/api/bkash/payment/create',
        { amount: cartTotal?.raw, orderId: 1 },
        { withCredentials: true },
      )

      window.location.href = data.bkashURL
    } catch (e) {
      setError('Something went wrong.')
    }
  }

  return (
    <Fragment>
      <Gutter>
        <div className={classes.container}>
          <h2>Pay with</h2>
          <div onClick={makePayment}>
            <Image className={classes.bkash} src="bkash.svg" alt="bkash" width={200} height={50} />
          </div>
          <div className={classes.flex}>
            <h2>Or</h2>
          </div>
          <div>
            <div className={classes.bkash}>
              <Link href="/order/success">
                <p>Cash On Delivery</p>
              </Link>
            </div>
          </div>
        </div>
      </Gutter>
    </Fragment>
  )
}
/*eslint-enable*/
