"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ArrowRight, RefreshCw, Home, Star, Plus, Search, Wifi } from "lucide-react"

interface SafariProps {
  isDarkMode?: boolean
}

export default function Safari({ isDarkMode = true }: SafariProps) {
  const [wifiEnabled, setWifiEnabled] = useState(true)

  useEffect(() => {
    const checkWifiStatus = () => {
      const status = localStorage.getItem("wifiEnabled")
      setWifiEnabled(status === null ? true : status === "true")
    }
    checkWifiStatus()
    const interval = setInterval(checkWifiStatus, 1000)
    return () => clearInterval(interval)
  }, [])

  const textColor = isDarkMode ? "text-white" : "text-gray-800"
  const bgColor = isDarkMode ? "bg-neutral-900" : "bg-white"
  const toolbarBg = isDarkMode ? "bg-neutral-900" : "bg-gray-100"
  const inputBg = isDarkMode ? "bg-neutral-900" : "bg-gray-200"
  const borderColor = isDarkMode ? "border-neutral-700" : "border-gray-200"
  const cardBg = isDarkMode ? "bg-neutral-800" : "bg-gray-100"

  const NoInternetView = () => (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className={`w-24 h-24 mb-6 flex items-center justify-center rounded-full ${isDarkMode ? "bg-gray-800" : "bg-gray-200"}`}>
        <Wifi className={`w-12 h-12 ${isDarkMode ? "text-gray-600" : "text-gray-500"}`} />
      </div>
      <h2 className={`text-xl font-semibold mb-2 ${textColor}`}>You Are Not Connected to the Internet</h2>
      <p className={`text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"} mb-6`}>
        This page can't be displayed because your computer is currently offline.
      </p>
    </div>
  )

  return (
    <div className={`h-full flex flex-col ${bgColor} ${textColor}`}>
      <div className={`${toolbarBg} border-b ${borderColor} p-2 flex items-center space-x-2`}>
        <button className={`p-1 rounded ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button className={`p-1 rounded ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
          <ArrowRight className="w-4 h-4" />
        </button>
        <button className={`p-1 rounded ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
          <RefreshCw className="w-4 h-4" />
        </button>
        <button className={`p-1 rounded ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
          <Home className="w-4 h-4" />
        </button>

        <div className={`flex-1 flex items-center ${inputBg} rounded px-3 py-1`}>
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input
            type="text"
            value="https://ethannhzhouu.github.io"
            readOnly
            className={`w-full bg-transparent focus:outline-none text-sm ${textColor}`}
          />
        </div>

        <button className={`p-1 rounded ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
          <Star className="w-4 h-4" />
        </button>
      </div>

      <div className={`${toolbarBg} border-b ${borderColor} px-2 flex items-center`}>
        <div className={`px-3 py-1 text-sm rounded-t flex items-center ${isDarkMode ? "bg-black-900" : "bg-white"}`}>
          <span className="mr-2">Home</span>
          <button className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-gray-500">
            <span className="text-xs">×</span>
          </button>
        </div>
        <button className={`p-1 rounded ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        {!wifiEnabled ? (
          <NoInternetView />
        ) : (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Skills</h2>
            <div className={`p-6 rounded-lg ${cardBg} mb-8`}>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-2">Languages</h3>
                  <p>Python, JavaScript, TypeScript, Java, SQL, HTML/CSS</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Technologies</h3>
                  <p>React, Node.js, Spring Boot, AWS, Git</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6">Experience</h2>
            <div className="grid grid-cols-1 gap-8 mb-8">
              {/* Amazon */}
              <div className={`flex items-start p-6 rounded-lg ${cardBg}`}>
                <div className="w-24 h-24 bg-white rounded-lg flex-shrink-0 mr-6 overflow-hidden">
                  <img src="/amazon.png" alt="Amazon" className="w-full h-full object-contain p-2" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Software Development Engineer Intern</h3>
                  <p className="text-gray-500 mb-2">Amazon • Summer 2024</p>
                  <p className="mb-2">Incoming SDE intern for Summer 2024 at Amazon Web Services (AWS)</p>
                </div>
              </div>

              {/* Capital One */}
              <div className={`flex items-start p-6 rounded-lg ${cardBg}`}>
                <div className="w-24 h-24 bg-white rounded-lg flex-shrink-0 mr-6 overflow-hidden">
                  <img src="/capitalone.png" alt="Capital One" className="w-full h-full object-contain p-2" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Software Engineering Intern</h3>
                  <p className="text-gray-500 mb-2">Capital One • Summer 2023</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Developed and deployed microservices using Spring Boot and AWS</li>
                    <li>Implemented CI/CD pipelines and automated testing</li>
                  </ul>
                </div>
              </div>

              {/* Coda */}
              <div className={`flex items-start p-6 rounded-lg ${cardBg}`}>
                <div className="w-24 h-24 bg-white rounded-lg flex-shrink-0 mr-6 overflow-hidden">
                  <img src="/coda.png" alt="Coda" className="w-full h-full object-contain p-2" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Software Engineering Intern</h3>
                  <p className="text-gray-500 mb-2">Coda • Summer 2023</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Built full-stack features using React, TypeScript and Python</li>
                    <li>Improved document loading performance by 30%</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6">Projects</h2>
            <div className="grid grid-cols-1 gap-8 mb-8">
              {/* macOS Portfolio */}
              <div className={`flex items-start p-6 rounded-lg ${cardBg}`}>
                <div className="w-24 h-24 bg-white rounded-lg flex-shrink-0 mr-6 overflow-hidden">
                  <img src="/macos.png" alt="macOS Portfolio" className="w-full h-full object-contain p-2" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">macOS Portfolio</h3>
                  <p className="text-gray-500 mb-2">Personal Project • 2023</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Built a macOS-inspired portfolio using Next.js, TypeScript, and Tailwind CSS</li>
                    <li>Implemented system-level features like dark mode, WiFi toggle, and window management</li>
                    <li>Created interactive applications including Weather, Music Player, and Games</li>
                  </ul>
                </div>
              </div>

              {/* Add more projects as needed */}
                            <div className={`flex items-start p-6 rounded-lg ${cardBg}`}>
                <div className="w-24 h-24 bg-white rounded-lg flex-shrink-0 mr-6 overflow-hidden">
                  <img src="/macos.png" alt="macOS Portfolio" className="w-full h-full object-contain p-2" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">macOS Portfolio</h3>
                  <p className="text-gray-500 mb-2">Personal Project • 2023</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Built a macOS-inspired portfolio using Next.js, TypeScript, and Tailwind CSS</li>
                    <li>Implemented system-level features like dark mode, WiFi toggle, and window management</li>
                    <li>Created interactive applications including Weather, Music Player, and Games</li>
                  </ul>
                </div>
              </div>
              {/* Add more projects as needed */}
            <div className={`flex items-start p-6 rounded-lg ${cardBg}`}>
                <div className="w-24 h-24 bg-white rounded-lg flex-shrink-0 mr-6 overflow-hidden">
                  <img src="/macos.png" alt="macOS Portfolio" className="w-full h-full object-contain p-2" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">macOS Portfolio</h3>
                  <p className="text-gray-500 mb-2">Personal Project • 2023</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Built a macOS-inspired portfolio using Next.js, TypeScript, and Tailwind CSS</li>
                    <li>Implemented system-level features like dark mode, WiFi toggle, and window management</li>
                    <li>Created interactive applications including Weather, Music Player, and Games</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-6">Education</h2>
            <div className={`flex items-start p-6 rounded-lg ${cardBg}`}>
              <div className="w-24 h-24 bg-white rounded-lg flex-shrink-0 mr-6 overflow-hidden">
                <img src="/berkeley.png" alt="UC Berkeley" className="w-full h-full object-contain p-2" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">University of California, Berkeley</h3>
                <p className="text-gray-500 mb-2">B.A. in Data Science • 2021-2025</p>
                <p>Relevant Coursework: Data Structures, Algorithms, Machine Learning</p>
              </div>
            </div>
          
          </div>
        )}
      </div>
    </div>
  )
}