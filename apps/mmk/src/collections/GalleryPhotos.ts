import { CollectionConfig } from 'payload'

export const GalleryPhotos: CollectionConfig = {
  slug: 'gallery-photos',
  admin: {
    useAsTitle: 'caption',
    // Displays image thumbnails directly inside the admin data rows for instant visual scanning
    defaultColumns: ['media', 'album', 'caption', 'sort_order', 'updatedAt'],
    group: 'Gallery Management',
    listSearchableFields: ['caption'],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Photo Curation',
          description: 'Link this asset to its home album container and assign layout positions.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'album',
                  type: 'relationship',
                  relationTo: 'gallery-albums', // Fixed: String signature for cleaner database relations
                  required: true,
                  label: 'Target Album Reference',
                  admin: {
                    width: '50%',
                    description: 'Select which parent collection album this photo belongs to.',
                  },
                },
                {
                  name: 'media',
                  type: 'relationship',
                  relationTo: 'media',
                  required: true,
                  label: 'Cloudinary Asset File',
                  admin: {
                    width: '50%',
                    description: 'Upload a fresh graphic or select an asset from the media library.',
                  },
                },
              ],
            },
            {
              name: 'caption',
              type: 'text',
              required: true,
              label: 'Photo Caption / Text Description',
              admin: {
                placeholder: 'Provide a concise, detailed context for this photograph...',
                description: 'Displays elegantly beneath the image modal view on the public website layout.',
              },
            },
          ],
        },
      ],
    },

    /* ========================================================================
       SIDEBAR SORT ORDER & STRUCTURAL LAYOUT
       ======================================================================== */
    {
      name: 'sort_order',
      type: 'number',
      defaultValue: 0,
      required: true,
      label: 'Display Order Weighting Value',
      admin: {
        position: 'sidebar',
        description: 'Lower values (e.g., 0, 1) float directly to the front of the public album display stack.',
      },
    },
  ],
}