/*eslint-disable*/

import React, { Fragment } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../../_components/Button'
import { Gutter } from '../../_components/Gutter'
import { HR } from '../../_components/HR'
import { RenderParams } from '../../_components/RenderParams'
import { LowImpactHero } from '../../_heros/LowImpact'
import { getMeUser } from '../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import AccountForm from './AccountForm'
import classes from './index.module.scss'

export default async function Account() {
  const { user } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to access your account.',
    )}&redirect=${encodeURIComponent('/account')}`,
  })

  return (
    <section className={classes.createAccount}>
      <div className={classes.heroImg}>
        <Link href="/">
          <Image
            src="/gadgetlogo.png"
            alt="logo"
            width={100}
            height={100}
            className={classes.logo}
          />
        </Link>
      </div>

      <div className={classes.formWrapper}>
        <div className={classes.formContainer}>
          <RenderParams className={classes.params} />

          <div className={classes.formTitle}>
            <h3>Update Account</h3>
            <Image src="/assets/icons/hand.png" alt="hand" width={30} height={30} />
          </div>

          <AccountForm />
          <Button href="/logout" appearance="secondary" label="Log out" />
        </div>
      </div>
    </section>
  )
}

//

//

export const metadata: Metadata = {
  title: 'Account',
  description: 'Create an account or log in to your existing account.',
  openGraph: mergeOpenGraph({
    title: 'Account',
    url: '/account',
  }),
}

/*eslint-enable*/
