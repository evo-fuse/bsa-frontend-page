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
  const [isChanging, setIsChanging] = useState(false)
  const [prevValue, setPrevValue] = useState(value)

  // Animate percentage changes smoothly
  useEffect(() => {
    if (value !== prevValue) {
      setIsChanging(true)
      setPrevValue(value)
      setTimeout(() => setIsChanging(false), 600)
    }
    setAnimatedPercentage(percentage)
  }, [percentage, value, prevValue])
  
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
    <div 
      className="relative flex items-center justify-center" 
      style={{ 
        width: size, 
        height: size,
        animation: 'timerPulse 3s ease-in-out infinite',
        transition: 'transform 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.08)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
      }}
    >
      <style>{`
        @keyframes timerPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        @keyframes numberChange {
          0% { transform: scale(1) rotateY(0deg); opacity: 1; }
          50% { transform: scale(1.15) rotateY(90deg); opacity: 0.7; }
          100% { transform: scale(1) rotateY(0deg); opacity: 1; }
        }
        @keyframes ringGlow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.3); }
        }
        @keyframes progressGrow {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes innerPulse {
          0%, 100% { 
            box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3), 0 0 30px rgba(3, 100, 200, 0.3);
          }
          50% { 
            box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.4), 0 0 50px rgba(3, 100, 200, 0.6);
          }
        }
        @keyframes textGlow {
          0%, 100% { 
            text-shadow: 0 0 20px rgba(3, 100, 200, 1), 0 0 40px rgba(3, 100, 200, 0.8), 0 0 60px rgba(3, 100, 200, 0.5);
          }
          50% { 
            text-shadow: 0 0 30px rgba(3, 100, 200, 1), 0 0 60px rgba(3, 100, 200, 0.9), 0 0 90px rgba(3, 100, 200, 0.7);
          }
        }
      `}</style>
      {/* SVG for circular progress ring - positioned as outer ring */}
      <svg 
        className="absolute inset-0 pointer-events-none"
        width={size}
        height={size}
        style={{ 
          overflow: 'visible', 
          transform: 'rotate(-90deg)',
          transition: 'all 0.5s ease',
          animation: 'ringGlow 2s ease-in-out infinite',
        }}
      >
        <defs>
          {/* Main blue gradient for filled portion */}
          <linearGradient id={`gradient-${label}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(3, 100, 200)" stopOpacity="1" />
            <stop offset="50%" stopColor="rgba(3, 100, 200, 0.9)" stopOpacity="1" />
            <stop offset="100%" stopColor="rgba(3, 100, 200, 0.8)" stopOpacity="1" />
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
        
        {/* Background circle (unfilled portion - white border) */}
        <circle
          cx={center}
          cy={center}
          r={innerRadius}
          fill="none"
          stroke="rgba(255, 255, 255, 1)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          style={{
            transition: 'stroke-opacity 0.5s ease',
            animation: 'ringGlow 3s ease-in-out infinite',
          }}
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
            transition: 'stroke-dashoffset 0.5s cubic-bezier(0.4, 0, 0.2, 1), stroke-width 0.3s ease',
            transformOrigin: `${center}px ${center}px`,
            animation: isChanging ? 'progressGrow 0.6s ease' : 'none',
          }}
        >
          {/* Animate the glow intensity for pulsing neon effect */}
          <animate
            attributeName="opacity"
            values="0.85;1;0.85"
            dur="2s"
            repeatCount="indefinite"
          />
          {/* Animate stroke width for breathing effect */}
          <animate
            attributeName="stroke-width"
            values={`${strokeWidth};${strokeWidth + 2};${strokeWidth}`}
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/* Inner Container - semi-transparent background */}
      <div 
        className="relative rounded-full flex flex-col items-center justify-center z-10"
        style={{
          width: size - (strokeWidth * 2) - 4,
          height: size - (strokeWidth * 2) - 4,
          background: 'rgba(255, 255, 255, 0.05)',
          boxShadow: `
            inset 0 0 20px rgba(0, 0, 0, 0.3),
            0 0 30px rgba(3, 100, 200, 0.3)
          `,
          margin: `${strokeWidth + 2}px`,
          transition: 'all 0.3s ease',
          animation: 'innerPulse 4s ease-in-out infinite',
        }}
      >
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          {/* Number - bright white with blue glow for visibility on blue background */}
          <div 
            className="text-7xl md:text-8xl font-bold mb-3 leading-none"
            style={{
              color: '#ffffff',
              textShadow: '0 0 20px rgba(3, 100, 200, 1), 0 0 40px rgba(3, 100, 200, 0.8), 0 0 60px rgba(3, 100, 200, 0.5)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              transition: 'all 0.3s ease',
              animation: isChanging ? 'numberChange 0.6s ease' : 'textGlow 2s ease-in-out infinite',
              transform: isChanging ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            {String(value).padStart(2, '0')}
          </div>
          
          {/* Label - white with subtle glow */}
          <div 
            className="text-sm md:text-base uppercase tracking-widest font-semibold"
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              textShadow: '0 0 8px rgba(3, 100, 200, 0.6), 0 0 15px rgba(3, 100, 200, 0.4)',
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
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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
    <div 
      className="flex flex-row gap-4 md:gap-6 items-center justify-center"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 1s ease, transform 1s ease',
      }}
    >
      <TimeUnit 
        key={`days-${timeLeft.days}`}
        value={timeLeft.days} 
        label="DAYS" 
        maxValue={maxDays} 
      />
      <TimeUnit 
        key={`hours-${timeLeft.hours}`}
        value={timeLeft.hours} 
        label="HOURS" 
        maxValue={24} 
      />
      <TimeUnit 
        key={`minutes-${timeLeft.minutes}`}
        value={timeLeft.minutes} 
        label="MINUTES" 
        maxValue={60} 
      />
      <TimeUnit 
        key={`seconds-${timeLeft.seconds}`}
        value={timeLeft.seconds} 
        label="SECONDS" 
        maxValue={60} 
      />
    </div>
  )
}

export default CountdownTimer
