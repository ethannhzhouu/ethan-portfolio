"use client"

import { useState } from "react"
import Image from "next/image"

interface ResumeProps {
  isDarkMode?: boolean
}

export default function Resume({ isDarkMode = true }: ResumeProps) {
  const textColor = isDarkMode ? "text-white" : "text-gray-800"
  const bgColor = isDarkMode ? "bg-gray-900" : "bg-white"
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={`h-full ${bgColor} ${textColor} flex flex-col`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-900">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <Image
                src="/resume.png"
                alt="Resume"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">Loading Resume...</h2>
          </div>
        </div>
      )}
      
      <iframe
        src="/EthanZhou_2025Fall_Resume.pdf"
        className="w-full h-full"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  )
}