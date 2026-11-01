import { CollectionConfig } from 'payload'
import { slugify } from '../utils/slugify'
import {
  lexicalEditor,
  FixedToolbarFeature,
  HeadingFeature,
  BlockquoteFeature,
  HorizontalRuleFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  AlignFeature,
  OrderedListFeature,
  UnorderedListFeature,
  LinkFeature,
  BlocksFeature,
} from '@payloadcms/richtext-lexical'

export const Articles: CollectionConfig = {
  slug: 'articles',
  access: {
    read: () => true,
    create: ({ req: { user } }) =>
      Boolean(user?.roles?.includes('admin') || user?.roles?.includes('editor:articles')),
    update: ({ req: { user } }) =>
      Boolean(user?.roles?.includes('admin') || user?.roles?.includes('editor:articles')),
    delete: ({ req: { user } }) =>
      Boolean(user?.roles?.includes('admin') || user?.roles?.includes('editor:articles')),
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'category', 'language', 'published_at'],
    group: 'Editorial Content',
    livePreview: {
      url: ({ data }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        return `${baseUrl}/articles/${data?.slug || ''}`
      },
    },
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data) {
          if (data.title && !data.slug) {
            data.slug = slugify(data.title)
          }
          if (data.body) {
            try {
              const bodyStr = JSON.stringify(data.body)
              const wordCount = bodyStr.match(/[a-zA-Z0-9]+/g)?.length || 0
              data.reading_time_minutes = Math.max(1, Math.round(wordCount / 200))
            } catch {
              data.reading_time_minutes = 4
            }
          }
        }
        return data
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ─────────────────────────────────────────────────────────────
        // TAB 1: Editorial Content
        // ─────────────────────────────────────────────────────────────
        {
          label: 'Editorial Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Article Headline',
              admin: {
                placeholder: 'Enter a high-impact heading...',
                components: {
                  Cell: '/components/admin/ArticleTitleCell#ArticleTitleCell',
                },
              },
            },
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              label: 'Brief Overview (Excerpt)',
              maxLength: 220,
              admin: {
                description:
                  'Displays inside split cards and latest streams. Keep under 220 characters.',
              },
            },
            {
              name: 'body',
              type: 'richText',
              required: true,
              label: 'Full Analysis Content Body',
              editor: lexicalEditor({
                features: [
                  FixedToolbarFeature(),
                  HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                  BlockquoteFeature(),
                  HorizontalRuleFeature(),
                  BoldFeature(),
                  ItalicFeature(),
                  UnderlineFeature(),
                  StrikethroughFeature(),
                  SubscriptFeature(),
                  SuperscriptFeature(),
                  AlignFeature(),
                  OrderedListFeature(),
                  UnorderedListFeature(),
                  LinkFeature({ enabledCollections: ['articles', 'videos'] }),
                  BlocksFeature({
                    blocks: [
                      {
                        slug: 'intelligenceCallout',
                        labels: {
                          singular: 'Intel Callout Box',
                          plural: 'Intel Callout Boxes',
                        },
                        fields: [
                          {
                            name: 'type',
                            type: 'select',
                            defaultValue: 'info',
                            required: true,
                            options: [
                              { label: '💡 Strategic Insight', value: 'info' },
                              { label: '⚠️ Threat Alert / Breaking', value: 'warning' },
                              { label: '🛡️ Defense Directive', value: 'military' },
                            ],
                          },
                          {
                            name: 'text',
                            type: 'textarea',
                            required: true,
                            label: 'Callout Content',
                          },
                        ],
                      },
                      {
                        slug: 'inlineVideo',
                        labels: {
                          singular: 'Inline Video Player',
                          plural: 'Inline Video Players',
                        },
                        fields: [
                          {
                            name: 'youtube_id',
                            type: 'text',
                            required: true,
                            label: 'YouTube Video ID (Alphanumeric)',
                            admin: { placeholder: 'e.g., zYdsZpG89AA' },
                          },
                          {
                            name: 'caption',
                            type: 'text',
                            label: 'Video Sub-caption Text',
                          },
                        ],
                      },
                    ],
                  }),
                ],
              }),
            },
          ],
        },

        // ─────────────────────────────────────────────────────────────
        // TAB 2: Strategic Classification
        // ─────────────────────────────────────────────────────────────
        {
          label: 'Strategic Classification',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'category',
                  type: 'select',
                  required: true,
                  index: true,
                  label: 'Primary Editorial Feed Desk',
                  options: [
                    { label: 'Geopolitical Analysis', value: 'geopolitics' },
                    { label: 'Defence & Security Intelligence', value: 'defence' },
                    { label: 'Career Guidance Hub', value: 'career' },
                    { label: 'Military Motivation', value: 'motivation' },
                    { label: 'Platform Blog Insight', value: 'blog' },
                    { label: 'Fun Time / Culture Brief', value: 'fun' },
                  ],
                  admin: { width: '50%' },
                },
                {
                  name: 'language',
                  type: 'select',
                  required: true,
                  index: true,
                  defaultValue: 'en',
                  label: 'Target Audience Language',
                  options: [
                    { label: 'English Edition', value: 'en' },
                    { label: 'Tamil Edition (தமிழ்)', value: 'ta' },
                  ],
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'featured_image',
                  type: 'relationship',
                  relationTo: 'media',
                  required: true,
                  label: 'Showcase Cover Asset (Cloudinary Stack)',
                  admin: { width: '50%' },
                },
                {
                  name: 'tags',
                  type: 'relationship',
                  relationTo: 'article-tags',
                  hasMany: true,
                  index: true,
                  label: 'Trending Tag Relations',
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },

        // ─────────────────────────────────────────────────────────────
        // TAB 3: Interactive Navigation (TOC)
        // ─────────────────────────────────────────────────────────────
        {
          label: 'Interactive Navigation (TOC)',
          fields: [
            {
              name: 'table_of_contents',
              type: 'array',
              label: 'Jump-to Quick Links',
              labels: { singular: 'Navigation Link', plural: 'Navigation Links' },
              admin: {
                description:
                  'Build jump anchors (#section-id) for long defense analysis profiles.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                      label: 'Link Heading Name',
                      admin: { width: '50%', placeholder: 'e.g., Threat Assessment' },
                    },
                    {
                      name: 'anchor_id',
                      type: 'text',
                      required: true,
                      label: 'HTML Target Anchor (No spaces)',
                      admin: { width: '50%', placeholder: 'e.g., threat-assessment' },
                    },
                  ],
                },
              ],
            },
          ],
        },

        // ─────────────────────────────────────────────────────────────
        // TAB 4: SEO & Growth Analytics
        // ─────────────────────────────────────────────────────────────
        {
          label: 'SEO & Growth Analytics',
          fields: [
            {
              name: 'meta_title',
              type: 'text',
              label: 'Meta Search Title Overlay',
              admin: { placeholder: 'Defaults to core article headline if left blank.' },
            },
            {
              name: 'meta_description',
              type: 'textarea',
              label: 'Google Snippet Description Tag',
              maxLength: 160,
              admin: { description: 'Keep under 160 characters for SERP previews.' },
            },
            {
              name: 'block_ai_scrapers',
              type: 'checkbox',
              defaultValue: true,
              label: 'Shield Document: Opt out from AI Scraper Parsing Bots',
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // Sidebar Fields
    // ─────────────────────────────────────────────────────────────
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      label: 'URL Route Slug String',
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      index: true,
      defaultValue: 'draft',
      label: 'Publication Pipeline Lifecycle State',
      options: [
        { label: '📝 Draft', value: 'draft' },
        { label: '🟢 Published', value: 'published' },
        { label: '📦 Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
        components: { Cell: '/components/StatusDropdown' },
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: false,
      label: 'Assigned Intelligence Analyst',
      admin: { position: 'sidebar' },
    },
    {
      name: 'published_at',
      type: 'date',
      required: true,
      index: true,
      label: 'Scheduled Distribution Timestamp',
      defaultValue: () => new Date(),
      admin: { position: 'sidebar' },
    },
    {
      name: 'is_featured',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      label: 'Promote to Flagship Marquee Spot',
      admin: { position: 'sidebar' },
    },
    {
      name: 'is_breaking',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      label: 'Flash inside Top Breaking Ticker Loop Strip',
      admin: { position: 'sidebar' },
    },
    // ✅ MOVED HERE: was previously orphaned inside the tabs array
    {
      name: 'is_special',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      label: 'Mark as Special / Exclusive Article (Sidebar Feature)',
      admin: {
        position: 'sidebar',
        description:
          'Promotes this article to the Special Articles section on the homepage sidebar.',
      },
    },
    {
      name: 'reading_time_minutes',
      type: 'number',
      label: 'Estimated Reading Time (Min)',
      defaultValue: 4,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Auto-calculated based on lexical word count.',
      },
    },
  ],
}