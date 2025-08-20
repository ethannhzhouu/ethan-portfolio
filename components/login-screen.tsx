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
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [time, setTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length >= 0) {
      onLogin();
    } else {
      setError(true);
    }
  };

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // Choose wallpaper based on dark/light mode
  const wallpaper = isDarkMode ? "/wallpaper-night.jpg" : "/wallpaper-day.jpg";

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url('${wallpaper}')` }}
    >
      <div className="flex flex-col items-center mb-8">
        <div className={`text-5xl font-light mb-2 ${
    isDarkMode ? "text-white" : "text-black"
  }`}>
          {formattedTime}
        </div>
        <div className={`text-5xl font-light mb-2 ${isDarkMode ? "text-white" : "text-black"}`}>{formattedDate}</div>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center mb-4 overflow-hidden">
          <img src="/ez.jpg" alt="Img" className="w-full h-full object-cover"
/>
        </div>
        {

        }
        <h2 className={`text-2xl font-medium mb-6 ${isDarkMode ? "text-white" : "text-black"}`}>Ethan</h2>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <Input
            type="password"
            placeholder="Enter Password (no password set)"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
          className={`w-64 backdrop-blur-md border-0 mb-2 ${ isDarkMode ? "bg-white/20 text-white placeholder:text-white/70": "bg-black/10 text-black placeholder:text-black/70"
            } ${error ? "ring-2 ring-red-500" : ""}`}
          />

          {error && (
            <p className="text-red-500 text-sm mb-2">Please enter a password:</p>
          )}
          <Button
            type="submit"
            variant="outline"
              className={`mt-2 backdrop-blur-md border-0 ${
    isDarkMode
      ? "bg-white/20 text-white hover:bg-white/30"
      : "bg-black/20 text-black hover:bg-black/30"
  }`}
          >
            Login
          </Button>
        </form>
      </div>

<div className="fixed bottom-8">
  <button
    onClick={onToggleDarkMode}
    className={`p-2 rounded-full ${
      isDarkMode
        ? "text-white/80 hover:text-white hover:bg-white/10"
        : "text-black/80 hover:text-black hover:bg-black/10"
    }`}
  >
    {isDarkMode ? (
      <Sun className="w-6 h-6" />
    ) : (
      <Moon className="w-6 h-6" />
    )}
  </button>
</div>

    </div>
  );
}
