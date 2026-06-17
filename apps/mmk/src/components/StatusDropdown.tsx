'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const StatusDropdown: React.FC<any> = ({ rowData }) => {
  const router = useRouter()
  const articleId = rowData?.id

  // Track status locally in a clean component state wrapper
  const [currentStatus, setCurrentStatus] = useState(rowData?.status || 'draft')

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value
    setCurrentStatus(newStatus)

    try {
      // Clean relative API endpoint matching your active Next.js origin routing structures
      const patchUrl = `/api/articles/${articleId}`

      const response = await fetch(patchUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        // Attaches active browser cookies to bypass the 403 Forbidden wall
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        // Force server components to quietly re-evaluate database logs on the list view grid
        router.refresh()
      } else {
        const errJson = await response.json().catch(() => ({}))
        console.error('Failed to patch document status lifecycle:', response.status, errJson)
      }
    } catch (err) {
      console.error('Error executing status change:', err)
    }
  }

  return (
    <div style={{ display: 'inline-block' }} onClick={(e) => e.stopPropagation()}>
      <select
        value={currentStatus}
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()} // Prevents the cell click event from drilling into the document edit view
        style={{
          backgroundColor: '#111',
          color: '#fff',
          border: '1px solid #333',
          padding: '6px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: '500',
          outline: 'none',
        }}
      >
        <option value="draft">📝 Draft</option>
        <option value="published">🟢 Published</option>
        <option value="archived">📦 Archived</option>
      </select>
    </div>
  )
}

export default StatusDropdown
