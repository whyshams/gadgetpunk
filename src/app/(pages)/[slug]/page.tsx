/* eslint-disable */

/* prettier-ignore */ import React from 'react'
/* prettier-ignore */ import { Metadata } from 'next'
/* prettier-ignore */ import { draftMode } from 'next/headers'
/* prettier-ignore */ import { notFound } from 'next/navigation'

/* prettier-ignore */ import { Category, Page } from '../../../payload/payload-types'

/* prettier-ignore */ import { fetchDoc } from '../../_api/fetchDoc'
/* prettier-ignore */ import { fetchDocs } from '../../_api/fetchDocs'
/* prettier-ignore */ import { Blocks } from '../../_components/Blocks'
/* prettier-ignore */ import { Hero } from '../../_components/Hero'
/* prettier-ignore */ import { generateMeta } from '../../_utilities/generateMeta'
/* prettier-ignore */ import { Gutter } from '../../_components/Gutter'
/* prettier-ignore */ import PromotionMain from '../../_components/Promotion/PromotionMain'
import FeaturedProduct from '../../_components/FeaturedProduct'
// Payload Cloud caches all files through Cloudflare, so we don't need Next.js to cache them as well
// This means that we can turn off Next.js data caching and instead rely solely on the Cloudflare CDN
// To do this, we include the `no-cache` header on the fetch requests used to get the data for this page
// But we also need to force Next.js to dynamically render this page on each request for preview mode to work
// See https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
// If you are not using Payload Cloud then this line can be removed, see `../../../README.md#cache`
export const dynamic = 'force-dynamic'

import classes from './index.module.scss'
import Categories from '../../_components/Categories'
import { HR } from '../../_components/HR'

import LatestProduct from '../../_components/LatestProduct'
import { staticHome } from '../../../payload/seed/home-static'

export default async function Page({ params: { slug = 'home' } }) {
  const { isEnabled: isDraftMode } = draftMode()

  let page: Page | null = null
  let categories: Category[] | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug,
      draft: isDraftMode,
    })

    categories = await fetchDocs<Category>('categories')
  } catch (error) {
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // so swallow the error here and simply render the page with fallback data where necessary
    // in production you may want to redirect to a 404  page or at least log the error somewhere
    // console.error(error)
  }

  // if no `home` page exists, render a static one using dummy content
  // you should delete this code once you have a home page in the CMS
  // this is really only useful for those who are demoing this template

  if (!page) {
    return notFound()
  }

  const { hero, layout } = page

  return (
    <React.Fragment>
      {slug === 'home' ? (
        <section>
          <Hero {...hero} />
          <Gutter className={classes.categories}>
            <Categories categories={categories} />
            <HR />
            <div>
              <LatestProduct />
            </div>
            <HR />
            <div className={classes.promotion}>
              <PromotionMain />
            </div>
            <HR />

            <div className={classes.promotion}>
              <FeaturedProduct />
            </div>
            <HR />
          </Gutter>
        </section>
      ) : (
        <>
          <Hero {...hero} />
          <Blocks
            blocks={layout}
            disableTopPadding={!hero || hero?.type === 'none' || hero?.type === 'lowImpact'}
          />
        </>
      )}
    </React.Fragment>
  )
}

export async function generateStaticParams() {
  try {
    const pages = await fetchDocs<Page>('pages')
    return pages?.map(({ slug }) => slug)
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params: { slug = 'home' } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode()

  let page: Page | null = null

  console.log(staticHome)

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {
    // don't throw an error if the fetch fails
    // this is so that we can render a static home page for the demo
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // in production you may want to redirect to a 404  page or at least log the error somewhere
  }

  if (!page && slug === 'home') {
    page = staticHome
  }

  return generateMeta({ doc: page })
}

/* eslint-enable */
