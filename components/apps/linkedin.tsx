"use client"

import { useState } from "react"
import Image from "next/image"

interface LinkedInProps {
  isDarkMode?: boolean
}

export default function LinkedIn({ isDarkMode = true }: LinkedInProps) {
  const textColor = isDarkMode ? "text-white" : "text-gray-800"
  const bgColor = isDarkMode ? "bg-neutral-800" : "bg-white"

  return (
    <div className={`h-full ${bgColor} ${textColor} flex flex-col`}>
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <Image
            src="/linkedin.png"
            alt="LinkedIn"
            fill
            className="object-contain"
          />
        </div>
        <h2 className="text-2xl font-bold mb-4">LinkedIn Profile</h2>
        <p className="text-lg mb-6 opacity-80">
          Connect with me on LinkedIn!
        </p>
        <a
          href="https://www.linkedin.com/in/ethannhzhouu/"
          target="_blank"

          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Open LinkedIn Profile
        </a>
      </div>
    </div>
  )
}