import { CollectionConfig } from 'payload'

export const Videos: CollectionConfig = {
  slug: 'videos',
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user?.roles?.includes('admin') || user?.roles?.includes('editor:multimedia')),
    update: ({ req: { user } }) => Boolean(user?.roles?.includes('admin') || user?.roles?.includes('editor:multimedia')),
    delete: ({ req: { user } }) => Boolean(user?.roles?.includes('admin') || user?.roles?.includes('editor:multimedia')),
  },
  admin: { 
    useAsTitle: 'title',
    defaultColumns: ['status', 'title', 'youtube_id', 'category', 'updatedAt'],
    group: 'Multimedia',
    listSearchableFields: ['title', 'youtube_id', 'description'],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Broadcast Content & Identity',
          description: 'Paste structural tracking details and draft the textual metadata contexts.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  defaultValue: 'Migration Placeholder Title',
                  label: 'Video Transmission Title',
                  admin: {
                    width: '60%',
                    placeholder: 'Enter a high-impact broadcast title...',
                  },
                },
                {
                  name: 'youtube_id',
                  type: 'text',
                  required: true,
                  unique: true,
                  label: 'YouTube Video ID Token',
                  admin: {
                    width: '40%',
                    placeholder: 'e.g., FLzG31Xmkzs',
                    description: 'Paste only the unique 11-character alpha-numeric token string found after "?v=" in the URL.',
                  },
                },
              ],
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              defaultValue: 'Migration placeholder description. Please update this in the admin dashboard.',
              label: 'Video Brief Excerpt (Summary)',
              maxLength: 250,
              admin: {
                placeholder: 'Provide a concise overview detailing this tactical intelligence analysis or broadcast briefing...',
                description: 'Displays under video feature blocks and text summary areas. Keep under 250 characters.',
              },
            },
          ],
        },
      ],
    },

    /* ========================================================================
       STICKY EDITORIAL SIDEBAR STRATEGIC CONTROL CODES
       ======================================================================== */
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'published',
      label: 'Broadcast Visibility State',
      options: [
        { label: '🟢 Live on Dashboard Broadcasts', value: 'published' },
        { label: '🔒 Hidden / Private Archive', value: 'hidden' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Primary Classification Desk',
      options: [
        { label: '🛡️ Geopolitical Strategy', value: 'geopolitics' },
        { label: '⚡ Defence & Military Intelligence', value: 'defence' },
        { label: '📈 Armed Forces Career Hub', value: 'career' },
        { label: '🔥 Patriotism & Motivation', value: 'motivation' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'article-tags',
      hasMany: true, // String standard bypasses complex table creation queries
      label: 'Primary Connected Topic Tag',
      admin: {
        position: 'sidebar',
        description: 'Link a trending tag to map this video across the main frontend streams.',
      },
    },
  ],
}