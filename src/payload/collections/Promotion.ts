import type { CollectionConfig } from 'payload/types'

const Promotion: CollectionConfig = {
  slug: 'promotion',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'days',
      type: 'number',
    },
    {
      name: 'title',
      type: 'text',
    },
  ],
}

export default Promotion
