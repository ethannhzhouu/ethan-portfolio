"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ArrowRight, RefreshCw, Home, Star, Plus, Search, Wifi } from "lucide-react"

interface SafariProps {
  isDarkMode?: boolean
}

export default function Safari({ isDarkMode = true }: SafariProps) {
  const [url, setUrl] = useState("https://ethannhzhouu.github.io")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("home")
  const [wifiEnabled, setWifiEnabled] = useState(true)

  // Get WiFi status from localStorage or default to true
  useEffect(() => {
    const checkWifiStatus = () => {
      const status = localStorage.getItem("wifiEnabled")
      setWifiEnabled(status === null ? true : status === "true")
    }

    checkWifiStatus()

    // Check every second in case it changes
    const interval = setInterval(checkWifiStatus, 1000)

    return () => clearInterval(interval)
  }, [])

  const textColor = isDarkMode ? "text-white" : "text-gray-800"
  const bgColor = isDarkMode ? "bg-neutral-900" : "bg-white"
  const toolbarBg = isDarkMode ? "bg-neutral-900" : "bg-gray-100"
  const inputBg = isDarkMode ? "bg-neutral-900" : "bg-gray-200"
  const borderColor = isDarkMode ? "border-neutral-700" : "border-gray-200"
  const cardBg = isDarkMode ? "bg-neutral-800" : "bg-gray-100"
  const hoverBg = isDarkMode ? "hover:bg-neutral-800" : "hover:bg-gray-100"

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  // Updated bookmarks with social links
  const socialLinks = [
    {
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/ethannhzhouu/",
      icon: "/linkedin.png",
    },
    {
      title: "GitHub",
      url: "https://github.com/ethannhzhouu",
      icon: "/github.png",
    },
    {
      title: "Email",
      url: "xethanhzhou@gmail.com",
      icon: "/mail.png",
    },
  ]

  const frequentlyVisited = [
    {
      title: "GitHub",
      url: "https://github.com",
      icon: "/github.png",
    },
    {
      title: "LinkedIn",
      url: "https://linkedin.com",
      icon: "/linkedin.png",
    },
    {
      title: "YouTube",
      url: "https://youtube.com",
      icon: "/youtube.png",
    },
    {
      title: "Reddit",
      url: "https://reddit.com",
      icon: "/reddit.png",
    },
    {
      title: "ChatGPT",
      url: "https://chatgpt.com",
      icon: "/chatgpt.png",
    },
    {
      title: "Stack Overflow",
      url: "https://stackoverflow.com",
      icon: "/stackoverflow.png",
    },
  ]

  // no internet connection
  const NoInternetView = () => (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div
        className={`w-24 h-24 mb-6 flex items-center justify-center rounded-full ${isDarkMode ? "bg-gray-800" : "bg-gray-200"}`}
      >
        <Wifi className={`w-12 h-12 ${isDarkMode ? "text-gray-600" : "text-gray-500"}`} />
      </div>
      <h2 className={`text-xl font-semibold mb-2 ${textColor}`}>You Are Not Connected to the Internet</h2>
      <p className={`text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"} mb-6`}>
        This page can't be displayed because your computer is currently offline.
      </p>
      <button
        className={`px-4 py-2 rounded ${
          isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
        } text-white`}
        onClick={handleRefresh}
      >
        Try Again
      </button>
    </div>
  )

  return (
    <div className={`h-full flex flex-col ${bgColor} ${textColor}`}>
      {/* Toolbar */}
      <div className={`${toolbarBg} border-b ${borderColor} p-2 flex items-center space-x-2`}>
        <button className={`p-1 rounded ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button className={`p-1 rounded ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          className={`p-1 rounded ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
          onClick={handleRefresh}
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
        </button>
        <button className={`p-1 rounded ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
          <Home className="w-4 h-4" />
        </button>

        <div className={`flex-1 flex items-center ${inputBg} rounded px-3 py-1`}>
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={`w-full bg-transparent focus:outline-none text-sm ${textColor}`}
          />
        </div>

        <button className={`p-1 rounded ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
          <Star className="w-4 h-4" />
        </button>
      </div>

      {/* Tab bar */}
      <div className={`${toolbarBg} border-b ${borderColor} px-2 flex items-center`}>
        <div
          className={`px-3 py-1 text-sm rounded-t flex items-center ${activeTab === "home" ? (isDarkMode ? "bg-black-900" : "bg-white") : ""}`}
        >
          <span className="mr-2">Home</span>
          <button className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-gray-500">
            <span className="text-xs">×</span>
          </button>
        </div>
        <button className={`p-1 rounded ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {!wifiEnabled ? (
          <NoInternetView />
        ) : (
          activeTab === "home" && (
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">Links</h2>

              <div className="grid grid-cols-5 sm:grid-cols-7 gap-6 mb-12">
                {socialLinks.map((link, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center p-4 rounded-lg ${hoverBg} cursor-pointer`}
                    onClick={() => setUrl(link.url)}
                  >
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-2 overflow-hidden">
                      <img src={link.icon || "/placeholder.svg"} alt={link.title} className="w-8 h-8 object-contain" />
                    </div>
                    <span className="text-sm text-center">{link.title}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-6">Frequently Visited</h2>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 mb-12">
                {frequentlyVisited.map((site, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center p-4 rounded-lg ${hoverBg} cursor-pointer`}
                    onClick={() => setUrl(site.url)}
                  >
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-2 overflow-hidden">
                      <img src={site.icon || "/placeholder.svg"} alt={site.title} className="w-8 h-8 object-contain" />
                    </div>
                    <span className="text-sm text-center">{site.title}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 max-w-2xl mx-auto">
                <div className={`p-6 rounded-lg ${cardBg}`}>
                  <h3 className="text-xl font-semibold mb-4">Ethan Zhou - Portfolio</h3>
                  <p className="mb-4">
                    Welcome to my portfolio website! I'm a data science and software engineering enthusiast,
                    who enjoys diving into projects like this one in his free time. I blend analytics, engineering, 
                    and project management to build impactful solutions to complex problems. I'm always curious,
                     always learning, and always looking for new ways to create something meaningful.
                  </p>
                  <div className="flex justify-end">
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
