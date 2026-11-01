import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'thumbnail', 'alt', 'mimeType', 'filesize', 'updatedAt'],
    group: 'Operational Management',
    listSearchableFields: ['filename', 'alt'],
  },
  access: {
    read: () => true,
  },
  upload: {
    formatOptions: {
      format: 'webp',
      options: { quality: 85 },
    },
    adminThumbnail: 'thumbnail',
    disableLocalStorage: true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'alt',
          type: 'text',
          required: true,
          label: 'Accessibility Alternative Text (Alt Text)',
          admin: {
            width: '100%',
            placeholder: 'e.g., Major Madhan Kumar analyzing tactical defense map boundaries',
            description: 'Crucial for platform SEO performance and screen-reader compliance.',
          },
        },
      ],
    },
  ],
}
