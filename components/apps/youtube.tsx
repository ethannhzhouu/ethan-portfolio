"use client"

import { useState } from "react"
import Image from "next/image"

interface YoutubeProps {
  isDarkMode?: boolean
}

export default function Youtube({ isDarkMode = true }: YoutubeProps) {
  const textColor = isDarkMode ? "text-white" : "text-gray-800"
  const bgColor = isDarkMode ? "bg-neutral-900" : "bg-white"
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={`h-full ${bgColor} ${textColor} flex flex-col`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-900">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <Image
                src="/youtube.png"
                alt="Youtube"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">Loading Youtube...</h2>
          </div>
        </div>
      )}
      
      <iframe
        src="https://www.youtube.com/"
        className="w-full h-full"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  )
}