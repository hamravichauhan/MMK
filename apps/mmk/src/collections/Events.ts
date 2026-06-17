import { CollectionConfig } from 'payload'
import { slugify } from '../utils/slugify'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    // Configures a crisp, informative grid overview view for the dashboard row layout
    defaultColumns: ['registration_open', 'title', 'event_date', 'location_city', 'updatedAt'],
    group: 'Operational Management',
    listSearchableFields: ['title', 'location_name', 'location_city'],
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
          label: 'Event Info & Media',
          description: 'Draft the public presentation layout, agenda details, and banner visuals.',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Event Title / Briefing Name',
              admin: {
                placeholder: 'e.g., Geopolitical Seminar: Indo-Pacific Strategic Security Bounds',
              },
            },
            {
              name: 'description',
              type: 'richText', // Lexical editor for descriptive write-ups, links, and agendas
              required: true,
              label: 'Event Description & Detailed Agenda',
            },
            {
              name: 'cover_image',
              type: 'relationship',
              relationTo: 'media',
              required: true,
              label: 'Event Banner Showcase Asset (Cloudinary Stack)',
              admin: {
                description: 'Landscape visual recommended for frontend card backgrounds.',
              },
            },
          ],
        },
        {
          label: 'Venue Logistics',
          description: 'Pinpoint precise spatial tracking coordinates for attendees.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'location_name',
                  type: 'text',
                  required: true,
                  label: 'Venue Hall / Building Name',
                  admin: {
                    width: '60%',
                    placeholder: 'e.g., Manekshaw Centre, Auditorium II',
                  },
                },
                {
                  name: 'location_city',
                  type: 'text',
                  required: true,
                  label: 'Host City',
                  admin: {
                    width: '40%',
                    placeholder: 'e.g., New Delhi',
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    /* ========================================================================
       STICKY SIDEBAR CONTROL DESK
       ======================================================================== */
    {
      name: 'registration_open',
      type: 'checkbox',
      defaultValue: true,
      label: '🟢 Accept Public Registrations (Form Open)',
      admin: {
        position: 'sidebar',
        description: 'Toggling this off instantly updates the public tag banner to CLOSED.',
      },
    },
    {
      name: 'event_date',
      type: 'date',
      required: true,
      label: 'Operational Event Timestamp',
      admin: {
        position: 'sidebar',
        description: 'Set exactly when the live transmission or speech kicks off.',
        date: {
          pickerAppearance: 'dayAndTime',
          timeIntervals: 15, // Smooths scheduling to 15-minute standard increments
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
        description: 'Leave empty to auto-build path strings directly from the title asset.',
      },
    },
  ],
}