"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { User, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LoginScreenProps {
  onLogin: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function LoginScreen({
  onLogin,
  isDarkMode,
  onToggleDarkMode,
}: LoginScreenProps) {
  const [time, setTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle space key press
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        onLogin();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onLogin]);

  // Format time and date
const formattedTime = time.toLocaleTimeString('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true
}).toLowerCase().replace('am', 'ᴀᴍ').replace('pm', 'ᴘᴍ');

const formattedDate = time.toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'numeric',
  day: 'numeric',
  year: '2-digit'
}).replace(',', ' •').replace(',', ' /');

  const wallpaper = isDarkMode ? "/wallpaper-night.jpg" : "/wallpaper-day.jpg";

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url('${wallpaper}')` }}
    >
<div className="flex flex-col items-center mb-8">
  <div className={`text-6xl font-extralight tracking-tight mb-3 ${isDarkMode ? "text-white" : "text-black"}`}>
    {formattedTime}
  </div>
  <div className={`text-lg font-light tracking-wide ${isDarkMode ? "text-white/80" : "text-black/80"}`}>
    {formattedDate}
  </div>
</div>

      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center mb-4 overflow-hidden">
          <img src="/ez.jpg" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <h2 className={`text-2xl font-medium mb-6 ${isDarkMode ? "text-white" : "text-black"}`}>
          Ethan
        </h2> 
        <div className={`text-lg ${isDarkMode ? "text-white/70" : "text-black/70"} animate-pulse`}>
          press space to enter
        </div>
      </div>

      <button
        onClick={onToggleDarkMode}
        className={`absolute top-4 right-4 p-2 rounded-full 
          ${isDarkMode ? "bg-white/10 hover:bg-white/20" : "bg-black/10 hover:bg-black/20"}
          transition-colors duration-200`}
      >
        {isDarkMode ? (
          <Moon className="w-5 h-5 text-white" />
        ) : (
          <Sun className="w-5 h-5 text-black" />
        )}
      </button>
    </div>
  );
}
