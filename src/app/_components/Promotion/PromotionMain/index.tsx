'use client'

import React, { useEffect,useState } from 'react'

import PromotionComp from '..'

const PromotionMain: React.FC = () => {
  const [data, setData] = useState<any>()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/promotion')
      const response = await res.json()
      setData(response?.docs)
    }
    try {
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <div>
      {data?.map(d => (
        <div key={d.id}>
          <PromotionComp promotionData={d} />
        </div>
      ))}
    </div>
  )
}

export default PromotionMain
