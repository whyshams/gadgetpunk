/*eslint-disable*/

'use client'

/* prettier-ignore */ import React from 'react'
/* prettier-ignore */ import Slider from 'react-slick'
/* prettier-ignore */ import { GrNext, GrPrevious } from 'react-icons/gr'
/* prettier-ignore */ import { IconContext } from 'react-icons'
/* prettier-ignore */ import 'slick-carousel/slick/slick.css'
/* prettier-ignore */ import 'slick-carousel/slick/slick-theme.css'

/* prettier-ignore */ import classes from './index.module.scss'
/* prettier-ignore */ import Image from 'next/image'
/* prettier-ignore */ import Link from 'next/link'

const ProductCarousel = ({ products }) => {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props
    return (
      <IconContext.Provider value={{ style: { fontSize: '30px', float: 'right' } }}>
        <div onClick={onClick}>
          <GrNext />
        </div>
      </IconContext.Provider>
    )
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props
    return (
      <IconContext.Provider value={{ style: { fontSize: '30px', float: 'left' } }}>
        <div onClick={onClick}>
          <GrPrevious />
        </div>
      </IconContext.Provider>
    )
  }

  const settings = {
    infinite: true,
    autoplay: true,
    pauseOnHover: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className={classes.container}>
      <Slider {...settings}>
        {products?.map((product, index) => (
          <div key={index} className={classes.card}>
            <Link href={`/products/${product?.slug}`}>
              <div className={classes.cardContent}>
                <div className={classes.img}>
                  <Image
                    src={product?.meta?.image?.url}
                    alt={product?.title}
                    width={150}
                    height={200}
                  />
                </div>

                <h3>{product?.title}</h3>
                <p>{product?.meta?.description}</p>
                <p>Price: {product?.priceJSON} TK</p>
              </div>
            </Link>
            {/* Add more product details as needed */}
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default ProductCarousel
/*eslint-enable*/
