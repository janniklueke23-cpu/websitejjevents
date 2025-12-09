"use client"

import { Home, User, Images, Mail } from "lucide-react"
import { NavBar } from "@/components/ui/tubelight-navbar"

export default function Header() {
  const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Galerie", url: "/gallery", icon: Images },
    { name: "Kontakt", url: "/contact", icon: Mail },
    { name: "Über uns", url: "/about", icon: User },
  ]
  return <NavBar items={navItems} />
}
