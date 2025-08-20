"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface TerminalProps {
  isDarkMode?: boolean
}

export default function Terminal({ isDarkMode = true}: TerminalProps) {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [showResume, setShowResume] = useState(false)
  const [isResumeLoading, setIsResumeLoading] = useState(true)
  const [showLinkedin, setShowLinkedin] = useState(false)
  const [isLinkedinLoading, setIsLinkedinLoading] = useState(true)
  const [showGithub, setShowGithub] = useState(false)
  const [isGithubLoading, setIsGithubLoading] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Terminal is always dark
  const bgColor = "bg-black"
  const textColor = "text-emerald-500"

  useEffect(() => {
    // Focus input when terminal is clicked
    const handleClick = () => {
      inputRef.current?.focus()
    }

    const terminal = terminalRef.current
    if (terminal) {
      terminal.addEventListener("click", handleClick)

      // Initial welcome message
      setHistory([
        "Last login: " + new Date().toLocaleString(),
        "Welcome to macOS Terminal",
        "Type 'help' to see available commands",
        "",
      ])
    }

    return () => {
      if (terminal) {
        terminal.removeEventListener("click", handleClick)
      }
    }
  }, [])

  useEffect(() => {
    // Scroll to bottom when history changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      executeCommand(input)
      setCommandHistory((prev) => [...prev, input])
      setHistoryIndex(-1)
      setInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      navigateHistory(-1)
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      navigateHistory(1)
    }
  }

  const navigateHistory = (direction: number) => {
    if (commandHistory.length === 0) return

    const newIndex = historyIndex + direction

    if (newIndex >= commandHistory.length) {
      setHistoryIndex(-1)
      setInput("")
    } else if (newIndex >= 0) {
      setHistoryIndex(newIndex)
      setInput(commandHistory[commandHistory.length - 1 - newIndex])
    }
  }

  const executeCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase()
    const args = command.split(" ")
    const mainCommand = args[0]

    // Add command to history
    setHistory((prev) => [...prev, `ethan@macbook-air ~ $ ${cmd}`, ""])

    // Process command
    switch (mainCommand) {
      case "help":
        setHistory((prev) => [
          ...prev,
          "Available commands:",
          "  help - Show this help message",
          "  clear - Clear the terminal",
          "  echo (text) - Print text",
          "  date - Show current date and time",
          "  about - About me",
          "  skills - My technical skills",
          "  email - My email address",
          "  resume - Opens my resume",
          "  linkedin - Opens my LinkedIn profile",
          "  github - Opens the Github link to this project",
          "",
        ])
        break

      case "about":
        setHistory((prev) => [
          ...prev,
          "┌─────────────────────────────────────┐",
          "│ Ethan Zhou                          │",
          "│ Data Science & CS                   │",
          "└─────────────────────────────────────┘",
          "",
          "I'm a data science and software engineering enthusiast",
          "who enjoys diving into projects like this in his free time.",
          "I blend analytics, engineering, and project management",
          "to build impactful solutions to complex problems",
          "I'm always curious, always learning, and always",
          "looking for new ways to create something meaningful.",
          "",
        ])
        break

        case "skills":
          setHistory((prev) => [
            ...prev,
            "┌──────────────┐",
            "│   Skills     │",
            "└──────────────┘",
            "",
            "Programming Languages:",
            "• Python",
            "• SQL",
            "• JavaScript / TypeScript",
            "• Java",
            "• HTML / CSS",
            "",
            "Frameworks & Technologies:",
            "• Node.js",
            "• React.js",
            "• Next.js",
            "• Tailwind CSS",
            "• SKLearn",
            "• Pytorch",
            "• Pandas",
            "• Dask",
            "• Spark",
            "• Flask",
            "• Django",
            "",
            "Industry Tools",
            "• Git / GitHub",
            "• Tableau",
            "• Power BI",
            "• LookerStudio",
            "• PostgreSQL",
            "• Microsoft Excel",
            "• Google Workspace",
            "",
          ])
          break
          
      case "clear":
        setHistory([""])
        break

      case "echo":
        const echoText = args.slice(1).join(" ")
        setHistory((prev) => [...prev, echoText, ""])
        break

      case "date":
        setHistory((prev) => [...prev, new Date().toString(), ""])
        break

      case "email":
        setHistory((prev) => [
          ...prev,
          "",
          "Email: xethanhzhou@gmail.com",
          "",
        ])
        break

      case "resume":
        setShowResume(true)
        setIsResumeLoading(true)
        setHistory((prev) => [
          ...prev,
          "Opening resume...",
          "",
        ])
        break

      case "linkedin":
        setShowLinkedin(true)
        setIsLinkedinLoading(true)
        setHistory((prev) => [
          ...prev,
          "Opening LinkedIn profile...",
          "",
        ])
        break

      case "github":
        setShowGithub(true)
        setIsGithubLoading(true)
        setHistory((prev) => [
          ...prev,
          "Opening GitHub link...",
          "",
        ])
        break

      default:
        setHistory((prev) => [
          ...prev,
          `Command not found: ${mainCommand}`,
          'Type "help" to see available commands',
          "",
        ])
    }
  }

  return (
    <>
      <div ref={terminalRef} className={`h-full ${bgColor} ${textColor} p-4 font-mono text-sm overflow-auto`}>
        {history.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}

        <div className="flex">
          <span className="mr-2">ethan@macbook-air ~ $</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-emerald-500"
            autoFocus
          />
        </div>
      </div>

      {/* Resume Modal */}
      {showResume && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white w-11/12 h-5/6 max-w-4xl rounded-lg overflow-hidden relative">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold">Resume - Ethan Zhou</h2>
              <button
                onClick={() => setShowResume(false)}
                className="text-gray-400 hover:text-white transition-colors text-xl font-bold"
              >
                ×
              </button>
            </div>
            
            {/* Loading indicator */}
            {isResumeLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-10">
                <div className="text-center">
                  <div className="text-xl font-semibold mb-2">Loading Resume...</div>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto"></div>
                </div>
              </div>
            )}
            
            {/* PDF iframe */}
            <iframe
              src="/EthanZhou_2025Fall_Resume.pdf"
              className="w-full h-full"
              onLoad={() => setIsResumeLoading(false)}
            />
          </div>
        </div>
      )}

      {/* LinkedIn Modal */}
      {showLinkedin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white w-11/12 h-5/6 max-w-4xl rounded-lg overflow-hidden relative">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold">LinkedIn - Ethan Zhou</h2>
              <button
                onClick={() => setShowLinkedin(false)}
                className="text-gray-400 hover:text-white transition-colors text-xl font-bold"
              >
                ×
              </button>
            </div>
            
            {/* Loading indicator */}
            {isLinkedinLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-10">
                <div className="text-center">
                  <div className="text-xl font-semibold mb-2">Loading LinkedIn...</div>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto"></div>
                </div>
              </div>
            )}
            
            {/* LinkedIn iframe */}
            <iframe
              src="https://www.linkedin.com/in/ethannhzhouu/"
              className="w-full h-full"
              onLoad={() => setIsLinkedinLoading(false)}
            />
          </div>
        </div>
      )}

      {/* GitHub Modal */}
      {showGithub && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white w-11/12 h-5/6 max-w-4xl rounded-lg overflow-hidden relative">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold">GitHub - Ethan Zhou</h2>
              <button
                onClick={() => setShowGithub(false)}
                className="text-gray-400 hover:text-white transition-colors text-xl font-bold"
              >
                ×
              </button>
            </div>
            
            {/* Loading indicator */}
            {isGithubLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-10">
                <div className="text-center">
                  <div className="text-xl font-semibold mb-2">Loading GitHub...</div>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto"></div>
                </div>
              </div>
            )}
            
            {/* GitHub iframe */}
            <iframe
              src="https://github.com/ethannhzhouu"
              className="w-full h-full"
              onLoad={() => setIsGithubLoading(false)}
            />
          </div>
        </div>
      )}
    </>
  )
}