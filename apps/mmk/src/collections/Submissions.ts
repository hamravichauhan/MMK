import { CollectionConfig } from 'payload';

export const Submissions: CollectionConfig = {
  slug: 'submissions',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'authorName', type: 'text', required: true },
    { name: 'authorEmail', type: 'email', required: true },
    { name: 'content', type: 'richText', required: true },
    { 
      name: 'status', 
      type: 'select', 
      defaultValue: 'pending',
      options: [
        { label: 'Pending Review', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
    },
  ],
};