import { useState, useEffect, useMemo } from 'react'

interface TimeUnitProps {
  value: number
  label: string
  maxValue: number
}

const TimeUnit = ({ value, label, maxValue }: TimeUnitProps) => {
  // Calculate percentage based on remaining value (clamped between 0 and 100)
  const percentage = useMemo(() => {
    return Math.max(0, Math.min(100, (value / maxValue) * 100))
  }, [value, maxValue])
  
  const size = 180
  const center = size / 2
  const radius = 70
  const strokeWidth = 10
  const innerRadius = radius - strokeWidth / 2
  
  // Calculate circumference and dash offset for progress ring
  const circumference = useMemo(() => 2 * Math.PI * innerRadius, [innerRadius])
  const strokeDashoffset = useMemo(() => {
    const filledLength = (percentage / 100) * circumference
    return circumference - filledLength
  }, [percentage, circumference])

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* SVG for circular progress ring */}
      <svg 
        className="absolute inset-0 pointer-events-none transform -rotate-90"
        width={size}
        height={size}
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id={`gradient-${label}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 148, 255, 1)" stopOpacity="1" />
            <stop offset="50%" stopColor="rgba(0, 148, 255, 0.95)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="rgba(0, 148, 255, 0.8)" stopOpacity="0.8" />
          </linearGradient>
          <filter id={`glow-${label}`}>
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id={`glow-strong-${label}`}>
            <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background circle (unfilled portion - dimmer) */}
        <circle
          cx={center}
          cy={center}
          r={innerRadius}
          fill="none"
          stroke="rgba(0, 148, 255, 0.2)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        
        {/* Progress circle (filled portion) - animated with smooth transitions */}
        <circle
          key={`progress-${label}-${value}`}
          cx={center}
          cy={center}
          r={innerRadius}
          fill="none"
          stroke={`url(#gradient-${label})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          filter={`url(#glow-strong-${label})`}
          style={{
            transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)',
            transformOrigin: `${center}px ${center}px`,
          }}
        >
          {/* Animate the glow intensity for pulsing effect */}
          <animate
            attributeName="opacity"
            values="0.95;1;0.95"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/* Circular Container */}
      <div 
        className="relative rounded-full flex flex-col items-center justify-center"
        style={{
          width: size - 20,
          height: size - 20,
          background: 'rgba(15, 30, 60, 0.95)',
          boxShadow: `
            0 0 20px rgba(0, 148, 255, 0.4),
            inset 0 0 30px rgba(0, 148, 255, 0.1)
          `,
          margin: '10px',
        }}
      >
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          {/* Number */}
          <div 
            className="text-5xl md:text-6xl font-bold mb-2 leading-none"
            style={{
              color: '#ffffff',
              textShadow: '0 0 15px rgba(0, 148, 255, 0.9), 0 0 30px rgba(0, 148, 255, 0.5), 0 0 45px rgba(0, 148, 255, 0.3)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            {String(value).padStart(2, '0')}
          </div>
          
          {/* Label */}
          <div 
            className="text-xs md:text-sm uppercase tracking-widest font-semibold"
            style={{
              color: '#ffffff',
              textShadow: '0 0 8px rgba(0, 148, 255, 0.7), 0 0 15px rgba(0, 148, 255, 0.4)',
              letterSpacing: '0.15em',
            }}
          >
            {label}
          </div>
        </div>
      </div>
    </div>
  )
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 6,
    hours: 22,
    minutes: 57,
    seconds: 50,
  })

  useEffect(() => {
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
    }
  }, [])

  // Max days for calculation (you can adjust this based on your countdown target)
  const maxDays = 30

  return (
    <div className="flex flex-row gap-4 md:gap-6 items-center justify-center">
      <TimeUnit value={timeLeft.days} label="DAYS" maxValue={maxDays} />
      <TimeUnit value={timeLeft.hours} label="HOURS" maxValue={24} />
      <TimeUnit value={timeLeft.minutes} label="MINUTES" maxValue={60} />
      <TimeUnit value={timeLeft.seconds} label="SECONDS" maxValue={60} />
    </div>
  )
}

export default CountdownTimer
