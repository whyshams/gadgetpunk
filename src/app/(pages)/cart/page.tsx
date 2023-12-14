/* eslint-disable*/

/* prettier-ignore */ import React from 'react'
/* prettier-ignore */ import { Metadata } from 'next'
/* prettier-ignore */ import { notFound } from 'next/navigation'

/* prettier-ignore */ import { Page, Settings } from '../../../payload/payload-types'

/* prettier-ignore */ import { fetchDoc } from '../../_api/fetchDoc'
/* prettier-ignore */ import { fetchSettings } from '../../_api/fetchGlobals'
/* prettier-ignore */ import { Blocks } from '../../_components/Blocks'
/* prettier-ignore */ import { Gutter } from '../../_components/Gutter'
/* prettier-ignore */ import { generateMeta } from '../../_utilities/generateMeta'
/* prettier-ignore */ import { CartPage } from './CartPage'

/* prettier-ignore */ import classes from './index.module.scss'

/* eslint-enable*/

// Force this page to be dynamic so that Next.js does not cache it
// See the note in '../[slug]/page.tsx' about this
export const dynamic = 'force-dynamic'

export default async function Cart() {
  let page: Page | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug: 'cart',
    })
  } catch (error) {
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // so swallow the error here and simply render the page with fallback data where necessary
    // in production you may want to redirect to a 404  page or at least log the error somewhere
    // console.error(error)
  }

  // if no `cart` page exists, render a static one using dummy content
  // you should delete this code once you have a cart page in the CMS
  // this is really only useful for those who are demoing this template

  if (!page) {
    return notFound()
  }

  let settings: Settings | null = null

  try {
    settings = await fetchSettings()
  } catch (error) {
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // so swallow the error here and simply render the page with fallback data where necessary
    // in production you may want to redirect to a 404  page or at least log the error somewhere
    // console.error(error)
  }
  console.log(settings)

  return (
    <div className={classes.container}>
      <Gutter>
        <h3>Cart</h3>
        <CartPage settings={settings} page={page} />
      </Gutter>

      <Blocks blocks={page?.layout} />
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  let page: Page | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug: 'cart',
    })
  } catch (error) {
    // don't throw an error if the fetch fails
    // this is so that we can render a static cart page for the demo
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // in production you may want to redirect to a 404  page or at least log the error somewhere
  }

  return generateMeta({ doc: page })
}
