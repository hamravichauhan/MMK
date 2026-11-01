import { CollectionConfig } from 'payload'
import { slugify } from '../utils/slugify'

export const Merchandise: CollectionConfig = {
  slug: 'merchandise',
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user?.roles?.includes('admin')),
    update: ({ req: { user } }) => Boolean(user?.roles?.includes('admin')),
    delete: ({ req: { user } }) => Boolean(user?.roles?.includes('admin')),
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'price', 'in_stock', 'is_featured', 'status'],
    group: 'Merchandise & Commerce',
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && data.title && !data.slug) {
          data.slug = slugify(data.title)
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
          label: 'Product Info',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Product Title',
              admin: {
                placeholder: 'e.g., MMK Tactical Cap, Unbreakable Tee',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Short Description',
              admin: {
                placeholder: 'Brief product specifications or highlights...',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'price',
                  type: 'number',
                  required: true,
                  label: 'Price (₹ INR)',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'external_buy_url',
                  type: 'text',
                  label: 'Affiliate / Purchase URL',
                  admin: {
                    width: '50%',
                    description: 'External storefront or affiliate purchase link (Amazon, Shopify, etc.)',
                  },
                },
              ],
            },
            {
              name: 'images',
              type: 'relationship',
              relationTo: 'media',
              hasMany: true,
              label: 'Product Images (Cloudinary)',
            },
            {
              name: 'sizes',
              type: 'select',
              hasMany: true,
              label: 'Available Sizes',
              options: [
                { label: 'One Size / Free Size', value: 'free_size' },
                { label: 'S', value: 'S' },
                { label: 'M', value: 'M' },
                { label: 'L', value: 'L' },
                { label: 'XL', value: 'XL' },
                { label: 'XXL', value: 'XXL' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      label: 'URL Slug',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'published',
      label: 'Status',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'in_stock',
      type: 'checkbox',
      defaultValue: true,
      label: 'In Stock',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'is_featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Feature on Homepage Sidebar',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}