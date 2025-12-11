"use client"

import { Home, User, Images, Mail } from "lucide-react"
import { useEffect } from "react"
import { NavBar } from "@/components/ui/tubelight-navbar"

export default function Header() {
  useEffect(() => {
    // Auto-detect dark mode from system preference
    const applyTheme = () => {
      const savedTheme = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const isDark = savedTheme ? savedTheme === 'dark' : prefersDark
      
      const html = document.documentElement
      if (isDark) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    }

    applyTheme()

    // Listen for system dark mode changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      const savedTheme = localStorage.getItem('theme')
      if (!savedTheme) {
        applyTheme()
      }
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Galerie", url: "/gallery", icon: Images },
    { name: "Kontakt", url: "/contact", icon: Mail },
    { name: "Über uns", url: "/about", icon: User },
  ]
  return <NavBar items={navItems} />
}
