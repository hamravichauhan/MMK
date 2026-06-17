import { CollectionConfig } from 'payload'

export const Ads: CollectionConfig = {
  slug: 'ads',
  admin: { useAsTitle: 'name' , group:"ads"},
  fields: [
    { name: 'name', type: 'text', required: true }, // Internal name
    { name: 'active', type: 'checkbox', defaultValue: true },
    { 
      name: 'targeting', 
      type: 'group', 
      fields: [
        { name: 'categories', type: 'select', hasMany: true, options: ['geopolitics', 'defense', 'technology'] },
        { name: 'tags', type: 'relationship', relationTo: 'article-tags', hasMany: true },
      ]
    },
    { 
      name: 'adContent', 
      type: 'group', 
      fields: [
        { name: 'image', type: 'relationship', relationTo: 'media', required: true },
        { name: 'url', type: 'text', required: true }
      ]
    }
  ]
}