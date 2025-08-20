"use client"

import { useState, useEffect } from "react"  // Add useEffect import
import Image from "next/image"

interface LoLDodgeProps {
  isDarkMode?: boolean
}

export default function loldodge({ isDarkMode = true }: LoLDodgeProps) {
  const textColor = isDarkMode ? "text-white" : "text-gray-800"
  const bgColor = isDarkMode ? "bg-neutral-800" : "bg-white"
  const [isLoading, setIsLoading] = useState(true)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  useEffect(() => {
    if (iframeLoaded) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 4000) // Shows loading screen for at least 3 seconds

      return () => clearTimeout(timer)
    }
  }, [iframeLoaded])

  return (
    <div className={`h-full ${bgColor} ${textColor} flex flex-col`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <Image
                src="/loldodge.png"
                alt="LoL"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">Loading LoLDodgeGame...</h2>
<p className="text-base font-bold text-gray-300 mt-4 max-w-md mx-auto">
              Note: LoLDodgeGame was not created by me. All rights belong to their respective owners @ loldodgegame.com.
            </p>
          </div>
        </div>
      )}
      
      <iframe
        src="https://loldodgegame.com/skillshot/"
        className="w-full h-full"
        onLoad={() => setIframeLoaded(true)}
      />
    </div>
  )
}