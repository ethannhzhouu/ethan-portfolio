"use client"

import { useState } from "react"
import { Github } from "lucide-react"

interface GitHubProps {
  isDarkMode?: boolean
}

export default function GitHub({ isDarkMode = true }: GitHubProps) {
  const textColor = isDarkMode ? "text-white" : "text-gray-800"
  const bgColor = isDarkMode ? "bg-neutral-800" : "bg-white"
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={`h-full ${bgColor} ${textColor} flex flex-col`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-neutral-900">
          <div className="text-center">
            <Github className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Loading GitHub...</h2>
          </div>
        </div>
      )}
      
      <iframe
        src="https://github.com/ethannhzhouu/ethan-portfolio"
        className="w-full h-full"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  )
}