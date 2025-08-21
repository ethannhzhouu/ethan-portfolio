"use client"

import { useState } from "react"
import Image from "next/image"

interface YoutubeProps {
  isDarkMode?: boolean
}

export default function Youtube({ isDarkMode = true }: YoutubeProps) {
  const textColor = isDarkMode ? "text-white" : "text-gray-800"
  const bgColor = isDarkMode ? "bg-neutral-900" : "bg-white"

  return (
    <div className={`h-full ${bgColor} ${textColor} flex flex-col`}>
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <Image
            src="/youtube.png"
            alt="YouTube"
            fill
            className="object-contain"
          />
        </div>
        <h2 className="text-2xl font-bold mb-4">YouTube</h2>
        <p className="text-lg mb-6 opacity-80">
          Due to security restrictions, YouTube cannot be embedded directly.
        </p>
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Open YouTube in New Tab
        </a>
      </div>
    </div>
  )
}