import { CollectionConfig } from 'payload'
import { slugify } from '../utils/slugify'

export const ArticleTags: CollectionConfig = {
  slug: 'article-tags',
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user?.roles?.includes('admin') || user?.roles?.includes('editor:articles')),
    update: ({ req: { user } }) => Boolean(user?.roles?.includes('admin') || user?.roles?.includes('editor:articles')),
    delete: ({ req: { user } }) => Boolean(user?.roles?.includes('admin') || user?.roles?.includes('editor:articles')),
  },
  admin: { 
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
    group: 'Editorial Content',
    // Accelerates relational lookups inside other collections (like Articles)
    listSearchableFields: ['name', 'slug'],
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && data.name && !data.slug) {
          data.slug = slugify(data.name)
        }
        return data
      },
    ],
  },
  fields: [
    {
      type: 'row',
      fields: [
        { 
          name: 'name', 
          type: 'text', 
          required: true, 
          unique: true,
          label: 'Tag Display Label',
          admin: {
            width: '50%',
            placeholder: 'e.g., Indo-Pacific, India-US Defense, OSINT',
          }
        },
        { 
          name: 'slug', 
          type: 'text', 
          unique: true, 
          label: 'URL Path Slug',
          admin: {
            width: '50%',
            placeholder: 'auto-generated-url-path',
            description: 'Leave completely blank to let the system auto-generate it from the label string.',
          }
        },
      ],
    },
  ],
}