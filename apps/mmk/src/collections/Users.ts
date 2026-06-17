import { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true, // Injects 'email' and 'password' fields automatically
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'roles', 'updatedAt'],
    group: 'Operational Management',
    listSearchableFields: ['email', 'roles'],
  },
  access: {
    // 1. DASHBOARD PANEL GATEWAY: Allows access to the GUI for any authorized team role
    admin: async ({ req }) => {
      const { user, payload } = req

      // BOOTSTRAP SAFEGUARD: If the database is empty, let the first person in to create the root Admin
      const totalUsers = await payload.find({
        collection: 'users',
        limit: 0,
      })
      if (totalUsers.totalDocs === 0) {
        return true
      }

      if (!user || !user.roles) return false

      // Allow login if their roles array contains at least one valid operational assignment
      const allowedRoles = ['admin', 'editor:soldiers', 'editor:articles', 'editor:multimedia']
      return user.roles.some((role: string) => allowedRoles.includes(role))
    },

    // 2. CREATION CONTROL: Only logged-in Global Admins holding the 'admin' flag can register accounts
    create: ({ req: { user } }) => Boolean(user?.roles?.includes('admin')),

    // 3. READ POLICIES: Admins see everyone; specialized editors can only see their own row
    read: ({ req: { user } }) => {
      if (user?.roles?.includes('admin')) return true
      if (user) return { id: { equals: user.id } }
      return false
    },

    // 4. UPDATE POLICIES: Admins can modify any profile; editors can only change their own profile fields
    update: ({ req: { user } }) => {
      if (user?.roles?.includes('admin')) return true
      if (user) return { id: { equals: user.id } }
      return false
    },

    // 5. DELETION SECURITY: Absolutely restricted to the Global Admin
    delete: ({ req: { user } }) => Boolean(user?.roles?.includes('admin')),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Account Coordinates',
          description: 'Manage individual user access permissions and operational clearances.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'roles', // Multi-select array field
                  type: 'select',
                  required: true,
                  hasMany: true, // Allows assigning multiple desks to a single team member simultaneously
                  defaultValue: ['editor:articles'],
                  label: 'Security Clearance Desk Assignments',
                  options: [
                    { label: '👑 Global Administrator (Full System Override)', value: 'admin' },
                    { label: '🪖 Editor: Soldiers Registry (Veer Gatha Desk)', value: 'editor:soldiers' },
                    { label: '✍️ Editor: Editorial Articles & Tags', value: 'editor:articles' },
                    { label: '📺 Editor: Multimedia & Video Broadcasts', value: 'editor:multimedia' },
                  ],
                  admin: {
                    width: '100%',
                    description: 'Select all content desks this staff member is authorized to manage.',
                  },
                  // ⚡ IRONCLAD FIELD-LEVEL ACCESS LOCKS
                  access: {
                    // Restricts field visibility exclusively to Global Admins
                    read: ({ req: { user } }) => Boolean(user?.roles?.includes('admin')),
                    // Restricts field mutability so an editor cannot push unauthorized roles to the API
                    update: ({ req: { user } }) => Boolean(user?.roles?.includes('admin')),
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}