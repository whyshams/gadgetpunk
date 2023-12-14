/* eslint-disable*/

'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/confirmation/Bkash')
  }, [])
  return <div>redirecting....</div>
}

export default Page

/* eslint-enable*/
