"use client"

import { useState } from "react"
import Image from "next/image"

interface PhotosProps {
  isDarkMode?: boolean
}

export default function Photos({ isDarkMode = true }: PhotosProps) {
  const textColor = isDarkMode ? "text-white" : "text-neutral-800"
  const bgColor = isDarkMode ? "bg-neutral-900" : "bg-white-900"
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = [
    '/ez.jpg',
    '/ez.jpeg',
    '/ez1.jpeg'
  ]

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  return (
    <div 
      className={`h-full w-full ${bgColor} ${textColor} relative overflow-hidden cursor-pointer`}
      onClick={nextImage}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-neutral-900 z-10">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
            </div>
            <h2 className="text-xl font-semibold mb-2">Loading Photos...</h2>
          </div>
        </div>
      )}
      
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={images[currentImageIndex]}
          alt="Profile Photo"
          fill
          sizes="100vw"
          className="object-contain transition-opacity duration-500"
          onLoad={() => setIsLoading(false)}
          quality={100}
          priority
          style={{
            objectPosition: 'center',
            backgroundSize: 'contain',
            backgroundColor: isDarkMode ? 'rgb(23, 23, 23)' : 'rgb(212, 212, 212)'
          }}
        />
      </div>
    </div>
  )
}