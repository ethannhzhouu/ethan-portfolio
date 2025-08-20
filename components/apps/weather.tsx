"use client"

import { useState, useEffect, useRef } from "react"
import { Search, MapPin, Thermometer, Droplets, Wind, Sunrise, Sunset, Cloud, CloudRain, CloudSnow, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Types and Interfaces
interface WeatherProps {
  isDarkMode?: boolean
}

type WeatherCondition = "sunny" | "partly-cloudy" | "cloudy" | "rainy" | "snowy"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

interface WeatherData {
  current: {
    temp: number
    condition: string
    humidity: number
    windSpeed: number
    sunrise: string
    sunset: string
  }
  forecast: {
    day: string
    temp: number
    condition: string
  }[]
}

type CityWeatherData = {
  [key: string]: WeatherData
}


const celsiusToFahrenheit = (celsius: number): number => {
  return Math.round((celsius * 9/5) + 32)
}

const weatherData: CityWeatherData = {
  "San Francisco": {
    current: {
      temp: 21,
      condition: "Foggy",
      humidity: 75,
      windSpeed: 15,
      sunrise: "6:45 AM",
      sunset: "7:55 PM",
    },
    forecast: [
      { day: "Mon", temp: 20, condition: "cloudy" },
      { day: "Tue", temp: 22, condition: "partly-cloudy" },
      { day: "Wed", temp: 23, condition: "sunny" },
      { day: "Thu", temp: 21, condition: "partly-cloudy" },
      { day: "Fri", temp: 19, condition: "cloudy" },
    ],
  },
  "Los Angeles": {
    current: {
      temp: 28,
      condition: "Sunny",
      humidity: 45,
      windSpeed: 8,
      sunrise: "5:30 AM",
      sunset: "8:15 PM",
    },
    forecast: [
      { day: "Mon", temp: 29, condition: "sunny" },
      { day: "Tue", temp: 31, condition: "sunny" },
      { day: "Wed", temp: 27, condition: "partly-cloudy" },
      { day: "Thu", temp: 25, condition: "rainy" },
      { day: "Fri", temp: 26, condition: "partly-cloudy" },
    ],
  },
  "New York": {
    current: {
      temp: 15,
      condition: "Rainy",
      humidity: 85,
      windSpeed: 20,
      sunrise: "5:15 AM",
      sunset: "9:00 PM",

    },
    forecast: [
      { day: "Mon", temp: 14, condition: "rainy" },
      { day: "Tue", temp: 15, condition: "rainy" },
      { day: "Wed", temp: 16, condition: "cloudy" },
      { day: "Thu", temp: 17, condition: "partly-cloudy" },
      { day: "Fri", temp: 15, condition: "rainy" },
    ],
  },
  "Dubai": {
    current: {
      temp: 38,
      condition: "Sunny",
      humidity: 30,
      windSpeed: 12,
      sunrise: "5:45 AM",
      sunset: "7:15 PM",
    },
    forecast: [
      { day: "Mon", temp: 39, condition: "sunny" },
      { day: "Tue", temp: 40, condition: "sunny" },
      { day: "Wed", temp: 38, condition: "sunny" },
      { day: "Thu", temp: 37, condition: "partly-cloudy" },
      { day: "Fri", temp: 38, condition: "sunny" },
    ],
  },
  "Singapore": {
    current: {
      temp: 31,
      condition: "Thunderstorm",
      humidity: 88,
      windSpeed: 10,
      sunrise: "7:00 AM",
      sunset: "7:15 PM",
    },
    forecast: [
      { day: "Mon", temp: 32, condition: "rainy" },
      { day: "Tue", temp: 31, condition: "rainy" },
      { day: "Wed", temp: 30, condition: "cloudy" },
      { day: "Thu", temp: 31, condition: "rainy" },
      { day: "Fri", temp: 32, condition: "partly-cloudy" },
    ],
  },
}

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

export default function Weather({ isDarkMode = true }: WeatherProps) {
  const [city, setCity] = useState("San Francisco")
  const [searchQuery, setSearchQuery] = useState("")
  const [weather, setWeather] = useState(weatherData["San Francisco"])
  const [condition, setCondition] = useState<WeatherCondition>("partly-cloudy")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const animationRef = useRef<number | null>(null)
  
  const bgColor = isDarkMode ? "bg-gray-900" : "bg-gray-100"
  const textColor = isDarkMode ? "text-white" : "text-gray-800"
  const cardBg = isDarkMode ? "bg-gray-800" : "bg-white"
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-200"
  
  // Initialize particles and animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas size
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.clientWidth
        canvas.height = parent.clientHeight
      }
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Initialize particles based on condition
    initParticles()
    
    // Start animation
    const animate = () => {
      if (!canvas || !ctx) return
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw particles
      updateParticles(ctx, canvas.width, canvas.height)
      
      // Continue animation
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [condition])
  
  // Update weather condition when city changes
  useEffect(() => {
    if (weatherData[city]) {
      setWeather(weatherData[city])
      
      // Set condition based on current weather
      const currentCondition = weatherData[city].current.condition.toLowerCase()
      if (currentCondition.includes("rain")) {
        setCondition("rainy")
      } else if (currentCondition.includes("snow")) {
        setCondition("snowy")
      } else if (currentCondition.includes("cloud")) {
        setCondition("partly-cloudy")
      } else if (currentCondition.includes("sun")) {
        setCondition("sunny")
      } else {
        setCondition("partly-cloudy")
      }
      
      // Reinitialize particles
      initParticles()
    }
  }, [city])
  
// Update the initParticles function with new colors and particle behavior
const initParticles = () => {
  particles.current = []
  
  const count = condition === "rainy" ? 150 : 
                condition === "snowy" ? 100 : 
                condition === "sunny" ? 70 : 40
  
  for (let i = 0; i < count; i++) {
    let particle: Particle
    
    if (condition === "rainy") {
      // Enhanced rain particles
      particle = {
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 15 + 15,
        opacity: Math.random() * 0.6 + 0.4,
        color: isDarkMode ? 
          `rgba(${150 + Math.random() * 50}, ${200 + Math.random() * 55}, ${255}, 0.8)` : 
          `rgba(${100 + Math.random() * 50}, ${150 + Math.random() * 55}, ${255}, 0.6)`
      }
    } else if (condition === "snowy") {
      // Enhanced snow particles
      particle = {
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 1.5 + 1,
        opacity: Math.random() * 0.4 + 0.6,
        color: isDarkMode ?
          `rgba(255, 255, ${240 + Math.random() * 15}, ${0.7 + Math.random() * 0.3})` :
          `rgba(255, 255, ${250 + Math.random() * 5}, ${0.8 + Math.random() * 0.2})`
      }
    } else if (condition === "sunny") {
      // Enhanced sun particles
      particle = {
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 5 + 1,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.6 + 0.4,
        color: isDarkMode ? 
          `rgba(${255}, ${180 + Math.random() * 75}, ${0}, ${Math.random() * 0.6 + 0.4})` : 
          `rgba(${255}, ${220 + Math.random() * 35}, ${100 + Math.random() * 50}, ${Math.random() * 0.5 + 0.5})`
      }
    } else {
      // Enhanced cloud particles
      particle = {
        x: Math.random() * 100,
        y: Math.random() * 40,
        size: Math.random() * 40 + 30,
        speedX: Math.random() * 0.3 - 0.15,
        speedY: (Math.random() - 0.5) * 0.05,
        opacity: Math.random() * 0.3 + 0.1,
        color: isDarkMode ? 
          `rgba(${200 + Math.random() * 55}, ${200 + Math.random() * 55}, ${220}, ${Math.random() * 0.2 + 0.2})` : 
          `rgba(${255}, ${255}, ${255}, ${Math.random() * 0.4 + 0.3})`
      }
    }
    
    particles.current.push(particle)
  }
}

// Update the updateParticles function with enhanced rendering
const updateParticles = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  particles.current.forEach(p => {
    const x = (p.x / 100) * width
    const y = (p.y / 100) * height
    
    ctx.beginPath()
    
    if (condition === "rainy") {
      ctx.strokeStyle = p.color
      ctx.lineWidth = p.size
      ctx.moveTo(x, y)
      ctx.lineTo(x + p.speedX, y + p.size * 3)
      ctx.stroke()
      
      if (p.y > 95) {
        ctx.beginPath()
        ctx.arc(x, (p.y / 100) * height, p.size * 2, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      }
    } else if (condition === "snowy") {
      const numberOfPoints = 6
      const rotation = (Math.PI * 2) / numberOfPoints
      
      for (let i = 0; i < numberOfPoints; i++) {
        ctx.moveTo(x, y)
        const x2 = x + Math.cos(rotation * i) * p.size
        const y2 = y + Math.sin(rotation * i) * p.size
        ctx.lineTo(x2, y2)
      }
      
      ctx.strokeStyle = p.color
      ctx.lineWidth = p.size / 3
      ctx.stroke()
    } else if (condition === "sunny") {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, p.size)
      gradient.addColorStop(0, p.color)
      gradient.addColorStop(1, 'rgba(255, 255, 200, 0)')
      ctx.fillStyle = gradient
      ctx.arc(x, y, p.size, 0, Math.PI * 2)
      ctx.fill()
    } else {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, p.size)
      gradient.addColorStop(0, p.color)
      gradient.addColorStop(1, `rgba(255, 255, 255, 0)`)
      ctx.fillStyle = gradient
      ctx.arc(x, y, p.size, 0, Math.PI * 2)
      ctx.fill()
    }
    

    p.x += p.speedX * 0.1
    p.y += p.speedY * 0.1
    
    if (condition === "rainy") {
      if (p.y > 100) {
        p.y = -5
        p.x = Math.random() * 100
        p.speedY = Math.random() * 15 + 15
      }
    } else if (condition === "snowy") {
      if (p.y > 100) {
        p.y = -2
        p.x = Math.random() * 100
      }
      if (p.x < -2 || p.x > 102) {
        p.x = Math.random() * 100
      }
    } else if (condition === "sunny") {
      if (p.x < -2) p.x = 102
      if (p.x > 102) p.x = -2
      if (p.y < -2) p.y = 102
      if (p.y > 102) p.y = -2
    } else {
      if (p.x < -40) p.x = 140
      if (p.x > 140) p.x = -40
    }
  })
}
  
  const handleSearch = () => {
    const query = searchQuery.trim()
    if (query && Object.keys(weatherData).some(city => city.toLowerCase().includes(query.toLowerCase()))) {
      const foundCity = Object.keys(weatherData).find(city => 
        city.toLowerCase().includes(query.toLowerCase())
      )
      if (foundCity) {
        setCity(foundCity)
      }
    }
    setSearchQuery("")
  }
  
  const getWeatherIcon = (condition: string) => {
    if (condition.includes("sunny")) return <Sun className="w-6 h-6" />
    if (condition.includes("partly-cloudy")) return <Cloud className="w-6 h-6" />
    if (condition.includes("rainy")) return <CloudRain className="w-6 h-6" />
    if (condition.includes("snowy")) return <CloudSnow className="w-6 h-6" />
    return <Cloud className="w-6 h-6" />
  }
  
  return (
    <div className={`h-full ${bgColor} ${textColor} flex flex-col relative overflow-hidden`}>
      {}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-0"
      />
      
      {}
      <div className="relative z-10 flex flex-col h-full">
        {}
        <div className="p-4 flex items-center space-x-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className={`pl-10 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          <Button 
            onClick={handleSearch}
            variant={isDarkMode ? "outline" : "default"}
            className={isDarkMode ? "border-gray-700" : ""}
          >
            Search
          </Button>
        </div>
        
        {}
        <div className="px-6 py-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-500" />
              <h2 className="text-2xl font-bold">{city}</h2>
            </div>
            <p className="text-gray-500 text-sm mt-1">Today</p>
            
<div className="flex items-center mt-4">
  <div className="text-6xl font-light mr-4">
    <span className="flex items-baseline">
      {weather.current.temp}°C
      <span className="text-2xl text-gray-500 ml-2">
        ({celsiusToFahrenheit(weather.current.temp)}°F)
      </span>
    </span>
  </div>
  <div>
    <p className="text-lg">{weather.current.condition}</p>
  </div>
</div>
          </div>
          
          <div className={`${cardBg} p-4 rounded-lg border ${borderColor} grid grid-cols-2 gap-4 w-full md:w-auto`}>
            <div className="flex items-center">
              <Droplets className="w-5 h-5 mr-2 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Humidity</p>
                <p className="font-medium">{weather.current.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center">
              <Wind className="w-5 h-5 mr-2 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Wind</p>
                <p className="font-medium">{weather.current.windSpeed} km/h</p>
              </div>
            </div>
            <div className="flex items-center">
              <Sunrise className="w-5 h-5 mr-2 text-orange-500" />
              <div>
                <p className="text-sm text-gray-500">Sunrise</p>
                <p className="font-medium">{weather.current.sunrise}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Sunset className="w-5 h-5 mr-2 text-orange-500" />
              <div>
                <p className="text-sm text-gray-500">Sunset</p>
                <p className="font-medium">{weather.current.sunset}</p>
              </div>
            </div>
          </div>
        </div>
        
        {}
<div className="px-6 mt-4">
  <h3 className="text-lg font-medium mb-3">5-Day Forecast</h3>
  <div className={`grid grid-cols-5 gap-2 ${cardBg} rounded-lg border ${borderColor} p-4`}>
    {weather.forecast.map((day, index) => (
      <div key={index} className="flex flex-col items-center">
        <p className="font-medium">{day.day}</p>
        <div className="my-2">
          {getWeatherIcon(day.condition)}
        </div>
        <div className="text-center">
          <p className="text-lg font-medium">{day.temp}°C</p>
          <p className="text-sm text-gray-500">
            ({celsiusToFahrenheit(day.temp)}°F)
          </p>
        </div>
      </div>
    ))}
  </div>
</div>
        
        {}
        <div className="px-6 mt-6">
          <h3 className="text-lg font-medium mb-3">Popular Cities</h3>
          <div className="flex flex-wrap gap-2">
            {Object.keys(weatherData).map((cityName) => (
              <Button
                key={cityName}
                variant={city === cityName ? "default" : "outline"}
                className={`${city === cityName ? "" : isDarkMode ? "border-gray-700" : "border-gray-300"}`}
                onClick={() => setCity(cityName)}
              >
                {cityName}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
