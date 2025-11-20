import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleIn'
  delay?: number
  className?: string
}

const AnimatedSection = ({ 
  children, 
  animation = 'fadeIn', 
  delay = 0,
  className = '' 
}: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true)
            }, delay)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [delay])

  const animationClasses = {
    fadeIn: 'animate-fade-in',
    slideUp: 'animate-slide-up',
    slideDown: 'animate-slide-down',
    slideLeft: 'animate-slide-left',
    slideRight: 'animate-slide-right',
    scaleIn: 'animate-scale-in',
  }

  return (
    <div
      ref={sectionRef}
      className={`${isVisible ? animationClasses[animation] : 'opacity-0'} ${className}`}
    >
      {children}
    </div>
  )
}

export default AnimatedSection

