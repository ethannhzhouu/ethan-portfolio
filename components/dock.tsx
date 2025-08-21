"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { MoreHorizontal } from "lucide-react"
import type { AppWindow } from "@/types"

const dockApps = [
  { id: "launchpad", title: "Launchpad", icon: "/launchpad.png", component: "Launchpad", isSystem: true },
  { id: "safari", title: "Safari", icon: "/safari.png", component: "Safari" },
  { id: "notes", title: "Notes", icon: "/notes.png", component: "Notes" },
  { id: "terminal", title: "Terminal", icon: "/terminal.png", component: "Terminal" },
  { id: "music", title: "Music", icon: "/music.png", component: "Music" },
  { id: "linkedin", title: "LinkedIn", icon: "/linkedin.png", component: "LinkedIn" },
  { id: "resume", title: "Resume", icon: "/resume.png", component: "Resume" },
  { id: "github", title: "GitHub", icon: "/github.png", component: "GitHub" },
  { id: "photos", title: "Photos", icon: "/photos.png", component: "Photos"},
]

interface DockProps {
  onAppClick: (app: AppWindow) => void
  onLaunchpadClick: () => void
  activeAppIds: string[]
  isDarkMode: boolean
}

export default function Dock({ onAppClick, onLaunchpadClick, activeAppIds, isDarkMode }: DockProps) {
  const [mouseX, setMouseX] = useState<number | null>(null)
  const dockRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  // Check if we're on a mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!showMobileMenu) return

    const handleClickOutside = (event: MouseEvent) => {
      if (dockRef.current && !dockRef.current.contains(event.target as Node)) {
        setShowMobileMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showMobileMenu])

  const handleAppClick = (app: (typeof dockApps)[0]) => {
    if (app.id === "launchpad") {
      onLaunchpadClick()
      return
    }

  let size = { width: 800, height: 700 }
  let position = { x: Math.random() * 200 + 900, y: Math.random() * 100 + 50 }

  if (app.id === "safari") {
    size = { width: window.innerWidth / 2 + 250, height: window.innerHeight - 255}
    position = { x: 950, y: 52 } 
  }

  onAppClick({
    id: app.id,
    title: app.title,
    component: app.component,
    position: position,
    size: size,
  })

    // Close mobile menu after clicking an app
    if (showMobileMenu) {
      setShowMobileMenu(false)
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dockRef.current && !isMobile) {
      const rect = dockRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      setMouseX(x)
    }
  }

  const handleMouseLeave = () => {
    setMouseX(null)
  }

  // Calculate scale for each icon based on distance from mouse
  const getIconScale = (index: number, iconCount: number) => {
    if (mouseX === null || isMobile) return 1

    // Get the dock width and calculate the position of each icon
    const dockWidth = dockRef.current?.offsetWidth || 0
    const iconWidth = dockWidth / iconCount
    const iconPosition = iconWidth * (index + 0.5) // Center of the icon

    // Distance from mouse to icon center
    const distance = Math.abs(mouseX - iconPosition)

    // Maximum scale and distance influence
    const maxScale = 1.6
    const maxDistance = iconWidth * 2.5

    // Calculate scale based on distance (closer = larger)
    if (distance > maxDistance) return 1

    // Smooth parabolic scaling function
    const scale = 1 + (maxScale - 1) * Math.pow(1 - distance / maxDistance, 2)

    return scale
  }

  // For mobile, we'll show only the first 4 apps plus a "more" button
  const visibleApps = isMobile ? dockApps.slice(0, 4) : dockApps
  const hiddenApps = isMobile ? dockApps.slice(4) : []

  return (
    <div ref={dockRef} className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-50">
      {/* Mobile expanded menu */}
      {isMobile && showMobileMenu && (
  <div
    className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 w-[280px] 
    ${isDarkMode 
      ? "bg-neutral-900/30 border-neutral-800/30" 
      : "bg-white/90 border-white/20"} 
    backdrop-blur-lg
    rounded-xl border shadow-2xl p-4 mb-2`}
  >
          <div className="grid grid-cols-4 gap-4">
            {hiddenApps.map((app) => (
              <div
                key={app.id}
                className="flex flex-col items-center justify-center"
                onClick={() => handleAppClick(app)}
              >
                <div className="w-14 h-14 flex items-center justify-center">
                  <img
                    src={app.icon || "/placeholder.svg"}
                    alt={app.title}
                    className="w-12 h-12 object-contain"
                    draggable="false"
                  />
                </div>
                <span className={`text-xs mt-1 ${isDarkMode ? "text-white" : "text-gray-800"}`}>{app.title}</span>
                {activeAppIds.includes(app.id) && <div className="w-1 h-1 bg-white rounded-full mt-1"></div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main dock */}
<div
  className={`px-3 py-2 rounded-2xl 
    ${isDarkMode 
      ? "bg-neutral-900/30 border-neutral-800/30" 
      : "bg-white/60 border-white/20"} 
    backdrop-blur-lg
    flex items-end shadow-2xl border
    ${isMobile ? "h-20" : "h-16"}`}
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
>
        {visibleApps.map((app, index) => {
          const scale = getIconScale(index, visibleApps.length)

          return (
            <div
              key={app.id}
              className={`flex flex-col items-center justify-end h-full ${isMobile ? "px-3" : "px-2"}`}
              style={{
                transform: isMobile ? "none" : `translateY(${(scale - 1) * -8}px)`,
                zIndex: scale > 1 ? 10 : 1,
                transition: mouseX === null ? "transform 0.2s ease-out" : "none",
              }}
              onClick={() => handleAppClick(app)}
            >
              <div
                className="relative cursor-pointer"
                style={{
                  transform: isMobile ? "none" : `scale(${scale})`,
                  transformOrigin: "bottom center",
                  transition: mouseX === null ? "transform 0.2s ease-out" : "none",
                }}
              >
                <img
                  src={app.icon || "/placeholder.svg"}
                  alt={app.title}
                  className={`object-contain ${isMobile ? "w-14 h-14" : "w-12 h-12"}`}
                  draggable="false"
                />

                {}
{!isMobile && scale > 1.5 && (
  <div 
    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 
    bg-neutral-900/70 text-white/90 text-xs rounded-lg whitespace-nowrap z-50"
    style={{
      pointerEvents: 'none',
    }}
  >
    {app.title}
  </div>
)}

                {}
{activeAppIds.includes(app.id) && (
  <div className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white/70 rounded-full"></div>
)}
              </div>
            </div>
          )
        })}

        {}
        {isMobile && (
          <div
            className="flex flex-col items-center justify-end h-full px-3"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <div className="relative cursor-pointer">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center 
                ${isDarkMode ? "bg-neutral-700" : "bg-gray-200"} 
                ${showMobileMenu ? (isDarkMode ? "bg-blue-700" : "bg-blue-200") : ""}`}
              >
                <MoreHorizontal className={`w-8 h-8 ${isDarkMode ? "text-white" : "text-gray-800"}`} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
