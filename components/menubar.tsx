"use client"

import type React from "react"
import { SpotlightIcon } from "@/components/icons"
import { ControlCenterIcon } from "@/components/icons"
import { useState, useRef, useEffect } from "react"
import { AppleIcon } from "@/components/icons"


interface MenubarProps {
  time: Date
  onLogout: () => void
  onSleep: () => void
  onShutdown: () => void
  onRestart: () => void
  onSpotlightClick: () => void
  onControlCenterClick: () => void
  isDarkMode: boolean
  activeWindow: { id: string; title: string } | null
}

export default function Menubar({
  time,
  onLogout,
  onSleep,
  onShutdown,
  onRestart,
  onSpotlightClick,
  onControlCenterClick,
  isDarkMode,
  activeWindow,
}: MenubarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [batteryLevel, setBatteryLevel] = useState(100)
  const [isCharging, setIsCharging] = useState(false)
  const [showWifiToggle, setShowWifiToggle] = useState(false)
  const [wifiEnabled, setWifiEnabled] = useState(true)
  const menuRef = useRef<HTMLDivElement>(null)
  const wifiRef = useRef<HTMLDivElement>(null)

const formattedTime = time.toLocaleString("en-US", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
}).replace(',', ' •').replace('at', ' •').replace('PM', 'ᴘᴍ').replace('AM', 'ᴀᴍ')

  useEffect(() => {
    if ("getBattery" in navigator) {
      // @ts-ignore - getBattery is not in the standard navigator type
      navigator
        .getBattery()
        .then((battery: any) => {
          updateBatteryStatus(battery)
          battery.addEventListener("levelchange", () => updateBatteryStatus(battery))
          battery.addEventListener("chargingchange", () => updateBatteryStatus(battery))
        })
        .catch(() => {
          setBatteryLevel(100)
          setIsCharging(false)
        })
    }

    const savedWifi = localStorage.getItem("wifiEnabled")
    if (savedWifi !== null) {
      setWifiEnabled(savedWifi === "true")
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null)
      }

      if (
        wifiRef.current &&
        !wifiRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest(".wifi-icon")
      ) {
        setShowWifiToggle(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const updateBatteryStatus = (battery: any) => {
    setBatteryLevel(Math.round(battery.level * 100))
    setIsCharging(battery.charging)
  }

  const toggleMenu = (menuName: string) => {
    if (activeMenu === menuName) {
      setActiveMenu(null)
    } else {
      setActiveMenu(menuName)
    }
  }

  const toggleWifi = () => {
    const newState = !wifiEnabled
    setWifiEnabled(newState)
    localStorage.setItem("wifiEnabled", newState.toString())
  }

  const toggleWifiPopup = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowWifiToggle(!showWifiToggle)
  }

  const menuBgClass = isDarkMode ? "bg-black/40 backdrop-blur-md" : "bg-white/20 backdrop-blur-md"
  const dropdownBgClass = isDarkMode ? "bg-neutral-800/90 backdrop-blur-md" : "bg-neutral-200/90 backdrop-blur-md"
  const textClass = isDarkMode ? "text-white" : "text-gray-800"
  const hoverClass = isDarkMode ? "hover:bg-blue-600" : "hover:bg-blue-400"

  return (
    <div
      ref={menuRef}
      className={`fixed top-0 left-0 right-0 h-10 ${menuBgClass} z-50 flex items-center px-4 ${textClass} text-sm`}
    >
      <div className="flex-1 flex items-center">
        <button
          className="flex items-center mr-4 hover:bg-neutral-400 px-2 py-1 rounded"
          onClick={() => toggleMenu("apple")}
        >
<AppleIcon
  className="w-5 h-5"
  fillColor={isDarkMode ? "white" : "black"}
/>

        </button>

        {activeMenu === "apple" && (
          <div className={`absolute top-9 left-3 ${dropdownBgClass} rounded-lg shadow-xl ${textClass} py-1 w-56`}>
            <button className={`w-full text-left px-4 py-1 ${hoverClass}`}>Last Updated: 8/18/2025</button>
            <div className="border-t border-neutral-700 my-1"></div>
            <button className={`w-full text-left px-4 py-1 ${hoverClass}`} onClick={onSleep}>
              Sleep
            </button>
            <button className={`w-full text-left px-4 py-1 ${hoverClass}`} onClick={onRestart}>
              Restart
            </button>
            <button className={`w-full text-left px-4 py-1 ${hoverClass}`} onClick={onShutdown}>
              Shut Down
            </button>
            <div className="border-t border-neutral-700 my-1"></div>
            <button className={`w-full text-left px-4 py-1 ${hoverClass}`} onClick={onLogout}>
              Log Out Ethan
            </button>
          </div>
        )}

        {activeWindow && (
          <button
            className={`mr-4 font-medium hover:bg-white/10 px-2 py-0.5 rounded ${activeMenu === "app" ? "bg-white/10" : ""}`}
            onClick={() => toggleMenu("app")}
          >
            {activeWindow.title}
          </button>
        )}
      </div>

<div className="flex items-center space-x-3"> {}
  <div className="relative">
    <div 
      className={`w-12 h-5 rounded-[3px] border border-current flex items-center 
      ${isCharging ? 'bg-green-500/20' : ''}`}
    >
      <div 
        className={`h-4 mx-0.5 rounded-[2px] transition-all duration-300
        ${isCharging ? 'bg-green-500' : 'bg-current'}`} 
        style={{ width: `${Math.max(2, (batteryLevel))}%` }}
      />
    </div>
    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white mix-blend-difference pointer-events-none">
      {batteryLevel}%
    </span>
    <div className="absolute -right-[2px] top-1/2 -translate-y-1/2 w-[2px] h-3 bg-current rounded-r-sm" />
  </div>


        <div className="relative">
          {showWifiToggle && (
            <div
              ref={wifiRef}
              className={`absolute top-6 right-0 ${dropdownBgClass} rounded-lg shadow-xl ${textClass} py-3 px-4 w-64`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">Wi-Fi</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={wifiEnabled} onChange={toggleWifi} className="sr-only peer" />
                  <div className="w-11 h-6 bg-neutral peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
            </div>
          )}
        </div>

        <button onClick={onSpotlightClick} className="hover:bg-neutral-400 p-1.5 rounded-sm">
            <SpotlightIcon className="w-3.5 h-3.5" color={isDarkMode ? "white" : "black"} />
        </button>

<button 
  onClick={onControlCenterClick} 
  className="hover:bg-neutral-400 p-1.5 rounded-sm"
>
  <ControlCenterIcon className="w-4 h-4" color={isDarkMode ? "white" : "black"} />
</button>

<span className="font-medium tracking-wide">
  {formattedTime}
</span>
      </div>
    </div>
  )
}
