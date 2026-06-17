import { CollectionConfig } from 'payload'
import { slugify } from '../utils/slugify'

export const GalleryAlbums: CollectionConfig = {
  slug: 'gallery-albums',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['visibility', 'name', 'event_date', 'updatedAt'],
    group: 'Gallery Management',
    // Accelerates sub-photo relational queries inside child collections
    listSearchableFields: ['name', 'slug', 'description'],
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
      type: 'tabs',
      tabs: [
        {
          label: 'Album Content & Cover',
          description: 'Configure public-facing titles, descriptions, and primary marquee covers.',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'Album Name / Event Title',
              admin: {
                placeholder: 'e.g., National Security Summit Highlights 2026',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Album Context Summary',
              admin: {
                placeholder: 'Provide a brief overview background of this photo collection...',
                description: 'Displays under the album title header on the public website layout.',
              },
            },
            {
              name: 'cover_photo',
              type: 'relationship',
              relationTo: 'media',
              required: true,
              label: 'Flagship Card Thumbnail Photo (Cloudinary Stack)',
              admin: {
                description: 'The primary showcase graphic used to represent this album on the media grid list.',
              },
            },
          ],
        },
      ],
    },

    /* ========================================================================
       METADATA GOVERNANCE SIDEBAR CONTROL PANEL
       ======================================================================== */
    {
      name: 'visibility',
      type: 'select',
      defaultValue: 'public',
      required: true,
      label: 'Public Access Scope',
      options: [
        { label: '🌐 Public (Visible on Website grids)', value: 'public' },
        { label: '🔒 Hidden / Private Draft', value: 'hidden' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Set whether this entire asset collection is discoverable live.',
      },
    },
    {
      name: 'event_date',
      type: 'date',
      required: true,
      label: 'Historical Event Date',
      admin: {
        position: 'sidebar',
        description: 'Used to sort your media archives chronologically on the front end.',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      label: 'URL Route Slug String',
      admin: {
        position: 'sidebar',
        placeholder: 'auto-generated-on-save',
        description: 'Leave blank to translate path tokens directly from the album title.',
      },
    },
  ],
}