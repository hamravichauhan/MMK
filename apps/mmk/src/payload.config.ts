import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { v2 as cloudinary } from 'cloudinary'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Native type interfaces from your plugin internals
import type { Adapter, HandleUpload, HandleDelete, GenerateURL, StaticHandler } from '@payloadcms/plugin-cloud-storage/types'

// Collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Articles } from './collections/Articles'
import { ArticleTags } from './collections/ArticleTags'
import { Videos } from './collections/Videos'
import { Soldiers } from './collections/Soldiers'
import { Events } from './collections/Events'
import { GalleryAlbums } from './collections/GalleryAlbums'
import { GalleryPhotos } from './collections/GalleryPhotos'
import { ContactSubmissions } from './collections/ContactSubmissions'
import {Ads} from './collections/Ads'

// Globals
import { SiteSettings } from './globals/SiteSettings'

// ─── Cloudinary Configuration ──────────────────────────────────────────────
const CLOUDINARY_FOLDER = process.env.CLOUDINARY_FOLDER ?? 'payload-media'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key:    process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

// ─── Cloudinary Adapter Factory conforming strictly to Adapter type ────────
const cloudinaryAdapter: Adapter = () => {
  
  const handleUpload: HandleUpload = async ({ file }) => {
    const fileBaseName = file.filename.split('.')[0]
    
    await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: CLOUDINARY_FOLDER,
          public_id: fileBaseName,
          resource_type: 'auto',
          overwrite: true,
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary Stream Upload Error:', error)
            return reject(error)
          }
          resolve(result)
        }
      ).end(file.buffer)
    })
  }

  const handleDelete: HandleDelete = async ({ filename }) => {
    const fileBaseName = filename.split('.')[0]
    const publicId = `${CLOUDINARY_FOLDER}/${fileBaseName}`
    
    await Promise.allSettled([
      cloudinary.uploader.destroy(publicId, { resource_type: 'image' }),
      cloudinary.uploader.destroy(publicId, { resource_type: 'video' }),
      cloudinary.uploader.destroy(publicId, { resource_type: 'raw' }),
    ])
  }

  const generateURL: GenerateURL = ({ filename }) => {
    const fileBaseName = filename.split('.')[0]
    return cloudinary.url(`${CLOUDINARY_FOLDER}/${fileBaseName}`, { 
      secure: true,
      resource_type: 'image'
    })
  }

  const staticHandler: StaticHandler = async (req, { params }) => {
    try {
      const filename = params.filename
      if (!filename) {
        return new Response('Not Found', { status: 404 })
      }

      const fileBaseName = filename.split('.')[0]
      const cloudUrl = cloudinary.url(`${CLOUDINARY_FOLDER}/${fileBaseName}`, { secure: true })
      
      return Response.redirect(cloudUrl, 302)
    } catch (err) {
      return new Response('Internal Server Error', { status: 500 })
    }
  }

  return {
    name: 'cloudinary',
    handleUpload,
    handleDelete,
    generateURL,
    staticHandler,
  }
}

// ─── Build Config ────────────────────────────────────────────────────────────
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    // Fixes flashing & Turbopack layout compilation panics by enforcing dark mode directly
    theme: 'dark',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  
  collections: [
    Users,
    Media,
    Articles,
    ArticleTags,
    Videos,
    Soldiers,
    Events,
    GalleryAlbums,
    GalleryPhotos,
    ContactSubmissions,
    Ads
  ],
  
  globals: [SiteSettings,],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'dev-fallback-secret-key-min-32-characters-long',
  
  // Find this section inside your export default buildConfig({...})
  db: sqliteAdapter({
    client: {
      // Swapping to a fresh development filename completely detours the conflicting index cache
      url: process.env.DATABASE_URL || 'file:./payload_v3.db',
    },
  }),
  
  plugins: [
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: cloudinaryAdapter,
          disableLocalStorage: true,
        },
      },
    }),
  ],
  
  sharp,
  
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})