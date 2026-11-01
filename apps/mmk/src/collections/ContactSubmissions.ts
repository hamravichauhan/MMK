import { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  access: {
    // Allows public users on your frontend website to submit the contact form securely
    create: () => true, 
    // Absolute clearance boundary enforcement: Strictly limited to Global Admins
    read: ({ req: { user } }) => Boolean(user?.roles?.includes('admin')),
    update: ({ req: { user } }) => Boolean(user?.roles?.includes('admin')),
    delete: ({ req: { user } }) => Boolean(user?.roles?.includes('admin')),
  },
  admin: {
    useAsTitle: 'subject',
    // Uses sorting structures inside the admin table row list index to monitor processing status
    defaultColumns: ['is_read', 'full_name', 'email', 'inquiry_type', 'subject', 'createdAt'],
    group: 'Operational Management',
    listSearchableFields: ['full_name', 'email', 'subject', 'message'],
  },
  hooks: {
    afterChange: [
      ({ doc, operation }) => {
        if (operation === 'create') {
          console.log(
            `[STRATEGIC INQUIRY ALERT] New lead received from ${doc.full_name} (${doc.email}) [${doc.inquiry_type}]: ${doc.subject}`
          )
        }
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Submission Details',
          description: 'Review user contact information and core message contents safely.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'full_name',
                  type: 'text',
                  required: true,
                  label: 'Sender Full Name',
                  validate: (val: string | null | undefined) => {
                    if (!val || val.trim().length < 3) {
                      return 'Name must be at least 3 characters long.'
                    }
                    return true
                  },
                  admin: {
                    width: '50%',
                    readOnly: true, // Prevents admin users from accidentally modifying user entries
                  },
                },
                {
                  name: 'email',
                  type: 'email',
                  required: true,
                  label: 'Email Address',
                  admin: {
                    width: '50%',
                    readOnly: true,
                  },
                },
              ],
            },
            {
              name: 'subject',
              type: 'text',
              required: true,
              label: 'Inquiry Subject Heading',
              validate: (val: string | null | undefined) => {
                if (!val || val.trim().length < 5) {
                  return 'Subject must be at least 5 characters long.'
                }
                return true
              },
              admin: {
                readOnly: true,
              },
            },
            {
              name: 'message',
              type: 'textarea',
              required: true,
              label: 'Detailed Message Statement',
              validate: (val: string | null | undefined) => {
                if (!val || val.trim().length < 15) {
                  return 'Message details must be at least 15 characters long.'
                }
                return true
              },
              admin: {
                readOnly: true,
                placeholder: 'User transmission details appear here...',
              },
            },
          ],
        },
      ],
    },
    
    /* ========================================================================
       CRM INBOX COMMAND SIDEBAR
       ======================================================================== */
    {
      name: 'is_read',
      type: 'checkbox',
      defaultValue: false,
      label: 'Mark Ticket as Read / Processed',
      admin: {
        position: 'sidebar',
        description: 'Check this box once this message has been answered or logged into archives.',
      },
    },
    {
      name: 'inquiry_type',
      type: 'select',
      required: true,
      label: 'Engagement Classification Desk',
      options: [
        { label: '🛡️ General Inquiry', value: 'general' },
        { label: '🗣️ Speaking Engagement / Talk', value: 'speaking' },
        { label: '📺 Media Interview Broadcast', value: 'media' },
        { label: '🚀 Defence / Career Consulting', value: 'consulting' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}