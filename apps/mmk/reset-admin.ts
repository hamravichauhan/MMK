import { getPayload } from 'payload'
import configPromise from './src/payload.config'

async function resetPassword() {
  const payload = await getPayload({ config: configPromise })

  // 1. Find existing users
  const { docs: users } = await payload.find({
    collection: 'users',
    limit: 1,
  })

  if (!users || users.length === 0) {
    console.log('No existing user found. Open http://localhost:3000/admin to create your first user.')
    process.exit(0)
  }

  const user = users[0]
  const newEmail = user.email || 'admin@mmk.local'
  const newPassword = 'Password123!'

  // 2. Update password
  await payload.update({
    collection: 'users',
    id: user.id,
    data: {
      password: newPassword,
    },
  })

  console.log('====================================')
  console.log('Admin credentials updated successfully!')
  console.log(`Email:    ${newEmail}`)
  console.log(`Password: ${newPassword}`)
  console.log('====================================')
  process.exit(0)
}

resetPassword().catch((err) => {
  console.error('Reset failed:', err)
  process.exit(1)
})