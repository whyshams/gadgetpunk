'use client'

import React, { useEffect,useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Footer, Media } from '../../../payload/payload-types'
import { fetchFooter } from '../../_api/fetchGlobals'
import { Button } from '../Button'

import classes from './index.module.scss'

const SocialIcons = () => {
  let social: Footer | null = null

  const [footer, setFooter] = useState(social)

  const getSocial = async () => {
    try {
      const data = await fetchFooter()
      setFooter(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getSocial()
  }, [])

  const pathname = usePathname()
  const navItems = footer?.navItems || []

  return (
    <div className={classes.socialLinks}>
      {navItems.map(item => {
        const icon = item?.link?.icon as Media

        return (
          <Button
            key={item.link.label}
            el="link"
            href={item.link.url}
            newTab={true}
            className={classes.socialLinkItem}
          >
            <Image
              src={icon?.url}
              alt={item.link.label}
              width={24}
              height={24}
              className={classes.socialIcon}
            />
          </Button>
        )
      })}
    </div>
  )
}

export default SocialIcons
