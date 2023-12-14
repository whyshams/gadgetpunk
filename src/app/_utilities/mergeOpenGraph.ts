import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  siteName: 'Gadget Punk',
  title: 'Gadget Punk',
  description:
    'Gadget Punk is a Chittagong based online shop for quality mobile and digital accessories. Buy headphones, earphones, powerbanks, smartwatches with the best price possible',
  images: [
    {
      url: 'https://gadgetpunk.netlify.app/gadgetlogo.png',
    },
  ],
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
