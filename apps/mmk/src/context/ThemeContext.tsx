'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type ThemeMode = 'light' | 'dark' | 'classic'

export interface ThemeColors {
  bg: string
  cardBg: string
  text: string
  border: string
  textMuted: string
  accent: string
  headerBg: string
  footerBg: string
  subtleBg: string
  inputBg: string
}

interface ThemeContextType {
  theme: ThemeMode
  setTheme: (mode: ThemeMode) => void
  colors: ThemeColors
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const themePalettes: Record<ThemeMode, ThemeColors> = {
  light: {
    bg: '#F8FAFC',
    cardBg: '#FFFFFF',
    text: '#0F172A',
    border: '#E2E8F0',
    textMuted: '#64748B',
    accent: '#4B5320', // Classic Military Olive
    headerBg: '#FFFFFF',
    footerBg: '#F1F5F9',
    subtleBg: '#F8FAFC',
    inputBg: '#FFFFFF',
  },
  dark: {
    bg: '#0F172A', // Slate dark background
    cardBg: '#1E293B',
    text: '#F8FAFC',
    border: '#334155',
    textMuted: '#94A3B8',
    accent: '#38BDF8', // Cyan tactical splash
    headerBg: '#1E293B',
    footerBg: '#090E1A',
    subtleBg: '#131B2E',
    inputBg: '#0F172A',
  },
  classic: {
    bg: '#070A14', // Signature high-density deep defense background
    cardBg: '#0F1526',
    text: '#E2E8F0',
    border: '#1E293B',
    textMuted: '#64748B',
    accent: '#656E36', // Premium Olive Drab
    headerBg: '#0F1526',
    footerBg: '#05070D',
    subtleBg: '#090D1A',
    inputBg: '#0A0E1A',
  },
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('classic')

  useEffect(() => {
    const savedTheme = localStorage.getItem('mmk-ui-theme') as ThemeMode
    if (
      savedTheme &&
      (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'classic')
    ) {
      setThemeState(savedTheme)
    }
  }, [])

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode)
    localStorage.setItem('mmk-ui-theme', mode)
  }

  const currentColors = themePalettes[theme]

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.style.colorScheme = theme === 'light' ? 'light' : 'dark'
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors: currentColors }}>
      <style>{`
        :root {
          --bg-color: ${currentColors.bg};
          --bg-canvas: ${currentColors.bg};
          --background: ${currentColors.bg};
          --card-bg: ${currentColors.cardBg};
          --card: ${currentColors.cardBg};
          --text-color: ${currentColors.text};
          --text-main: ${currentColors.text};
          --foreground: ${currentColors.text};
          --heading-color: ${currentColors.text};
          --border-color: ${currentColors.border};
          --border: ${currentColors.border};
          --muted-text: ${currentColors.textMuted};
          --muted-foreground: ${currentColors.textMuted};
          --accent-color: ${currentColors.accent};
          --primary: ${currentColors.accent};
          --header-bg: ${currentColors.headerBg};
          --footer-bg: ${currentColors.footerBg};
          --subtle-bg: ${currentColors.subtleBg};
          --input-bg: ${currentColors.inputBg};
        }
        body {
          background-color: var(--bg-color);
          color: var(--text-color);
          transition: background-color 0.25s ease, color 0.25s ease;
        }
      `}</style>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be inside an active ThemeProvider wrapper')
  return context
}
