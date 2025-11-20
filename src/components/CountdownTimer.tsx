import { useState, useEffect, useMemo } from 'react'

interface TimeUnitProps {
  value: number
  label: string
  maxValue: number
}

const TimeUnit = ({ value, label, maxValue }: TimeUnitProps) => {
  // Calculate percentage based on elapsed time (inverted: as value decreases, percentage increases)
  // When value = maxValue, percentage = 0% (empty)
  // When value = 0, percentage = 100% (full)
  const percentage = useMemo(() => {
    const elapsed = maxValue - value
    return Math.max(0, Math.min(100, (elapsed / maxValue) * 100))
  }, [value, maxValue])
  
  const [animatedPercentage, setAnimatedPercentage] = useState(percentage)

  // Animate percentage changes smoothly
  useEffect(() => {
    setAnimatedPercentage(percentage)
  }, [percentage])
  
  const size = 270
  const center = size / 2
  const radius = 112.5
  const strokeWidth = 18
  const innerRadius = radius - strokeWidth / 2
  
  // Calculate circumference and dash offset for progress ring using animated percentage
  const circumference = useMemo(() => 2 * Math.PI * innerRadius, [innerRadius])
  const strokeDashoffset = useMemo(() => {
    const filledLength = (animatedPercentage / 100) * circumference
    return circumference - filledLength
  }, [animatedPercentage, circumference])

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* SVG for circular progress ring - positioned as outer ring */}
      <svg 
        className="absolute inset-0 pointer-events-none"
        width={size}
        height={size}
        style={{ overflow: 'visible', transform: 'rotate(-90deg)' }}
      >
        <defs>
          {/* Bright cyan-blue gradient for filled portion */}
          <linearGradient id={`gradient-${label}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="1" />
            <stop offset="50%" stopColor="#00b8e6" stopOpacity="1" />
            <stop offset="100%" stopColor="#0099cc" stopOpacity="1" />
          </linearGradient>
          {/* Strong neon glow filter - multiple blur layers for intense glow */}
          <filter id={`glow-strong-${label}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur1"/>
            <feGaussianBlur stdDeviation="8" result="coloredBlur2"/>
            <feGaussianBlur stdDeviation="12" result="coloredBlur3"/>
            <feMerge>
              <feMergeNode in="coloredBlur3"/>
              <feMergeNode in="coloredBlur2"/>
              <feMergeNode in="coloredBlur1"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background circle (unfilled portion - very dark, almost black) */}
        <circle
          cx={center}
          cy={center}
          r={innerRadius}
          fill="none"
          stroke="rgba(20, 30, 45, 0.0)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        
        {/* Progress circle (filled portion) - bright glowing cyan-blue with smooth animation */}
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
            transition: 'stroke-dashoffset 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            transformOrigin: `${center}px ${center}px`,
          }}
        >
          {/* Animate the glow intensity for pulsing neon effect */}
          <animate
            attributeName="opacity"
            values="0.85;1;0.85"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/* Inner Container - very dark, almost black background */}
      <div 
        className="relative rounded-full flex flex-col items-center justify-center z-10"
        style={{
          width: size - (strokeWidth * 2) - 4,
          height: size - (strokeWidth * 2) - 4,
          background: 'rgba(10, 15, 25, 0.0)',
          boxShadow: `
            inset 0 0 20px rgba(0, 0, 0, 0.0),
            0 0 30px rgba(0, 212, 255, 0.2)
          `,
          margin: `${strokeWidth + 2}px`,
        }}
      >
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          {/* Number - bright glowing cyan-blue */}
          <div 
            className="text-7xl md:text-8xl font-bold mb-3 leading-none"
            style={{
              color: '#00d4ff',
              textShadow: '0 0 30px rgba(0, 212, 255, 1), 0 0 60px rgba(0, 212, 255, 0.9), 0 0 90px rgba(0, 212, 255, 0.6)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              transition: 'all 0.3s ease',
            }}
          >
            {String(value).padStart(2, '0')}
          </div>
          
          {/* Label - lighter grey with subtle cyan glow */}
          <div 
            className="text-sm md:text-base uppercase tracking-widest font-semibold"
            style={{
              color: 'rgba(200, 220, 240, 0.8)',
              textShadow: '0 0 10px rgba(0, 212, 255, 0.5), 0 0 20px rgba(0, 212, 255, 0.3)',
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
