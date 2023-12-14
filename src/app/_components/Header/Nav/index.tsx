'use client'

import React from 'react'
import Link from 'next/link'

import { Header as HeaderType } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { Button } from '../../Button'
import { CartLink } from '../../CartLink'
import { CMSLink } from '../../Link'

import classes from './index.module.scss'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  const { user } = useAuth()

  return (
    <div>
      <div className={classes.mobile_hide}>
        <div className={classes.navnav}>
          <nav
            className={[classes.nav, user === undefined && classes.hide].filter(Boolean).join(' ')}
          >
            {navItems.map(({ link }, i) => {
              return <CMSLink key={i} {...link} />
            })}
            {!user && <CartLink />}
            {user && <Link href="/account">Account</Link>}

            {user && <CartLink />}
          </nav>
          <div className={classes.loginbtnwrap}>
            {!user && (
              <div className={classes.loginbtn}>
                <Link href="/login">Login</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
