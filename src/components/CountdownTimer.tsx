import { useState, useEffect } from 'react'

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 109,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [ringLengths, setRingLengths] = useState<number[]>([])

  useEffect(() => {
    // Initialize random ring lengths
    const initialLengths = Array.from({ length: 8 }, () => Math.random() * 0.6 + 0.2) // 20-80% of circle
    setRingLengths(initialLengths)

    // Randomly change ring lengths periodically
    const lengthInterval = setInterval(() => {
      setRingLengths(prev => prev.map(() => Math.random() * 0.6 + 0.2))
    }, 3000) // Change every 3 seconds

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds--
        } else {
          seconds = 59
          if (minutes > 0) {
            minutes--
          } else {
            minutes = 59
            if (hours > 0) {
              hours--
            } else {
              hours = 23
              if (days > 0) {
                days--
              }
            }
          }
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => {
      clearInterval(timer)
      clearInterval(lengthInterval)
    }
  }, [])

  // Calculate progress percentage (assuming 109 days total)
  const totalDays = 109
  const progress = ((totalDays - timeLeft.days) / totalDays) * 100
  const circumference = 2 * Math.PI * 160 // radius = 160
  const strokeDashoffset = circumference - (progress / 100) * circumference

  // Ring configurations: [radius, strokeWidth, rotationSpeed, startAngle]
  const ringConfigs = [
    { radius: 135, strokeWidth: 2, speed: 20, startAngle: 0 },
    { radius: 145, strokeWidth: 3, speed: 25, startAngle: 45 },
    { radius: 155, strokeWidth: 1.5, speed: 30, startAngle: 90 },
    { radius: 165, strokeWidth: 2.5, speed: 18, startAngle: 135 },
    { radius: 125, strokeWidth: 2, speed: 22, startAngle: 180 },
    { radius: 175, strokeWidth: 1, speed: 28, startAngle: 225 },
    { radius: 115, strokeWidth: 3, speed: 15, startAngle: 270 },
    { radius: 185, strokeWidth: 2, speed: 35, startAngle: 315 },
  ]

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Glowing Chip/Processor Behind */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-48 h-48 opacity-30">
          <svg width="192" height="192" viewBox="0 0 192 192" className="drop-shadow-strong">
            <defs>
              <radialGradient id="chipGradient">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
              </radialGradient>
              <filter id="chipGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {/* Chip base */}
            <rect x="40" y="40" width="112" height="112" rx="8" fill="url(#chipGradient)" filter="url(#chipGlow)" />
            {/* Chip lines */}
            <line x1="60" y1="60" x2="132" y2="60" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="2" />
            <line x1="60" y1="80" x2="132" y2="80" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="2" />
            <line x1="60" y1="100" x2="132" y2="100" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="2" />
            <line x1="60" y1="120" x2="132" y2="120" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="2" />
            <line x1="60" y1="140" x2="132" y2="140" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="2" />
            {/* Vertical lines */}
            <line x1="80" y1="40" x2="80" y2="152" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="2" />
            <line x1="112" y1="40" x2="112" y2="152" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="2" />
            {/* Corner nodes */}
            <circle cx="60" cy="60" r="4" fill="rgba(255, 255, 255, 0.9)" />
            <circle cx="132" cy="60" r="4" fill="rgba(255, 255, 255, 0.9)" />
            <circle cx="60" cy="152" r="4" fill="rgba(255, 255, 255, 0.9)" />
            <circle cx="132" cy="152" r="4" fill="rgba(255, 255, 255, 0.9)" />
          </svg>
        </div>
      </div>

      {/* Circular Timer - Increased size to show all rings */}
      <div className="relative w-[560px] h-[560px] md:w-[640px] md:h-[640px] flex items-center justify-center overflow-visible">
        {/* Rotating Rings with Varying Lengths */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 560 560" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="ringGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="ringGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
            </linearGradient>
            <filter id="ringBlur">
              <feGaussianBlur stdDeviation="2" />
            </filter>
            <filter id="ringGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="ringShadow">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#ffffff" floodOpacity="0.5"/>
            </filter>
          </defs>
          
          {ringConfigs.map((config, i) => {
            const length = ringLengths[i] || 0.5
            const circumference = 2 * Math.PI * config.radius
            const dashLength = circumference * length
            const gapLength = circumference * (1 - length)
            
            return (
              <g
                key={`ring-${i}`}
                transform={`rotate(${config.startAngle} 280 280)`}
                className="animate-spin"
                style={{
                  animationDuration: `${config.speed}s`,
                  animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
                  transformOrigin: '280px 280px',
                }}
              >
                <circle
                  cx="280"
                  cy="280"
                  r={config.radius}
                  fill="none"
                  stroke={i % 2 === 0 ? "url(#ringGradient1)" : "url(#ringGradient2)"}
                  strokeWidth={config.strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={`${dashLength} ${gapLength}`}
                  filter="url(#ringBlur) url(#ringShadow)"
                  className="transition-all duration-3000 ease-in-out"
                  style={{
                    opacity: 0.7 + (i % 3) * 0.1,
                  }}
                />
              </g>
            )
          })}

          {/* Orbiting particles */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30) * (Math.PI / 180)
            const radius = 170
            const x = 280 + radius * Math.cos(angle)
            const y = 280 + radius * Math.sin(angle)
            return (
              <circle
                key={`particle-${i}`}
                cx={x}
                cy={y}
                r="2"
                fill="rgba(255, 255, 255, 0.7)"
                className="animate-pulse-slow"
                style={{
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            )
          })}
        </svg>

        {/* Progress Circle */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 560 560" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          {/* Background circle */}
          <circle
            cx="280"
            cy="280"
            r="160"
            fill="none"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="4"
          />
          {/* Progress arc */}
          <circle
            cx="280"
            cy="280"
            r="160"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
            style={{
              filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.4))',
            }}
          />
        </svg>

        {/* Timer Numbers */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="text-3xl md:text-4xl font-bold text-white text-shadow-glow mb-2">
            {String(timeLeft.days).padStart(2, '0')}:
            {String(timeLeft.hours).padStart(2, '0')}:
            {String(timeLeft.minutes).padStart(2, '0')}:
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="flex gap-3 md:gap-4 text-xs md:text-sm text-white/70 uppercase tracking-wider">
            <span>Days</span>
            <span>Hours</span>
            <span>Mins</span>
            <span>Secs</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountdownTimer
