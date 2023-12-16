/*eslint-disable*/

'use client'

/* prettier-ignore */ import React, { useState } from 'react'

/* prettier-ignore */ import Link from 'next/link'
/* prettier-ignore */ import { usePathname } from 'next/navigation'

/* prettier-ignore */ import { Header } from '../../../../payload/payload-types'
/* prettier-ignore */ import { noHeaderFooterUrls } from '../../../constants'

/* prettier-ignore */ import { Gutter } from '../../Gutter'
/* prettier-ignore */ import { HeaderNav } from '../Nav'

/* prettier-ignore */ import classes from './index.module.scss'
/* prettier-ignore */ import { MobileNav } from '../MobileNav'
/* prettier-ignore */ import { HiMenuAlt3 } from 'react-icons/hi'
/* prettier-ignore */ import { RxCross2 } from 'react-icons/rx'
/* prettier-ignore */ import { IconContext } from 'react-icons'

const HeaderComponent = ({ header }: { header: Header }) => {
  const pathname = usePathname()
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div>
      <nav
        className={[classes.header, noHeaderFooterUrls.includes(pathname) && classes.hide]
          .filter(Boolean)
          .join(' ')}
      >
        <Gutter className={classes.wrap}>
          <Link href="/">
            <img style={{ width: '100%', height: '100px' }} src="/gadgetlogo.png" alt="logo" />
          </Link>

          <HeaderNav header={header} />
        </Gutter>
      </nav>
      <div>
        <div className={classes.menu_icon} onClick={() => setNavOpen(!navOpen)}>
          <div className={classes.hide}>
            <IconContext.Provider value={{ style: { fontSize: '30px', color: 'white' } }}>
              {navOpen ? <RxCross2 /> : <HiMenuAlt3 />}
            </IconContext.Provider>
          </div>
        </div>
        {navOpen && (
          <div onClick={() => setNavOpen(!navOpen)} className={classes.mobile_menu}>
            <MobileNav header={header} />
          </div>
        )}
      </div>
    </div>
  )
}

export default HeaderComponent
/*eslint-enable*/
