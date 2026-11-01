import { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'System Configuration',
  },
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
    {
      type: 'group',
      name: 'book_promo',
      label: '📖 Book Feature: Operation Sindoor',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
          label: 'Display Book Promo Card on Homepage Sidebar',
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Operation Sindoor – The Untold Story',
          label: 'Book Title',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'Read the untold story behind Operation Sindoor.',
          label: 'Short Description',
        },
        {
          name: 'cover_image',
          type: 'upload',
          relationTo: 'media',
          label: 'Book Cover Image (Upload)',
        },
        {
          name: 'custom_cover_url',
          type: 'text',
          label: 'Custom Cover Image URL (Cloudinary / External)',
          defaultValue:
            'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/book-cover.webp',
        },
        {
          name: 'affiliate_url',
          type: 'text',
          required: true,
          defaultValue: 'https://www.amazon.in/',
          label: 'Affiliate Purchase Link (Amazon / Store)',
          admin: {
            description:
              'Destination affiliate purchase link opened in a new tab when clicking Buy the Book.',
          },
        },
        {
          name: 'cta_text',
          type: 'text',
          defaultValue: 'Buy the Book',
          label: 'CTA Button Text',
        },
        {
          name: 'disclosure',
          type: 'text',
          defaultValue: 'Purchase through our affiliate link.',
          label: 'Affiliate Disclosure Note',
        },
      ],
    },
    {
      type: 'group',
      name: 'doc_promo',
      label: '🎬 Documentary: Making The Unbreakable',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
          label: 'Display Documentary Promo Card on Homepage Sidebar',
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Making The Unbreakable',
          label: 'Documentary Title',
        },
        {
          name: 'subtitle',
          type: 'text',
          defaultValue: "India's 1st Digital Series on the Indian Army",
          label: 'Subtitle / Tagline',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue:
            "India's landmark digital series taking you behind the lines with the Indian Armed Forces. Experience the grit, dedication, and operational valor.",
          label: 'Short Description',
        },
        {
          name: 'thumbnail_image',
          type: 'upload',
          relationTo: 'media',
          label: 'Documentary Poster / Banner Image (Upload)',
        },
        {
          name: 'custom_thumbnail_url',
          type: 'text',
          label: 'Custom Poster Image URL (YouTube Banner / Cloudinary)',
          defaultValue:
            'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/documentary-poster.webp',
        },
        {
          name: 'trailer_youtube_id',
          type: 'text',
          defaultValue: 'dQw4w9WgXcQ',
          label: 'Short Trailer YouTube Video ID (e.g. 1.3 mins)',
          admin: {
            description:
              'Alphanumeric YouTube video ID for playing the 1.3 min teaser trailer inline or in modal.',
          },
        },
        {
          name: 'youtube_url',
          type: 'text',
          required: true,
          defaultValue: 'https://www.youtube.com/@MajorMadhanKumar',
          label: 'Official YouTube Video / Playlist Link',
          admin: {
            description:
              'Destination URL where users will be redirected when clicking Watch Documentary.',
          },
        },
        {
          name: 'cta_text',
          type: 'text',
          defaultValue: 'Watch Documentary',
          label: 'CTA Button Text',
        },
        {
          name: 'episode_info',
          type: 'text',
          defaultValue: 'Episode 1 • Streaming on YouTube',
          label: 'Episode Information / Badge Text',
        },
      ],
    },
    {
      type: 'group',
      name: 'breaking_banner',
      label: '🚨 Live Emergency / Strategic Breaking Alert Strip',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
          label: 'Activate Breaking News Top Marquee Alert',
        },
        {
          name: 'label',
          type: 'text',
          defaultValue: 'CRITICAL STRATEGIC UPDATE',
          label: 'Alert Tag / Badge Label',
        },
        {
          name: 'message',
          type: 'text',
          defaultValue: 'Major Madhan Kumar releases tactical evaluation on forward border infrastructure.',
          label: 'Marquee Headline / Alert Message',
        },
        {
          name: 'link_url',
          type: 'text',
          defaultValue: '/articles',
          label: 'Target Destination URL',
        },
        {
          name: 'badge_style',
          type: 'select',
          defaultValue: 'red',
          label: 'Visual Alert Severity Color',
          options: [
            { label: '🔴 Urgent Threat Alert (Red)', value: 'red' },
            { label: '🟡 Strategic Intelligence (Tactical Gold)', value: 'gold' },
            { label: '🟢 Armed Forces Operational (Olive Drab)', value: 'olive' },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'audience_metrics',
      label: '📊 Audience Scale & Social Proof Counters',
      fields: [
        {
          name: 'youtube_subscribers',
          type: 'text',
          defaultValue: '850K+',
          label: 'YouTube Subscribers Display',
        },
        {
          name: 'instagram_followers',
          type: 'text',
          defaultValue: '120K+',
          label: 'Instagram Followers Display',
        },
        {
          name: 'facebook_followers',
          type: 'text',
          defaultValue: '95K+',
          label: 'Facebook Community Size',
        },
        {
          name: 'twitter_followers',
          type: 'text',
          defaultValue: '140K+',
          label: 'X (Twitter) Network Size',
        },
        {
          name: 'total_reach',
          type: 'text',
          defaultValue: '2.5M+ Readers',
          label: 'Aggregated Monthly Operational Reach',
        },
      ],
    },
    {
      type: 'group',
      name: 'media_kit',
      label: '📑 Speaker Press Kit & Speaking Inquiries',
      fields: [
        {
          name: 'download_url',
          type: 'text',
          defaultValue: 'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/major-madhan.webp',
          label: 'Downloadable Media Kit PDF / Press File URL',
        },
        {
          name: 'speaker_intro',
          type: 'textarea',
          defaultValue: 'Major Madhan Kumar is available for national security keynotes, defense conclaves, corporate risk briefings, and television debates.',
          label: 'Speaker & Media Engagement Profile Summary',
        },
        {
          name: 'inquiries_email',
          type: 'text',
          defaultValue: 'speaking@majormadhankumar.in',
          label: 'Designated Speaking Inquiries Direct Email',
        },
      ],
    },
    {
      type: 'group',
      name: 'youtube_automation',
      label: '🔄 YouTube Channel Automated Sync Engine',
      fields: [
        {
          name: 'channel_id',
          type: 'text',
          defaultValue: '@MajorMadhanKumar',
          label: 'YouTube Channel Handle or Channel ID',
        },
        {
          name: 'auto_sync_enabled',
          type: 'checkbox',
          defaultValue: true,
          label: 'Automatically Synchronize Video Library via YouTube API',
        },
      ],
    },
    {
      type: 'group',
      name: 'footer_customization',
      label: '🏛️ Footer Content & Disclaimers',
      fields: [
        {
          name: 'about_summary',
          type: 'textarea',
          defaultValue: 'Major Madhan Kumar (Retd) is a veteran Indian Army officer, defense analyst, and geopolitical strategist dedicated to high-fidelity national security discourse and honoring Armed Forces personnel.',
          label: 'Footer Biographical Synopsis',
        },
        {
          name: 'copyright_text',
          type: 'text',
          defaultValue: 'Major Madhan Kumar. All strategic rights reserved.',
          label: 'Copyright Notice String',
        },
        {
          name: 'disclaimer_text',
          type: 'textarea',
          defaultValue: 'All commentary, geopolitical analysis, and defense assessments published on this platform represent personal expert evaluations based on open-source intelligence (OSINT) and declassified operational histories.',
          label: 'Editorial & Strategic Intelligence Disclaimer',
        },
      ],
    },
  ],
}