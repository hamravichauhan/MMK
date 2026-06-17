import { GlobalConfig } from 'payload'

export const Globalads: GlobalConfig = {
  slug: 'Globalads',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user?.roles?.includes('admin') || user?.roles?.includes('editor:multimedia')),
  },
  admin: {
    group: 'Monetization Engine',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Left Sidebar Placements',
          fields: [
            {
              name: 'leftAdActive',
              type: 'checkbox',
              label: 'Activate Left Ads Flank',
              defaultValue: true,
            },
            // Left Ad Slot 1
            {
              name: 'leftAdImage1',
              type: 'relationship',
              relationTo: 'media',
              label: 'Left Slot 1 Image (240x600px)',
            },
            {
              name: 'leftAdLink1',
              type: 'text',
              label: 'Left Slot 1 Destination URL',
            },
            // Left Ad Slot 2
            {
              name: 'leftAdImage2',
              type: 'relationship',
              relationTo: 'media',
              label: 'Left Slot 2 Image (240x600px)',
            },
            {
              name: 'leftAdLink2',
              type: 'text',
              label: 'Left Slot 2 Destination URL',
            },
          ],
        },
        {
          label: 'Right Sidebar Placements',
          fields: [
            {
              name: 'rightAdActive',
              type: 'checkbox',
              label: 'Activate Right Ads Flank',
              defaultValue: true,
            },
            // Right Ad Slot 1
            {
              name: 'rightAdImage1',
              type: 'relationship',
              relationTo: 'media',
              label: 'Right Slot 1 Image (240x600px)',
            },
            {
              name: 'rightAdLink1',
              type: 'text',
              label: 'Right Slot 1 Destination URL',
            },
            // Right Ad Slot 2
            {
              name: 'rightAdImage2',
              type: 'relationship',
              relationTo: 'media',
              label: 'Right Slot 2 Image (240x600px)',
            },
            {
              name: 'rightAdLink2',
              type: 'text',
              label: 'Right Slot 2 Destination URL',
            },
          ],
        },
      ],
    },
  ],
}
