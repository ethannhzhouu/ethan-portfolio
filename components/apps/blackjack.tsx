"use client"

import { useState, useEffect, useCallback } from "react"
import { Play, RotateCcw, DollarSign, Shuffle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BlackjackProps {
  isDarkMode?: boolean
}

type Suit = "♠" | "♥" | "♦" | "♣"
type Rank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K"

interface Card {
  suit: Suit
  rank: Rank
  value: number
  isAce: boolean
}

type GameState = "betting" | "playing" | "dealer" | "finished"

export default function Blackjack({ isDarkMode = true }: BlackjackProps) {
  // Game state
  const [gameState, setGameState] = useState<GameState>("betting")
  const [playerCards, setPlayerCards] = useState<Card[]>([])
  const [dealerCards, setDealerCards] = useState<Card[]>([])
  const [deck, setDeck] = useState<Card[]>([])
  const [playerTotal, setPlayerTotal] = useState(0)
  const [dealerTotal, setDealerTotal] = useState(0)
  const [money, setMoney] = useState(1000)
  const [currentBet, setCurrentBet] = useState(0)
  const [message, setMessage] = useState("Place your bet to start!")
  const [canHit, setCanHit] = useState(false)
  const [canStand, setCanStand] = useState(false)
  const [canDoubleDown, setCanDoubleDown] = useState(false)
  const [showDealerHole, setShowDealerHole] = useState(false)

  // Color scheme
  const bgColor = isDarkMode ? "#0a0a0a" : "#f8fafc"
  const cardBg = isDarkMode ? "#262626" : "#ffffff"
  const textColor = isDarkMode ? "#f1f5f9" : "#1e293b"
  const tableColor = isDarkMode ? "#166534" : "#16a34a"

  // Create a standard 52-card deck
  const createDeck = useCallback((): Card[] => {
    const suits: Suit[] = ["♠", "♥", "♦", "♣"]
    const ranks: Rank[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
    const newDeck: Card[] = []

    suits.forEach(suit => {
      ranks.forEach(rank => {
        let value = 0
        let isAce = false

        if (rank === "A") {
          value = 11
          isAce = true
        } else if (["J", "Q", "K"].includes(rank)) {
          value = 10
        } else {
          value = parseInt(rank)
        }

        newDeck.push({ suit, rank, value, isAce })
      })
    })

    // Shuffle the deck
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]]
    }

    return newDeck
  }, [])

  // Calculate hand total with ace handling
  const calculateTotal = useCallback((cards: Card[]): number => {
    let total = 0
    let aces = 0

    cards.forEach(card => {
      if (card.isAce) {
        aces++
        total += 11
      } else {
        total += card.value
      }
    })

    // Adjust for aces
    while (total > 21 && aces > 0) {
      total -= 10
      aces--
    }

    return total
  }, [])

  // Initialize game
  useEffect(() => {
    const newDeck = createDeck()
    setDeck(newDeck)
  }, [createDeck])

  // Update totals when cards change
  useEffect(() => {
    setPlayerTotal(calculateTotal(playerCards))
  }, [playerCards, calculateTotal])

  useEffect(() => {
    setDealerTotal(calculateTotal(dealerCards))
  }, [dealerCards, calculateTotal])

  // Place bet
  const placeBet = (amount: number) => {
    if (amount <= money && amount > 0) {
      setCurrentBet(amount)
      setMoney(money - amount)
      dealInitialCards()
    }
  }

  // Deal initial cards
  const dealInitialCards = () => {
    const newDeck = [...deck]
    const playerHand = [newDeck.pop()!, newDeck.pop()!]
    const dealerHand = [newDeck.pop()!, newDeck.pop()!]

    setPlayerCards(playerHand)
    setDealerCards(dealerHand)
    setDeck(newDeck)
    setGameState("playing")
    setCanHit(true)
    setCanStand(true)
    setCanDoubleDown(playerHand.length === 2 && money >= currentBet)
    setShowDealerHole(false)
    setMessage("Hit or Stand?")

    // Check for blackjack
    const playerBJ = calculateTotal(playerHand) === 21
    const dealerBJ = calculateTotal(dealerHand) === 21

    if (playerBJ || dealerBJ) {
      setTimeout(() => {
        setShowDealerHole(true)
        if (playerBJ && dealerBJ) {
          setMessage("Both have Blackjack! Push!")
          setMoney(prev => prev + currentBet)
        } else if (playerBJ) {
          setMessage("Blackjack! You win!")
          setMoney(prev => prev + Math.floor(currentBet * 2.5))
        } else {
          setMessage("Dealer has Blackjack!")
        }
        setGameState("finished")
        setCanHit(false)
        setCanStand(false)
        setCanDoubleDown(false)
      }, 1000)
    }
  }

  // Hit - take another card
  const hit = () => {
    if (deck.length === 0) return

    const newDeck = [...deck]
    const newCard = newDeck.pop()!
    const newPlayerCards = [...playerCards, newCard]
    
    setPlayerCards(newPlayerCards)
    setDeck(newDeck)
    setCanDoubleDown(false)

    const total = calculateTotal(newPlayerCards)
    if (total > 21) {
      setMessage("Bust! Dealer wins!")
      setGameState("finished")
      setCanHit(false)
      setCanStand(false)
    } else if (total === 21) {
      stand()
    }
  }

  // Stand - end player turn
  const stand = () => {
    setCanHit(false)
    setCanStand(false)
    setCanDoubleDown(false)
    setShowDealerHole(true)
    setGameState("dealer")
    setMessage("Dealer's turn...")

    setTimeout(() => {
      dealerPlay()
    }, 1000)
  }

  // Double down
  const doubleDown = () => {
    if (money >= currentBet) {
      setMoney(money - currentBet)
      setCurrentBet(currentBet * 2)
      hit()
      setTimeout(() => {
        if (calculateTotal([...playerCards, deck[deck.length - 1]]) <= 21) {
          stand()
        }
      }, 500)
    }
  }

  // Dealer AI
  const dealerPlay = () => {
    let currentDealerCards = [...dealerCards]
    let currentDeck = [...deck]

    const dealerPlayStep = () => {
      const dealerTotal = calculateTotal(currentDealerCards)
      
      if (dealerTotal < 17 || (dealerTotal === 17 && currentDealerCards.some(c => c.isAce))) {
        if (currentDeck.length > 0) {
          const newCard = currentDeck.pop()!
          currentDealerCards.push(newCard)
          setDealerCards([...currentDealerCards])
          setDeck([...currentDeck])
          
          setTimeout(dealerPlayStep, 1000)
        }
      } else {
        finishGame(calculateTotal(playerCards), calculateTotal(currentDealerCards))
      }
    }

    dealerPlayStep()
  }

  // Finish game and determine winner
  const finishGame = (playerFinal: number, dealerFinal: number) => {
    setGameState("finished")

    if (playerFinal > 21) {
      setMessage("Player busts! Dealer wins!")
    } else if (dealerFinal > 21) {
      setMessage("Dealer busts! You win!")
      setMoney(prev => prev + currentBet * 2)
    } else if (playerFinal > dealerFinal) {
      setMessage("You win!")
      setMoney(prev => prev + currentBet * 2)
    } else if (dealerFinal > playerFinal) {
      setMessage("Dealer wins!")
    } else {
      setMessage("Push! It's a tie!")
      setMoney(prev => prev + currentBet)
    }
  }

  // New game
  const newGame = () => {
    if (money <= 0) {
      setMoney(1000)
      setMessage("Bankroll reset to $1000!")
    }
    
    setPlayerCards([])
    setDealerCards([])
    setCurrentBet(0)
    setGameState("betting")
    setCanHit(false)
    setCanStand(false)
    setCanDoubleDown(false)
    setShowDealerHole(false)
    setMessage("Place your bet to start!")
    
    // Reshuffle if deck is low
    if (deck.length < 20) {
      setDeck(createDeck())
    }
  }

  // Render card
const renderCard = (card: Card, isHidden: boolean = false) => {
  const isRed = card.suit === "♥" || card.suit === "♦"
  
  return (
    <div 
      key={`${card.suit}-${card.rank}`}
      className={`w-16 h-24 rounded-lg shadow-lg flex flex-col justify-between p-2 m-1 font-mono text-sm font-bold`}
      style={{ 
        backgroundColor: isHidden ? "#404040" : cardBg,
        color: isHidden ? "#4a5568" : (isRed ? "#dc2626" : textColor),
        border: `2px solid ${isDarkMode ? "#404040" : "#d1d5db"}`
      }}
    >
      {isHidden ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">?</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex justify-start pl-1">
            <span>{card.rank}</span>
          </div>
          <div className="flex-grow flex items-center justify-center">
            <span className="text-2xl">{card.suit}</span>
          </div>
        </div>
      )}
    </div>
  )
}

  return (
    <div 
      className="h-full flex flex-col p-4 font-mono"
      style={{ 
        backgroundColor: bgColor, 
        color: textColor,
        backgroundImage: `radial-gradient(circle at 50% 50%, ${tableColor}22 0%, ${tableColor}11 50%, transparent 100%)`
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold tracking-wider">BLACKJACK</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            <span className="font-bold text-green-400">${money}</span>
          </div>
          {currentBet > 0 && (
            <div className="text-sm">
              Bet: <span className="text-yellow-400">${currentBet}</span>
            </div>
          )}
        </div>
      </div>

      {/* Game message */}
      <div className="text-center mb-4">
        <p className="text-lg font-semibold">{message}</p>
      </div>

      {/* Dealer section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold">Dealer</span>
          <span className="text-sm">
            ({gameState === "betting" || (!showDealerHole && dealerCards.length > 0) ? 
              `${dealerCards[0]?.value || 0} + ?` : 
              dealerTotal})
          </span>
        </div>
        <div className="flex flex-wrap">
          {dealerCards.map((card, index) => 
            renderCard(card, index === 1 && !showDealerHole)
          )}
        </div>
      </div>

      {/* Player section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold">Player</span>
          <span className="text-sm">({playerTotal})</span>
          {playerTotal === 21 && playerCards.length === 2 && (
            <span className="text-yellow-400 font-bold">BLACKJACK!</span>
          )}
        </div>
        <div className="flex flex-wrap">
          {playerCards.map((card) => renderCard(card))}
        </div>
      </div>

{/* Betting buttons */}
{gameState === "betting" && (
  <div className="mb-4">
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 max-w-md mx-auto">
      {[25, 100, 250, 500].map(amount => (
        <Button
          key={amount}
          variant="outline"
          onClick={() => placeBet(amount)}
          disabled={money < amount}
          className="font-mono"
        >
          ${amount}
        </Button>
      ))}
      <Button
        variant="outline"
        onClick={() => placeBet(money)} // Bet all remaining money
        disabled={money <= 0}
        className="font-mono bg-red-500 hover:bg-red-600 text-white"
      >
        All-In
      </Button>
    </div>
  </div>
)}

      {/* Game action buttons */}
      {gameState === "playing" && (
        <div className="flex gap-2 justify-center mb-4">
          <Button
            variant="outline"
            onClick={hit}
            disabled={!canHit}
            className="font-mono"
          >
            Hit
          </Button>
          <Button
            variant="outline"
            onClick={stand}
            disabled={!canStand}
            className="font-mono"
          >
            Stand
          </Button>
          {canDoubleDown && (
            <Button
              variant="outline"
              onClick={doubleDown}
              className="font-mono"
            >
              Double Down
            </Button>
          )}
        </div>
      )}

      {/* New game button */}
      {gameState === "finished" && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={newGame}
            className="font-mono"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            New Game
          </Button>
        </div>
      )}

      {/* Rules */}
      <div className="mt-auto text-xs text-center opacity-75">
        <p>Get as close to 21 as possible without going over!</p>
        <p>Dealer hits on soft 17 • Blackjack pays 3:2</p>
      </div>
    </div>
  )
}