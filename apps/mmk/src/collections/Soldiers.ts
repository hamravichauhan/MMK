import { CollectionConfig } from 'payload'

export const Soldiers: CollectionConfig = {
  slug: 'soldiers',
 access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user?.roles?.includes('admin') || user?.roles?.includes('editor:soldiers')),
    update: ({ req: { user } }) => Boolean(user?.roles?.includes('admin') || user?.roles?.includes('editor:soldiers')),
    delete: ({ req: { user } }) => Boolean(user?.roles?.includes('admin') || user?.roles?.includes('editor:soldiers')),
  },
  admin: { 
    useAsTitle: 'full_name',
    defaultColumns: ['full_name', 'rank', 'branch', 'regiment_unit', 'updatedAt'],
    group: 'Honour Registry',
    listSearchableFields: ['full_name', 'rank', 'regiment_unit', 'home_state'],
    livePreview: {
      url: ({ data }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        return `${baseUrl}/know-your-soldiers/${data?.slug || ''}`
      },
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Service Identity & Media',
          description: 'Register the core biographical identity markers and official portraiture.',
          fields: [
            {
              type: 'row',
              fields: [
                { 
                  name: 'full_name', 
                  type: 'text', 
                  required: true,
                  label: 'Soldier Full Name',
                  admin: { 
                    width: '50%',
                    placeholder: 'e.g., Captain Vikram Batra',
                    components: {
                      Cell: '/components/admin/SoldierCell#SoldierCell',
                    },
                  }
                },
                {
                  name: 'photo',
                  type: 'relationship',
                  relationTo: 'media',
                  required: true,
                  label: 'Service Portrait / Profile Photo',
                  admin: { 
                    width: '50%',
                    description: 'Cloudinary asset mapping. Uniform or official image recommended.'
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'rank',
                  type: 'text',
                  required: true,
                  label: 'Military Rank Designation',
                  admin: { 
                    width: '33%',
                    placeholder: 'e.g., Major, Captain, Subedar'
                  },
                },
                {
                  name: 'branch',
                  type: 'select',
                  required: true,
                  label: 'Armed Forces Branch',
                  options: [
                    { label: '🇮🇳 Indian Army', value: 'army' },
                    { label: '⚓ Indian Navy', value: 'navy' },
                    { label: '✈️ Indian Air Force', value: 'airforce' },
                    { label: '🛡️ Para Special Forces', value: 'parasf' },
                    { label: '🌊 Indian Coast Guard', value: 'coastguard' },
                  ],
                  admin: { width: '33%' },
                },
                { 
                  name: 'regiment_unit', 
                  type: 'text', 
                  required: true,
                  label: 'Regiment / Unit / Battalion',
                  admin: { 
                    width: '34%',
                    placeholder: 'e.g., 13 JAK RIF, 9 Para SF'
                  }
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { 
                  name: 'home_state', 
                  type: 'text', 
                  required: true,
                  label: 'Home State / Union Territory',
                  admin: { 
                    width: '50%',
                    placeholder: 'e.g., Himachal Pradesh'
                  }
                },
                { 
                  name: 'awards', 
                  type: 'text', 
                  label: 'Gallantry Awards & Decorations',
                  admin: { 
                    width: '50%',
                    description: 'Separate multiple honours with commas.',
                    placeholder: 'e.g., Param Vir Chakra, Maha Vir Chakra'
                  } 
                },
              ],
            },
            { 
              name: 'short_bio', 
              type: 'textarea', 
              required: true,
              label: 'Concise Profile Overview (Excerpt)',
              maxLength: 250,
              admin: {
                description: 'Displays elegantly inside search results and honor roll preview grid cards.',
                placeholder: 'Summarize the brief service profile details or notable citation action...',
              }
            },
          ],
        },
        {
          label: 'Biography & Operational Story',
          description: 'Document the deep operational deployment history and bravery records.',
          fields: [
            { 
              name: 'story', 
              type: 'richText', 
              required: true,
              label: 'Full Operational History / Veer Gatha Story'
            },
          ],
        },
      ],
    },

    /* ========================================================================
       STICKY CRITICAL OPERATIONAL SIDEBAR COMMAND PANELS
       ======================================================================== */
    {
      name: 'is_martyr',
      type: 'checkbox',
      defaultValue: false,
      label: '🎖️ Fallen Soldier (Martyr Ribbon Badge Flag)',
      admin: {
        position: 'sidebar',
        description: 'Toggling this dynamically adds the prominent red tribute ribbon layer and expands operational metadata fields.',
      },
    },
    {
      type: 'collapsible',
      label: 'Operation Martyrdom Coordinates',
      admin: {
        position: 'sidebar',
        condition: (data) => Boolean(data?.is_martyr),
      },
      fields: [
        {
          name: 'operation_name',
          type: 'text',
          label: 'Military Operation Context',
          admin: { placeholder: 'e.g., Operation Vijay (Kargil)' },
        },
        {
          name: 'martyrdom_date',
          type: 'date',
          label: 'Date of Martyrdom',
          admin: {
            date: { pickerAppearance: 'dayOnly' },
          },
        },
        {
          name: 'martyrdom_location',
          type: 'text',
          label: 'Location / Strategic Sector',
          admin: { placeholder: 'e.g., Point 4875, Dras Sector' },
        },
        { 
          name: 'tribute', 
          type: 'richText', 
          label: 'Official Veer Gatha Tribute Citation Text' 
        },
      ],
    },
    {
      type: 'row',
      admin: {
        position: 'sidebar',
      },
      fields: [
        { 
          name: 'service_from', 
          type: 'number', 
          label: 'Year Commissioned',
          admin: { width: '50%', placeholder: 'e.g., 1989' }
        },
        { 
          name: 'service_to', 
          type: 'number', 
          label: 'Year Retired',
          admin: { 
            width: '50%', 
            placeholder: 'e.g., 1999',
            description: 'Leave blank if soldier is active or fell in action.'
          }
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Route Slug Identifier',
      admin: {
        position: 'sidebar',
        description: 'Pristine identifier for route mapping.',
        placeholder: 'auto-generated-route-token',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            if (data?.full_name) {
              return data.full_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            }
            return value
          },
        ],
      },
    },
  ],
}