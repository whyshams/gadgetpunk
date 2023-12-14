/*eslint-disable */

'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../_providers/Auth'
import { useCart } from '../../../_providers/Cart'
import Image from 'next/image'
import { Gutter } from '../../../_components/Gutter'
import emailjs from '@emailjs/browser'

import classes from './index.module.scss'

interface data {
  name: string
  address: string
  phone: string
  email: string
}

const page = () => {
  const [orderData, setOrderData] = useState(null)
  const { user } = useAuth()

  const { cart, cartTotal, clearCart } = useCart()

  const data = {
    name: user?.name,
    address: user?.address,
    phone: user?.phone,
    email: user?.email,
    cart: cart?.items,
    cartTotal: cartTotal?.raw,
  }

  const sendOrder = async () => {
    try {
      const response = await fetch('https://gadgetpunkbackend.onrender.com/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // stringify the object
      })

      if (!response.ok) {
        throw new Error('Failed to send order')
      }

      const bigi = await response.json()
      setOrderData(bigi)

      const productDetails = bigi?.cart.map(product => ({
        name: product.product.title,
        quantity: product.quantity,
      }))

      const productInfoString = productDetails
        .map(product => `${product.name} * (${product.quantity})`)
        .join(', ')
      setOrderData(productInfoString)

      const templateParams = {
        user_email: `${bigi?.email}`,
        subject: 'Order Confirmation!',
        to_name: bigi?.name,
        total_taka: bigi?.cartTotal,
        order_id: bigi?._id,
        address: bigi?.address,
        phone: bigi?.phone,
        product: productInfoString,
        method: 'Paid with Bkash',
      }

      emailjs.send('service_63nsj84', 'template_ez778is', templateParams, 'qt16HcWNsvGhYTfa3').then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text)
        },
        function (error) {
          console.log('FAILED...', error)
        },
      )

      const templateOwnerParams = {
        user_email: 'chowdhury.noren@gmail.com',
        subject: 'New Order!',
        to_name: 'Gadget Punk',
        total_taka: bigi?.cartTotal,
        order_id: bigi?._id,
        address: bigi?.address,
        phone: bigi?.phone,
        product: productInfoString,
        method: 'Paid with Bkash',
      }

      emailjs
        .send('service_63nsj84', 'template_ez778is', templateOwnerParams, 'qt16HcWNsvGhYTfa3')
        .then(
          function (response) {
            console.log('SUCCESS!', response.status, response.text)
          },
          function (error) {
            console.log('FAILED...', error)
          },
        )

      console.log('Order confirmed')
    } catch (error) {
      console.error('Error sending order:', error)
    }

    clearCart()
  }
  useEffect(() => {
    if (user !== undefined && cart?.items) {
      sendOrder()
    }
  }, [])

  return (
    <div>
      <Gutter className={classes.message}>
        <div>
          <Image src="/assets/icons/success.svg" alt="success" width={100} height={100} />
        </div>
        <div className={classes.content}>
          <h2>Order Placed Successfully!</h2>
          <p>Check your email for order confirmation</p>
        </div>
      </Gutter>
      <Gutter>
        <div></div>
      </Gutter>
    </div>
  )
}

export default page

/* eslint-enable*/
