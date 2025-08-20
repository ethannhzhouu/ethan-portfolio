"use client"

import { useEffect } from "react"
import { AppleIcon } from "@/components/icons"

interface SleepScreenProps {
  onWakeUp: () => void
  isDarkMode: boolean
}

export default function SleepScreen({ onWakeUp, isDarkMode }: SleepScreenProps) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        onWakeUp();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onWakeUp]);

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center  justify-center">
      <AppleIcon className="w-40 h-40 text-white mb-8 opacity-30" />
      <p className="text-white text-lg opacity-50 animate-pulse">
        press space to wake up
      </p>
    </div>
  )
}