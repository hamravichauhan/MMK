'use client'

import React from 'react'
import { useLanguage } from '../context/LanguageContext'

interface VideoBroadcastGridProps {
  videos: any[]
}

export const VideoBroadcastGrid: React.FC<VideoBroadcastGridProps> = ({ videos }) => {
  const { t } = useLanguage()

  if (!videos || videos.length === 0) return null

  return (
    <section className="border-b border-slate-800 pb-12 mt-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-serif text-xl md:text-2xl font-black text-white uppercase tracking-tight">
            {t('Latest Video Analyses', 'சமீபத்திய வீடியோ பகுப்பாய்வு')}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {t(
              'Live broadcast feeds monitoring active global defense operations.',
              'உலகளாவிய பாதுகாப்பு நடவடிக்கைகளை கண்காணிக்கும் நேரடி ஒளிபரப்புகள்.',
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {videos.map((vid) => (
          <div
            key={vid.id}
            className="group bg-[#161F30] border border-slate-800 rounded-xl overflow-hidden hover:border-[#D4AF37]/30 transition-all duration-300 flex flex-col h-full"
          >
            <a
              href={`https://www.youtube.com/watch?v=${vid.youtube_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-video bg-black block w-full overflow-hidden"
            >
              {/* Uses direct high-resolution format layout strings directly from YouTube's server engine */}
              <img
                src={`https://img.youtube.com/vi/${vid.youtube_id}/maxresdefault.jpg`}
                alt="Video thumbnail"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  // Fallback if maxres is missing
                  e.currentTarget.src = `https://img.youtube.com/vi/${vid.youtube_id}/mqdefault.jpg`
                }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
              <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-black tracking-wider text-white">
                {vid.category.toUpperCase()}
              </div>
            </a>
            <div className="p-4 flex flex-col flex-grow justify-between">
              <h3 className="font-sans text-xs font-bold text-slate-200 line-clamp-2 leading-snug group-hover:text-[#D4AF37] transition-colors mb-2">
                <a
                  href={`https://www.youtube.com/watch?v=${vid.youtube_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(
                    `Geopolitical stream mapping id: ${vid.youtube_id}`,
                    `புவிசார் அரசியல் பகுப்பாய்வு குறியீடு: ${vid.youtube_id}`,
                  )}
                </a>
              </h3>
              <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wide flex justify-between items-center mt-2 border-t border-slate-800/60 pt-2">
                <span>ID: {vid.youtube_id}</span>
                <span className="text-[#D4AF37] font-bold">Watch Video →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
