"use client"

import { useEffect, useState } from "react"
import { AppleIcon } from "@/components/icons"

interface ShutdownScreenProps {
  onBoot: () => void
}

export default function ShutdownScreen({ onBoot }: ShutdownScreenProps) {
  const [showBootText, setShowBootText] = useState(false)

  useEffect(() => {
    // Show the "Press space to boot" text after a delay
    const timer = setTimeout(() => {
      setShowBootText(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && showBootText) {
        onBoot();
      }
    };

    const handleClick = () => {
      if (showBootText) {
        onBoot();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('click', handleClick);
    };
  }, [onBoot, showBootText]);

  return (
    <div className={`h-screen w-screen bg-black flex flex-col items-center justify-center ${showBootText ? 'cursor-pointer' : ''}`}>
      {showBootText ? (
        <div className="flex flex-col items-center">
          <AppleIcon className="w-40 h-40 text-white mb-12 opacity-80" />
          <p className="text-white text-lg animate-pulse">press space to boot</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-white text-lg mb-4">Shutting down ... </p>
          <div className="w-8 h-8 border-t-2 border-white rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}