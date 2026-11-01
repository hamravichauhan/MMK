import { v2 as cloudinary } from 'cloudinary'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

cloudinary.config({
  cloud_name: 'dsvqz4afr',
  api_key: '793288312966864',
  api_secret: 'Z4tBgu0H6riaqSkUXJY1w1eCxek',
})

const publicDir = path.join(__dirname, 'public', 'media')
fs.mkdirSync(publicDir, { recursive: true })

const assets = [
  { name: 'book-cover', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800' },
  { name: 'documentary-poster', url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800' },
  { name: 'major-madhan', url: 'https://indianspeakerbureau.com/img/1713876356_971218-retdmajor1.avif' },
  { name: 'naval-fleet', url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800' },
  { name: 'drone-shield', url: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800' },
  { name: 'operation-sindoor', url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=800' },
  { name: 'carrier-group', url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80&w=800' },
  { name: 'himalayan-post', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800' },
  { name: 'summit-conclave', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800' },
  { name: 'vikram-batra', url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=800' },
  { name: 'somnath-sharma', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800' },
  { name: 'tactical-cap', url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800' },
  { name: 'military-tee', url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800' },
  { name: 'commemorative-coin', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800' },
  { name: 'edc-pouch', url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80&w=800' },
  { name: 'mahendra-mulla', url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800' },
  { name: 'abhilash-tomy', url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80&w=800' },
  { name: 'nirmal-sekhon', url: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800' },
  { name: 'mohit-sharma', url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=800' },
  { name: 'sanjay-kumar', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800' },
  { name: 'siachen-hoodie', url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800' },
  { name: 'tactical-mug', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800' },
  { name: 'osint-radar', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800' },
  { name: 'cyber-command', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800' },
  { name: 'naval-exercise', url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800' },
  { name: 'ladakh-convoy', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800' },
]

async function run() {
  console.log(`Starting WebP conversion and Cloudinary upload for ${assets.length} assets...`)

  for (const asset of assets) {
    try {
      console.log(`\nFetching ${asset.name} from ${asset.url}...`)
      const res = await fetch(asset.url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
      if (!res.ok) {
        console.error(`Failed to fetch ${asset.name}: status ${res.status}`)
        continue
      }
      const arrayBuffer = await res.arrayBuffer()
      const rawBuffer = Buffer.from(arrayBuffer)

      // Convert to WebP format using Sharp
      const webpBuffer = await sharp(rawBuffer)
        .webp({ quality: 85 })
        .toBuffer()

      // Save local backup in public/media/[name].webp
      const localWebpPath = path.join(publicDir, `${asset.name}.webp`)
      fs.writeFileSync(localWebpPath, webpBuffer)
      console.log(` - Saved local backup: ${localWebpPath} (${(webpBuffer.length / 1024).toFixed(1)} KB)`)

      // Upload to Cloudinary with format: 'webp' and public_id: asset.name
      await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'payload-media',
            public_id: asset.name,
            format: 'webp',
            resource_type: 'image',
            overwrite: true,
          },
          (error, result) => {
            if (error) {
              console.error(` - Cloudinary upload failed for ${asset.name}:`, error)
              return reject(error)
            }
            console.log(` - Cloudinary Uploaded: ${result.secure_url} (${result.format}, ${(result.bytes / 1024).toFixed(1)} KB)`)
            resolve(result)
          }
        ).end(webpBuffer)
      })
    } catch (err) {
      console.error(`Error processing ${asset.name}:`, err)
    }
  }

  console.log('\n======================================================')
  console.log('✅ All assets successfully converted to WebP and uploaded to Cloudinary!')
  console.log('======================================================')
}

run()
