import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    // Shows the descriptive alt tag text as the asset identification label
    useAsTitle: 'alt',
    // Displays critical image dimensions and visual thumbnails on grid rows instantly
    defaultColumns: ['filename', 'thumbnail', 'alt', 'mimeType', 'filesize', 'updatedAt'],
    group: 'Operational Management',
    listSearchableFields: ['filename', 'alt'],
  },
  access: {
    read: () => true, // Ensure strategic assets load seamlessly on the public frontend
  },
  upload: {
    adminThumbnail: 'thumbnail',
    disableLocalStorage: true, // Safeguards server disk boundaries by forcing Cloudinary storage routing
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
            placeholder: 'e.g., Major Madhan Kumar analyzing tactical defense map boundaries at the New Delhi briefing',
            description: 'Crucial for platform SEO performance and screen-reader compliance. Describe what is happening in the picture.',
          },
        },
      ],
    },
  ],
}