"use client"

import { useEffect, useState } from "react"
import { AppleIcon } from "@/components/icons"

interface SleepScreenProps {
  onWakeUp: () => void
  isDarkMode: boolean
}

export default function SleepScreen({ onWakeUp, isDarkMode }: SleepScreenProps) {
  const [canInteract, setCanInteract] = useState(false);

  // Enable interaction after a delay to prevent immediate sleep->wake
  useEffect(() => {
    const timer = setTimeout(() => {
      setCanInteract(true);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && canInteract) {
        onWakeUp();
      }
    };

    const handleClick = () => {
      if (canInteract) {
        onWakeUp();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('click', handleClick);
    };
  }, [onWakeUp, canInteract]);

  return (
    <div className={`h-screen w-screen bg-black flex flex-col items-center justify-center ${canInteract ? 'cursor-pointer' : ''}`}>
      <AppleIcon className="w-40 h-40 text-white mb-12 opacity-50" />
      <p className={`text-white text-lg opacity-50 ${canInteract ? 'animate-pulse' : ''}`}>
        {canInteract ? 'press space to wake up' : 'entering sleep mode...'}
      </p>
    </div>
  )
}