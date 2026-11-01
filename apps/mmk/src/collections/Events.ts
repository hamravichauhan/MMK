import { CollectionConfig } from 'payload'
import { slugify } from '../utils/slugify'

export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
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
              type: 'richText',
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
          description: 'Pinpoint precise spatial tracking coordinates and registration handling for attendees.',
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
            {
              name: 'registration_url',
              type: 'text',
              label: 'External Registration Website URL',
              admin: {
                placeholder: 'https://external-booking-portal.com/events/join',
                description: 'Provide the destination web link where users fill out forms or clear booking passes.',
                condition: (data) => Boolean(data?.registration_open), // Only shows up when registration is active
              },
              validate: (val: any) => {
                if (!val) return true;
                if (typeof val === 'string' && (val.startsWith('http://') || val.startsWith('https://'))) return true;
                return 'Please input a valid URL starting with http:// or https://';
              }
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
        description: 'Toggling this off instantly updates the public tag banner to CLOSED and hides the portal routing line.',
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
          timeIntervals: 15,
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