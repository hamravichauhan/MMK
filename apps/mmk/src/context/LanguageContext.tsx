'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'ta'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (enText: string, taText: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en')

  // Sync preference with localStorage if available
  useEffect(() => {
    const savedLang = localStorage.getItem('mmk_preferred_lang') as Language
    if (savedLang === 'en' || savedLang === 'ta') {
      setLanguageState(savedLang)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('mmk_preferred_lang', lang)
  }

  // Quick utility function to render the appropriate language string context inline
  const t = (enText: string, taText: string) => (language === 'en' ? enText : taText)

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be wrapped within a LanguageProvider')
  return context
}
