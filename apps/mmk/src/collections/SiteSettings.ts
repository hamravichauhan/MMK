import { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  fields: [
    {
      name: 'site_name',
      type: 'text',
      required: true,
      defaultValue: 'Major Madhan Kumar',
    },
    {
      name: 'tagline',
      type: 'text',
      required: true,
    },
    {
      name: 'short_bio_english',
      type: 'textarea',
      required: true,
    },
    {
      name: 'short_bio_tamil',
      type: 'textarea',
      required: true,
      label: 'Short Bio (Tamil Translation)',
    },
    {
      name: 'contact_email',
      type: 'email',
      required: true,
    },
    {
      type: 'group',
      name: 'social_urls',
      label: 'Social Profile Network URLs',
      fields: [
        { name: 'youtube', type: 'text' },
        { name: 'twitter_x', type: 'text', label: 'X (formerly Twitter)' },
        { name: 'instagram', type: 'text' },
        { name: 'facebook', type: 'text' },
      ],
    },
  ],
}