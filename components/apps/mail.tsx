"use client"

import { useEffect, useRef } from "react"
import { Mail } from "lucide-react"

interface MailProps {
  isDarkMode?: boolean
}

export default function MailApp({ isDarkMode = true }: MailProps) {
  const textColor = isDarkMode ? "text-white" : "text-gray-800"
  const bgColor = isDarkMode ? "bg-neutral-800" : "bg-white"
  const hasOpenedRef = useRef(false)

  // Redirect to GitHub profile
  useEffect(() => {
    // Only open once
    if (!hasOpenedRef.current) {
      hasOpenedRef.current = true

      // Open GitHub profile in new tab
      window.open("https://gmail.com", "_blank")
    }
  }, [])

  return (
    <div className={`h-full ${bgColor} ${textColor} p-6 flex items-center justify-center`}>
      <div className="text-center">
        <Mail className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Opening Mail...</h2>
        <p>Redirecting to your default mail application</p>
      </div>
    </div>
  )
}
