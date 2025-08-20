export function AppleIcon({
  className = "w-32 h-32",
  fillColor, // optional prop
}: {
  className?: string;
  fillColor?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      className={className}
      fill={fillColor ?? "url(#apple-gradient)"} // use fillColor if provided
    >
      {!fillColor && (
        <defs>
          <linearGradient id="apple-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%">
              <animate
                attributeName="stop-color"
                values="white;gray;black;white"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%">
              <animate
                attributeName="stop-color"
                values="black;gray;white;black"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>
      )}
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  )
}


export function SpotlightIcon({ className, color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg 
      viewBox="0 0 16 16" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.5 2.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm-5 4a5 5 0 1 1 9.17 2.83l3.54 3.54a.5.5 0 0 1-.7.7l-3.54-3.54A5 5 0 0 1 1.5 6.5z"
        fill={color}
      />
    </svg>
  )
}

export function ControlCenterIcon({ className, color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg 
      viewBox="0 0 20 20" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 3H4v5h5V3zM4 2a1 1 0 00-1 1v5a1 1 0 001 1h5a1 1 0 001-1V3a1 1 0 00-1-1H4zm12 0h-5v5h5V2zm1 11v5h-5v-5h5zm1-1a1 1 0 00-1-1h-5a1 1 0 00-1 1v5a1 1 0 001 1h5a1 1 0 001-1v-5zM4 12h5v5H4v-5zm-1-1a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-1 1H4a1 1 0 01-1-1v-5z"
        fill={color}
      />
    </svg>
  )
}