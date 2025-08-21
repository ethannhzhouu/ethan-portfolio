"use client"

import { useState, useEffect, useCallback } from "react"
import { Shuffle, Trophy, Coins, Zap, Star, Heart } from "lucide-react"

type Suit = "♠" | "♥" | "♦" | "♣"
type Rank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K"

interface Card {
  suit: Suit
  rank: Rank
  value: number
  isAce: boolean
  id: string
}

type GameState = "betting" | "playing" | "dealer" | "finished"

export default function Blackjack() {
  const [gameState, setGameState] = useState<GameState>("betting")
  const [playerCards, setPlayerCards] = useState<Card[]>([])
  const [dealerCards, setDealerCards] = useState<Card[]>([])
  const [deck, setDeck] = useState<Card[]>([])
  const [playerTotal, setPlayerTotal] = useState(0)
  const [dealerTotal, setDealerTotal] = useState(0)
  const [money, setMoney] = useState(1000)
  const [currentBet, setCurrentBet] = useState(0)
  const [message, setMessage] = useState("Place your bet")
  const [canHit, setCanHit] = useState(false)
  const [canStand, setCanStand] = useState(false)
  const [canDoubleDown, setCanDoubleDown] = useState(false)
  const [showDealerHole, setShowDealerHole] = useState(false)
  const [dealingAnimation, setDealingAnimation] = useState(false)
  const [moneyAnimation, setMoneyAnimation] = useState("")
  const [cardAnimations, setCardAnimations] = useState<{ [key: string]: boolean }>({})

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

        newDeck.push({ 
          suit, 
          rank, 
          value, 
          isAce, 
          id: `${suit}-${rank}-${Math.random()}` 
        })
      })
    })

    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]]
    }

    return newDeck
  }, [])

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

    while (total > 21 && aces > 0) {
      total -= 10
      aces--
    }

    return total
  }, [])

  useEffect(() => {
    const newDeck = createDeck()
    setDeck(newDeck)
  }, [createDeck])

  useEffect(() => {
    setPlayerTotal(calculateTotal(playerCards))
  }, [playerCards, calculateTotal])

  useEffect(() => {
    setDealerTotal(calculateTotal(dealerCards))
  }, [dealerCards, calculateTotal])

  const animateCard = (cardId: string) => {
    setCardAnimations(prev => ({ ...prev, [cardId]: true }))
    setTimeout(() => {
      setCardAnimations(prev => ({ ...prev, [cardId]: false }))
    }, 600)
  }

  const animateMoney = (type: "win" | "lose" | "bet") => {
    setMoneyAnimation(type)
    setTimeout(() => setMoneyAnimation(""), 1500)
  }

  const placeBet = (amount: number) => {
    if (amount <= money && amount > 0) {
      setCurrentBet(amount)
      setMoney(money - amount)
      animateMoney("bet")
      dealInitialCards()
    }
  }

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

  playerHand.forEach(card => animateCard(card.id))
  dealerHand.forEach(card => animateCard(card.id))

  const playerBJ = calculateTotal(playerHand) === 21
  const dealerBJ = calculateTotal(dealerHand) === 21

  if (playerBJ || dealerBJ) {
    setTimeout(() => {
      setShowDealerHole(true)
      if (playerBJ && dealerBJ) {
        setMessage("🤝 Both have Blackjack! It's a push!")
        setMoney(prev => prev + currentBet)
      } else if (playerBJ) {
        setMessage("🎊 BLACKJACK!")
        setMoney(prev => prev + Math.floor(currentBet * 2.5))
        animateMoney("win")
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

  const hit = () => {
    if (deck.length === 0) return

    const newDeck = [...deck]
    const newCard = newDeck.pop()!
    const newPlayerCards = [...playerCards, newCard]
    
    setPlayerCards(newPlayerCards)
    setDeck(newDeck)
    setCanDoubleDown(false)
    animateCard(newCard.id)

    const total = calculateTotal(newPlayerCards)
    if (total > 21) {
      setMessage("BUST!")
      setGameState("finished")
      setCanHit(false)
      setCanStand(false)
      animateMoney("lose")
    } else if (total === 21) {
      stand()
    }
  }

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

  const doubleDown = () => {
    if (money >= currentBet) {
      setMoney(money - currentBet)
      setCurrentBet(currentBet * 2)
      animateMoney("bet")
      hit()
      setTimeout(() => {
        if (calculateTotal([...playerCards, deck[deck.length - 1]]) <= 21) {
          stand()
        }
      }, 500)
    }
  }

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
          animateCard(newCard.id)
          
          setTimeout(dealerPlayStep, 1000)
        }
      } else {
        finishGame(calculateTotal(playerCards), calculateTotal(currentDealerCards))
      }
    }

    dealerPlayStep()
  }

  const finishGame = (playerFinal: number, dealerFinal: number) => {
    setGameState("finished")

    if (playerFinal > 21) {
      setMessage(" You busted!")
      animateMoney("lose")
    } else if (dealerFinal > 21) {
      setMessage(" Dealer busts!")
      setMoney(prev => prev + currentBet * 2)
      animateMoney("win")
    } else if (playerFinal > dealerFinal) {
      setMessage("You win!")
      setMoney(prev => prev + currentBet * 2)
      animateMoney("win")
    } else if (dealerFinal > playerFinal) {
      setMessage("Dealer wins!")
      animateMoney("lose")
    } else {
      setMessage("It's a push!")
      setMoney(prev => prev + currentBet)
    }
  }

  const newGame = () => {
    if (money <= 0) {
      setMoney(1000)
      setMessage("💰 New bank")
    }
    
    setPlayerCards([])
    setDealerCards([])
    setCurrentBet(0)
    setGameState("betting")
    setCanHit(false)
    setCanStand(false)
    setCanDoubleDown(false)
    setShowDealerHole(false)
    setMessage("Place your bet")
    
    if (deck.length < 20) {
      setDeck(createDeck())
    }
  }

  const renderCard = (card: Card, isHidden: boolean = false) => {
    const isRed = card.suit === "♥" || card.suit === "♦"
    const isAnimating = cardAnimations[card.id]
    
    return (
      <div 
        key={card.id}
        className={`relative transform transition-all duration-500 hover:scale-105 ${
          isAnimating ? 'animate-bounce scale-110' : ''
        } ${isHidden ? 'hover:rotate-12' : 'hover:-rotate-6'}`}
        style={{
          filter: isAnimating ? 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.6))' : 'none'
        }}
      >
        <div 
          className="w-20 h-28 rounded-2xl shadow-2xl flex flex-col justify-between p-3 m-1 font-bold relative overflow-hidden border-4"
          style={{ 
            background: isHidden 
              ? 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #581c87 100%)'
              : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            borderColor: isHidden ? '#4338ca' : (isRed ? '#ef4444' : '#1f2937'),
            transform: isHidden ? 'rotateY(0deg)' : 'rotateY(0deg)',
          }}
        >

          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: isHidden 
                ? 'repeating-conic-gradient(from 45deg, #60a5fa 0deg 90deg, transparent 90deg 180deg)'
                : 'radial-gradient(circle at 50% 50%, #e5e7eb 1px, transparent 1px)',
              backgroundSize: '8px 8px'
            }}
          />
          
          {isHidden ? (
            <div className="w-full h-full flex items-center justify-center relative z-10">
              <div className="text-6xl text-white animate-pulse">
                <Star className="w-12 h-12" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full relative z-10">

              <div className="flex flex-col items-start">
                <span 
                  className="text-lg font-black leading-none"
                  style={{ color: isRed ? '#dc2626' : '#1f2937' }}
                >
                  {card.rank}
                </span>
              </div>
              

              <div className="flex items-center justify-center flex-grow">
                <span 
                  className="text-4xl font-bold transform hover:scale-110 transition-transform duration-200"
                  style={{ color: isRed ? '#dc2626' : '#1f2937' }}
                >
                  {card.suit}
                </span>
              </div>
            </div>
          )}
          

          <div 
            className="absolute inset-0 rounded-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)'
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen flex flex-col p-6 font-sans relative overflow-hidden bg-neutral-800"
    >

      <div className="flex justify-between items-center mb-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-400 drop-shadow-lg tracking-wider">
             BLACKJACK 
          </h1>
        </div>
        
        <div className="flex items-center gap-6 bg-black bg-opacity-30 backdrop-blur-sm rounded-full px-6 py-3 border border-white border-opacity-20">
          <div className={`flex items-center gap-2 ${moneyAnimation === 'win' ? 'animate-bounce' : ''}`}>
            <Coins className={`w-6 h-6 ${moneyAnimation === 'win' ? 'text-green-300' : moneyAnimation === 'lose' ? 'text-red-300' : 'text-yellow-300'}`} />
            <span className={`font-bold text-2xl ${moneyAnimation === 'win' ? 'text-green-300' : moneyAnimation === 'lose' ? 'text-red-300' : 'text-yellow-300'}`}>
              ${money}
            </span>
          </div>
          {currentBet > 0 && (
            <div className="text-white">
              <span className="text-sm opacity-80">Bet:</span>
              <span className="font-bold text-lg ml-1 text-orange-300">${currentBet}</span>
            </div>
          )}
        </div>
      </div>


      <div className="text-center mb-8 relative z-10">
        <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white border-opacity-20 inline-block">
          <p className="text-2xl font-bold text-white drop-shadow-lg">{message}</p>
        </div>
      </div>


      <div className="mb-8 relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-purple-600 bg-opacity-80 backdrop-blur-sm rounded-full px-4 py-2 border border-white border-opacity-30">
            <span className="font-bold text-white text-lg">Dealer</span>
          </div>
          <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-full px-4 py-2 border border-white border-opacity-20">
            <span className="text-white font-bold">
              {gameState === "betting" || (!showDealerHole && dealerCards.length > 0) ? 
                `${dealerCards[0]?.value || 0} + ?` : 
                `Total: ${dealerTotal}`}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap justify-center">
          {dealerCards.map((card, index) => 
            renderCard(card, index === 1 && !showDealerHole)
          )}
        </div>
      </div>


      <div className="mb-8 relative z-10">
        <div className="flex items-center gap-4 mb-4 justify-center">
          <div className="bg-green-600 bg-opacity-80 backdrop-blur-sm rounded-full px-4 py-2 border border-white border-opacity-30">
            <span className="font-bold text-white text-lg">You</span>
          </div>
          <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-full px-4 py-2 border border-white border-opacity-20">
            <span className="text-white font-bold">Total: {playerTotal}</span>
          </div>
          {playerTotal === 21 && playerCards.length === 2 && (
            <div className="bg-yellow-500 bg-opacity-90 backdrop-blur-sm rounded-full px-4 py-2 border-2 border-yellow-300 animate-pulse">
              <span className="text-black font-black">🎊 BLACKJACK! 🎊</span>
            </div>
          )}
        </div>
        <div className="flex flex-wrap justify-center">
          {playerCards.map((card) => renderCard(card))}
        </div>
      </div>

      {gameState === "betting" && (
        <div className="mb-8 relative z-10">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 max-w-2xl mx-auto">
            {[25, 100, 250, 500].map(amount => (
              <button
                key={amount}
                onClick={() => placeBet(amount)}
                disabled={money < amount}
                className={`
                  py-4 px-6 rounded-2xl font-bold text-lg transform transition-all duration-200 
                  ${money >= amount 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white shadow-lg hover:shadow-xl hover:scale-105 border-2 border-white border-opacity-30' 
                    : 'bg-gray-500 bg-opacity-50 text-gray-300 cursor-not-allowed border-2 border-gray-400 border-opacity-30'}
                `}
              >
                ${amount}
              </button>
            ))}
            <button
              onClick={() => placeBet(money)}
              disabled={money <= 0}
              className={`
                py-4 px-6 rounded-2xl font-bold text-lg transform transition-all duration-200 
                ${money > 0 
                  ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 text-white shadow-lg hover:shadow-xl hover:scale-105 border-2 border-white border-opacity-30' 
                  : 'bg-gray-500 bg-opacity-50 text-gray-300 cursor-not-allowed border-2 border-gray-400 border-opacity-30'}
              `}
            >
              ALL IN
            </button>
          </div>
              <div className="text-center text-white opacity-80 mt-6">
      <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-xl px-6 py-3 border border-white border-opacity-20 inline-block">
        <p className="text-sm font-medium">Get to 21 without going over • Dealer hits on soft 17 • Blackjack pays 3:2</p>
      </div>
    </div>
        </div>
      )}

{gameState === "playing" && (
  <div className="flex flex-col items-center gap-4 mb-8 relative z-10">
    <div className="flex gap-4 justify-center">
      <button
        onClick={hit}
        disabled={!canHit}
        className="py-4 px-8 rounded-2xl font-bold text-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-white border-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        <Zap className="w-6 h-6 inline mr-2" />
        HIT
      </button>
      <button
        onClick={stand}
        disabled={!canStand}
        className="py-4 px-8 rounded-2xl font-bold text-xl bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-white border-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        <Trophy className="w-6 h-6 inline mr-2" />
        STAND
      </button>
      {canDoubleDown && (
        <button
          onClick={doubleDown}
          className="py-4 px-8 rounded-2xl font-bold text-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-white border-opacity-30"
        >
          <Heart className="w-6 h-6 inline mr-2" />
          DOUBLE
        </button>
      )}
    </div>


    <div className="text-center text-white opacity-80">
      <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-xl px-6 py-3 border border-white border-opacity-20 inline-block">
        <p className="text-sm font-medium"> Get to 21 without going over • Dealer hits on soft 17 • Blackjack pays 3:2 </p>
      </div>
    </div>
  </div>
)}


      {gameState === "finished" && (
        <div className="flex justify-center relative z-10">
          <button
            onClick={newGame}
            className="py-4 px-8 rounded-2xl font-bold text-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-white border-opacity-30"
          >
            <Shuffle className="w-6 h-6 inline mr-2" />
            NEW GAME
          </button>
        </div>
      )}


      {dealingAnimation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-spin">🃏</div>
            <div className="text-white text-2xl font-bold animate-pulse">Dealing cards...</div>
          </div>
        </div>
      )}

    </div>
  )
}