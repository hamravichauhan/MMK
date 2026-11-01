'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'

interface GalleryPhotoItem {
  id: number | string
  url: string
  caption?: string | null
}

interface GalleryLightboxProps {
  photos: GalleryPhotoItem[]
}

export default function GalleryLightbox({ photos }: GalleryLightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return
      if (e.key === 'Escape') setSelectedIndex(null)
      if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev !== null && prev < photos.length - 1 ? prev + 1 : 0))
      }
      if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : photos.length - 1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, photos.length])

  if (!photos || photos.length === 0) {
    return (
      <div style={{ padding: '40px 0', borderTop: '1px dashed var(--border-color, #1E293B)' }}>
        <p className="themed-sub-text" style={{ margin: 0 }}>
          This gallery album does not contain any images yet.
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Grid of photos */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gridAutoRows: '220px',
          gap: '16px',
          gridAutoFlow: 'dense',
        }}
      >
        {photos.map((photo, index) => {
          const isWide = index % 4 === 0
          const isHigh = index % 6 === 0

          return (
            <div
              key={photo.id}
              onClick={() => setSelectedIndex(index)}
              className="editorial-card-item"
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '6px',
                cursor: 'pointer',
                gridColumnEnd: isWide ? 'span 2' : 'auto',
                gridRowEnd: isHigh ? 'span 2' : 'auto',
              }}
            >
              <Image
                src={photo.url}
                alt={photo.caption || 'Album Image Content'}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
              />

              {/* Hover overlay hint */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  opacity: 0,
                  transition: 'opacity 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                className="gallery-hover-overlay"
              >
                <div
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    padding: '8px',
                    borderRadius: '50%',
                    color: '#FFFFFF',
                  }}
                >
                  <Maximize2 size={20} />
                </div>
              </div>

              {photo.caption && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '24px 14px 12px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0))',
                    color: '#FFFFFF',
                    fontSize: '12.5px',
                    fontWeight: '500',
                    lineHeight: '1.4',
                  }}
                >
                  {photo.caption}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <style>{`
        .editorial-card-item:hover .gallery-hover-overlay {
          opacity: 1 !important;
        }
      `}</style>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          onClick={() => setSelectedIndex(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.92)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          {/* Header Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: '20px',
              left: '24px',
              right: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#FFFFFF',
              zIndex: 10,
            }}
          >
            <span style={{ fontSize: '13px', fontWeight: 600, opacity: 0.8 }}>
              Photo {selectedIndex + 1} of {photos.length}
            </span>
            <button
              onClick={() => setSelectedIndex(null)}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                color: '#FFFFFF',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Previous Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setSelectedIndex((prev) =>
                prev !== null && prev > 0 ? prev - 1 : photos.length - 1,
              )
            }}
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Main Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '75vh',
              width: '850px',
              height: '550px',
            }}
          >
            <Image
              src={photos[selectedIndex].url}
              alt={photos[selectedIndex].caption || 'Enlarged photo'}
              fill
              unoptimized
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* Next Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setSelectedIndex((prev) =>
                prev !== null && prev < photos.length - 1 ? prev + 1 : 0,
              )
            }}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            <ChevronRight size={24} />
          </button>

          {/* Bottom Caption Bar */}
          {photos[selectedIndex].caption && (
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                bottom: '24px',
                maxWidth: '750px',
                textAlign: 'center',
                color: '#FFFFFF',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                padding: '10px 20px',
                borderRadius: '6px',
                fontSize: '14px',
                lineHeight: '1.5',
              }}
            >
              {photos[selectedIndex].caption}
            </div>
          )}
        </div>
      )}
    </>
  )
}
