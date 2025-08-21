"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Play, RotateCcw, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SnakeProps {
  isDarkMode?: boolean
}

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"
type Position = { x: number; y: number }

export default function Snake({ isDarkMode = true }: SnakeProps) {
  // Game configuration
  const BOARD_SIZE = 20
  const TILE_SIZE = 22
  const GAME_TICK_RATE = 120
  const STARTING_SNAKE = [
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
  ]

  // Game state variables
  const [snakeBody, setSnakeBody] = useState<Position[]>(STARTING_SNAKE)
  const [apple, setApple] = useState<Position>({ x: 5, y: 5 })
  const [movement, setMovement] = useState<Direction>("UP")
  const [isGameEnded, setIsGameEnded] = useState(false)
  const [isGamePaused, setIsGamePaused] = useState(true)
  const [currentScore, setCurrentScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const gameCanvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | null>(null)

  // Color scheme - switched to gray
  const darkGreenTile = "#737373"
  const lightGreenTile = "#737373"
  const gameAreaBg = isDarkMode ? "#262626" : "#f8f9fa"
  const uiTextColor = isDarkMode ? "#ffffff" : "#1f2937"

  // Create new apple position
  const spawnNewApple = useCallback((): Position => {
    let newApplePos: Position
    do {
      newApplePos = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      }
    } while (snakeBody.some((part) => part.x === newApplePos.x && part.y === newApplePos.y))
    
    return newApplePos
  }, [snakeBody, BOARD_SIZE])

  // Render the game board and elements
  const renderGameBoard = useCallback(() => {
    const canvas = gameCanvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    // Clear the canvas
    context.fillStyle = gameAreaBg
    context.fillRect(0, 0, canvas.width, canvas.height)

    // Draw chessboard pattern with green tiles
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const isEvenSquare = (row + col) % 2 === 0
        context.fillStyle = isEvenSquare ? darkGreenTile : lightGreenTile
        context.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE)
      }
    }

    // Draw snake with distinct segments
    snakeBody.forEach((segment, index) => {
      const isHead = index === 0
      const x = segment.x * TILE_SIZE
      const y = segment.y * TILE_SIZE
      
      if (isHead) {
        // Snake head - pixelated yellow-green design like the image
        context.fillStyle = "#9ACD32" // Yellow-green color
        context.fillRect(x + 1, y + 1, TILE_SIZE - 2, TILE_SIZE - 2)
        
        // Create pixelated head shape (like the uploaded image)
        context.fillStyle = "#9ACD32"
        context.fillRect(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4)
        
        // Eyes - black rectangular pixels
        context.fillStyle = "#000000"
        const eyeSize = 4
        const eyeOffset = 5
        context.fillRect(x + eyeOffset, y + eyeOffset, eyeSize, eyeSize)
        context.fillRect(x + TILE_SIZE - eyeOffset - eyeSize, y + eyeOffset, eyeSize, eyeSize)
        
        // Add some white around eyes for contrast (like in the image)
        context.fillStyle = "#FFFFFF"
        context.fillRect(x + eyeOffset - 1, y + eyeOffset - 1, eyeSize + 2, eyeSize + 2)
        context.fillRect(x + TILE_SIZE - eyeOffset - eyeSize - 1, y + eyeOffset - 1, eyeSize + 2, eyeSize + 2)
        
        // Draw black eyes on top of white
        context.fillStyle = "#000000"
        context.fillRect(x + eyeOffset, y + eyeOffset, eyeSize, eyeSize)
        context.fillRect(x + TILE_SIZE - eyeOffset - eyeSize, y + eyeOffset, eyeSize, eyeSize)
        
        // Add red tongue sticking out
        context.fillStyle = "#DC2626" // Red color for tongue
        const tongueWidth = 3
        const tongueHeight = 6
        const tongueX = x + TILE_SIZE/2 - tongueWidth/2
        const tongueY = y + TILE_SIZE - 2
        
        // Draw tongue extending below the head
        context.fillRect(tongueX, tongueY, tongueWidth, tongueHeight)
        
        // Add forked tongue tip
        context.fillRect(tongueX - 1, tongueY + tongueHeight, 2, 2)
        context.fillRect(tongueX + tongueWidth - 1, tongueY + tongueHeight, 2, 2)
        
      } else {
        // Snake body - yellow-green squares matching the head color
        context.fillStyle = "#9ACD32"
        context.fillRect(x + 1, y + 1, TILE_SIZE - 2, TILE_SIZE - 2)
        context.strokeStyle = "#7CB342" // Slightly darker green for border
        context.lineWidth = 1
        context.strokeRect(x + 1, y + 1, TILE_SIZE - 2, TILE_SIZE - 2)
      }
    })

    // Draw apple as red diamond with highlight
    const appleX = apple.x * TILE_SIZE + TILE_SIZE/2
    const appleY = apple.y * TILE_SIZE + TILE_SIZE/2
    const appleSize = TILE_SIZE/2 - 2
    
    context.fillStyle = "#dc2626"
    context.beginPath()
    context.moveTo(appleX, appleY - appleSize)
    context.lineTo(appleX + appleSize, appleY)
    context.lineTo(appleX, appleY + appleSize)
    context.lineTo(appleX - appleSize, appleY)
    context.closePath()
    context.fill()
    
    // Apple highlight
    context.fillStyle = "#f87171"
    context.beginPath()
    context.arc(appleX - 3, appleY - 3, 3, 0, 2 * Math.PI)
    context.fill()

    // Score display with retro font
    context.fillStyle = uiTextColor
    context.font = "bold 18px 'Courier New', monospace"
    context.textAlign = "left"
    context.fillText(`SCORE: ${currentScore.toString().padStart(4, '0')}`, 12, canvas.height - 12)
    context.textAlign = "right"
    context.fillText(`HIGH: ${bestScore.toString().padStart(4, '0')}`, canvas.width - 12, canvas.height - 12)

    // Game over overlay
    if (isGameEnded) {
      context.fillStyle = "rgba(0, 0, 0, 0.8)"
      context.fillRect(0, 0, canvas.width, canvas.height)
      
      context.fillStyle = "#fbbf24"
      context.font = "bold 28px 'Courier New', monospace"
      context.textAlign = "center"
      context.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 30)
      
      context.fillStyle = "#ffffff"
      context.font = "bold 20px 'Courier New', monospace"
      context.fillText(`FINAL SCORE: ${currentScore}`, canvas.width / 2, canvas.height / 2 + 5)
      
      context.font = "16px 'Courier New', monospace"
      context.fillText("PRESS RESTART TO CONTINUE", canvas.width / 2, canvas.height / 2 + 35)
    }
  }, [
    snakeBody,
    apple,
    isGameEnded,
    currentScore,
    bestScore,
    gameAreaBg,
    uiTextColor,
    TILE_SIZE,
    BOARD_SIZE,
    darkGreenTile,
    lightGreenTile,
  ])

  // Main game update logic
  const updateGame = useCallback(() => {
    if (isGamePaused || isGameEnded) return

    const currentHead = { ...snakeBody[0] }
    
    // Move head based on current direction
    switch (movement) {
      case "UP":
        currentHead.y -= 1
        break
      case "DOWN":
        currentHead.y += 1
        break
      case "LEFT":
        currentHead.x -= 1
        break
      case "RIGHT":
        currentHead.x += 1
        break
    }

    // Check boundary collisions
    if (currentHead.x < 0 || currentHead.x >= BOARD_SIZE || currentHead.y < 0 || currentHead.y >= BOARD_SIZE) {
      setIsGameEnded(true)
      return
    }

    // Check self collision
    if (snakeBody.some((part) => part.x === currentHead.x && part.y === currentHead.y)) {
      setIsGameEnded(true)
      return
    }

    // Build new snake body
    const updatedSnake = [currentHead, ...snakeBody]
    
    // Check apple consumption
    if (currentHead.x === apple.x && currentHead.y === apple.y) {
      setApple(spawnNewApple())
      setCurrentScore((prev) => {
        const newScore = prev + 10
        setBestScore((prevBest) => Math.max(prevBest, newScore))
        return newScore
      })
    } else {
      updatedSnake.pop()
    }

    setSnakeBody(updatedSnake)
  }, [movement, apple, isGameEnded, spawnNewApple, isGamePaused, snakeBody, BOARD_SIZE])

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isGameEnded) return

      switch (event.key) {
        case "ArrowUp":
          if (movement !== "DOWN") setMovement("UP")
          break
        case "ArrowDown":
          if (movement !== "UP") setMovement("DOWN")
          break
        case "ArrowLeft":
          if (movement !== "RIGHT") setMovement("LEFT")
          break
        case "ArrowRight":
          if (movement !== "LEFT") setMovement("RIGHT")
          break
        case " ":
          event.preventDefault()
          setIsGamePaused((prev) => !prev)
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [movement, isGameEnded])

  // Game loop management
  useEffect(() => {
    if (!isGamePaused && !isGameEnded) {
      animationFrameRef.current = window.setInterval(updateGame, GAME_TICK_RATE)
    } else if (animationFrameRef.current) {
      clearInterval(animationFrameRef.current)
      animationFrameRef.current = null
    }

    return () => {
      if (animationFrameRef.current) {
        clearInterval(animationFrameRef.current)
      }
    }
  }, [isGamePaused, isGameEnded, updateGame, GAME_TICK_RATE])

  // Rendering trigger
  useEffect(() => {
    renderGameBoard()
  }, [snakeBody, apple, isGameEnded, currentScore, renderGameBoard])

  // Load saved high score
  useEffect(() => {
    const savedBest = localStorage.getItem("snakeGameHighScore")
    if (savedBest) {
      setBestScore(Number.parseInt(savedBest, 10))
    }
  }, [])

  // Save high score
  useEffect(() => {
    localStorage.setItem("snakeGameHighScore", bestScore.toString())
  }, [bestScore])

  // Game reset function
  const restartGame = () => {
    setSnakeBody(STARTING_SNAKE)
    setApple(spawnNewApple())
    setMovement("UP")
    setIsGameEnded(false)
    setCurrentScore(0)
    setIsGamePaused(true)
  }

return (
  <div className={`h-full flex flex-col ${isDarkMode ? "bg-neutral-800 text-white" : "bg-white text-gray-800"} p-4`} 
       style={{ fontFamily: "'Courier New', monospace" }}>
    
    {/* Header */}
    <div className="flex justify-center items-center mb-4">
      <h1 className="text-xl font-bold tracking-wider">SNAKE ARCADE</h1>
    </div>

    {/* Game canvas */}
    <div className="flex-1 flex justify-center items-center min-h-0">
      <canvas
        ref={gameCanvasRef}
        width={BOARD_SIZE * TILE_SIZE}
        height={BOARD_SIZE * TILE_SIZE}
        className={`border-2 rounded shadow-lg ${isDarkMode ? "border-neutral-600" : "border-gray-600"}`}
      />
    </div>

    {/* Controls */}
    <div className="flex justify-center gap-2 mt-1">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsGamePaused(!isGamePaused)}
        disabled={isGameEnded}
        className={`font-mono text-xs ${isDarkMode ? "border-neutral-600" : ""}`}
      >
        {isGamePaused ? <Play className="w-3 h-3 mr-1" /> : <Pause className="w-3 h-3 mr-1" />}
        {isGamePaused ? "PLAY" : "PAUSE"}
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={restartGame} 
        className={`font-mono text-xs ${isDarkMode ? "border-neutral-600" : ""}`}
      >
        <RotateCcw className="w-3 h-3 mr-1" />
        RESTART
      </Button>
    </div>

    {/* Instructions */}
    <div className="mt-16 text-center">
      <p className="text-xs font-mono tracking-wide">
        ARROW KEYS TO MOVE • SPACEBAR TO PAUSE/RESUME
      </p>
    </div>
  </div>
)
}