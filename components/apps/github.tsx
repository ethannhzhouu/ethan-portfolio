"use client"

import { useState } from "react"
import { Github, Star, GitFork, Code } from "lucide-react"

interface GitHubProps {
  isDarkMode?: boolean
}

export default function GitHub({ isDarkMode = true }: GitHubProps) {
  const textColor = isDarkMode ? "text-white" : "text-gray-800"
  const bgColor = isDarkMode ? "bg-neutral-800" : "bg-white"

  return (
    <div className={`h-full ${bgColor} ${textColor} flex flex-col`}>
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <Github className="w-24 h-24 mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-4">GitHub Repository</h2>
        <p className="text-lg mb-6 opacity-80">
          Check out my portfolio source code and other projects on GitHub.
        </p>
        
        <div className="flex gap-4 mb-6">
          <div className="flex items-center gap-1 text-sm opacity-70">
            <Code className="w-4 h-4" />
            <span>TypeScript</span>
          </div>
          <div className="flex items-center gap-1 text-sm opacity-70">
            <Star className="w-4 h-4" />
            <span>Portfolio</span>
          </div>
          <div className="flex items-center gap-1 text-sm opacity-70">
            <GitFork className="w-4 h-4" />
            <span>Next.js</span>
          </div>
        </div>
        
        <a
          href="https://github.com/ethannhzhouu/ethan-portfolio"
          target="_blank"
          className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          View GitHub Repository
        </a>
      </div>
    </div>
  )
}