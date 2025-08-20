"use client"

import { useState, useEffect } from "react"
import { 
  Wifi, 
  Bluetooth, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX, 
  Maximize,
  MinusIcon,
  PlusIcon 
} from "lucide-react"

interface ControlCenterProps {
  onClose: () => void
  isDarkMode: boolean
  onToggleDarkMode: () => void
  brightness: number
  onBrightnessChange: (value: number) => void
}

export default function ControlCenter({
  onClose,
  isDarkMode,
  onToggleDarkMode,
  brightness,
  onBrightnessChange,
}: ControlCenterProps) {
  const [wifiEnabled, setWifiEnabled] = useState(true)
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true)
  const [volume, setVolume] = useState(75)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const savedWifi = localStorage.getItem("wifiEnabled")
    if (savedWifi !== null) {
      setWifiEnabled(savedWifi === "true")
    }

    setIsFullscreen(!!document.fullscreenElement)

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const toggleWifi = () => {
    const newState = !wifiEnabled
    setWifiEnabled(newState)
    localStorage.setItem("wifiEnabled", newState.toString())
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <div 
      className="fixed top-1 right-1 w-80 bg-white/10 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
    {/* Top spacing */}
    <div className="pt-5" />
    
    <div className="p-4 space-y-4">


        {/* Display & Theme Controls */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-white/90">Display</span>
              <span className="text-xs text-gray-500 dark:text-white/70">{brightness}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={brightness}
              onChange={(e) => onBrightnessChange(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer"
            />
          </div>

          <button
            onClick={onToggleDarkMode}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700/70"
          >
            <span className="text-sm text-gray-700 dark:text-white/90">Theme</span>
            {isDarkMode ? 
              <Moon className="w-4 h-4 text-gray-600 dark:text-white/70" /> : 
              <Sun className="w-4 h-4 text-gray-600 dark:text-white/70" />
            }
          </button>
        </div>

        {/* Quick Settings Grid */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={toggleWifi}
            className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
              wifiEnabled 
                ? "bg-blue-500 hover:bg-blue-600" 
                : "bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700/70"
            }`}
          >
            <span className={`text-sm ${wifiEnabled ? "text-white" : "text-gray-700 dark:text-white/90"}`}>
              Wi-Fi
            </span>
            <Wifi className={`w-4 h-4 ${wifiEnabled ? "text-white" : "text-gray-600 dark:text-white/70"}`} />
          </button>

          <button
            onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
            className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
              bluetoothEnabled 
                ? "bg-blue-500 hover:bg-blue-600" 
                : "bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700/70"
            }`}
          >
            <span className={`text-sm ${bluetoothEnabled ? "text-white" : "text-gray-700 dark:text-white/90"}`}>
              Bluetooth
            </span>
            <Bluetooth className={`w-4 h-4 ${bluetoothEnabled ? "text-white" : "text-gray-600 dark:text-white/70"}`} />
          </button>
        </div>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${
            isFullscreen 
              ? "bg-blue-500 hover:bg-blue-600" 
              : "bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700/70"
          }`}
        >
          <span className={`text-sm ${isFullscreen ? "text-white" : "text-gray-700 dark:text-white/90"}`}>
            {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          </span>
          <Maximize className={`w-4 h-4 ${isFullscreen ? "text-white" : "text-gray-600 dark:text-white/70"}`} />
        </button>
      </div>
    </div>
  )
}