"use client"

import { useEffect, useState } from "react"
import { AppleIcon } from "@/components/icons"

export default function BootScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 300)

    return () => clearInterval(interval)
  }, [])

  const wallpaperUrl = "/bootscreen.jpg" // replace with your image path

  return (
    <div
      className="h-screen w-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('${wallpaperUrl}')` }}
    >
      <AppleIcon className="w-40 h-40 text-white mb-8" />
      
      <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(to right, #fff, #eee)"
          }}
        />
      </div>
    </div>
  )
}
