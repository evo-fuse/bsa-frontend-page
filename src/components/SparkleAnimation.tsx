import { useEffect, useRef } from 'react'

function SparkleAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const opts = {
      len: 60, // 3 times bigger (20 * 3 = 60)
      count: 20, // Reduced number of active lines
      baseTime: 60, // Much slower (doubled from 30)
      addedTime: 40, // Much slower (doubled from 20)
      dieChance: 0.05,
      spawnChance: 0.5, // Slower spawning (reduced from 1)
      sparkChance: 0, // Disabled sparks
      sparkDist: 30,
      sparkSize: 6,
      color: 'rgba(3, 100, 200, opacity)', // Main blue color with opacity
      baseLight: 50,
      addedLight: 10,
      shadowToTimePropMult: 6,
      baseLightInputMultiplier: 0.002, // Much slower (reduced from 0.005)
      addedLightInputMultiplier: 0.005, // Much slower (reduced from 0.01)
      cx: w / 2,
      cy: h / 2,
      repaintAlpha: 0.03, // Smooth fade out for trajectories
      hueChange: 0.1
    }

    let tick = 0
    const lines: any[] = []
    let dieX = w / 2 / opts.len
    let dieY = h / 2 / opts.len
    const baseRad = Math.PI * 2 / 6
    
    // Mouse position tracking
    let mouseX = w / 2
    let mouseY = h / 2

    // Start with white background
    ctx.fillStyle = 'rgba(255, 255, 255, 1)'
    ctx.fillRect(0, 0, w, h)

    class Line {
      x: number = 0
      y: number = 0
      addedX: number = 0
      addedY: number = 0
      rad: number = 0
      lightInputMultiplier: number = 0
      color: string = ''
      cumulativeTime: number = 0
      time: number = 0
      targetTime: number = 0
      lastX: number = 0
      lastY: number = 0
      pathStarted: boolean = false
      pathPoints: Array<{x: number, y: number, time: number}> = []

      constructor() {
        this.reset()
      }

      reset() {
        this.x = 0
        this.y = 0
        this.addedX = 0
        this.addedY = 0
        this.rad = 0
        this.lightInputMultiplier = opts.baseLightInputMultiplier + opts.addedLightInputMultiplier * Math.random()
        // Use main blue color with 0.05 opacity
        const opacity = 0.05
        this.color = opts.color.replace('opacity', opacity.toString())
        this.cumulativeTime = 0
        this.pathStarted = false
        this.lastX = 0
        this.lastY = 0
        this.pathPoints = []
        this.beginPhase()
      }

      beginPhase() {
        this.x += this.addedX
        this.y += this.addedY
        this.time = 0
        this.targetTime = Math.floor(opts.baseTime + opts.addedTime * Math.random())
        this.rad += baseRad * (Math.random() < 0.5 ? 1 : -1)
        this.addedX = Math.cos(this.rad)
        this.addedY = Math.sin(this.rad)

        if (Math.random() < opts.dieChance || this.x > dieX || this.x < -dieX || this.y > dieY || this.y < -dieY) {
          this.reset()
        } else {
          // Update last position to continue the line smoothly
          const prop = 1 // End of previous phase
          const wave = Math.sin(prop * Math.PI / 2)
          const x = this.addedX * wave
          const y = this.addedY * wave
          this.lastX = opts.cx + (this.x + x) * opts.len
          this.lastY = opts.cy + (this.y + y) * opts.len
        }
      }

      step() {
        if (!ctx) return
        
        this.time++
        this.cumulativeTime++

        if (this.time >= this.targetTime) {
          this.beginPhase()
        }

        const prop = this.time / this.targetTime
        const wave = Math.sin(prop * Math.PI / 2)
        const x = this.addedX * wave
        const y = this.addedY * wave

        let currentX = opts.cx + (this.x + x) * opts.len
        let currentY = opts.cy + (this.y + y) * opts.len
        
        // Calculate distance from cursor
        const dx = mouseX - currentX
        const dy = mouseY - currentY
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 200 // Maximum influence distance
        
        // Apply cursor attraction effect (lines curve toward cursor)
        if (distance < maxDistance && distance > 0) {
          const influence = (1 - distance / maxDistance) * 0.3 // 30% max influence
          const angle = Math.atan2(dy, dx)
          currentX += Math.cos(angle) * influence * 10
          currentY += Math.sin(angle) * influence * 10
        }
        
        const currentTime = Date.now()

        // Add current point to path history
        this.pathPoints.push({ x: currentX, y: currentY, time: currentTime })

        // Remove points older than 2 seconds (2000ms)
        const twoSecondsAgo = currentTime - 2000
        this.pathPoints = this.pathPoints.filter(point => point.time > twoSecondsAgo)

        // Set line properties with cursor-based opacity enhancement
        let lineOpacity = this.color
        if (distance < maxDistance) {
          const opacityBoost = (1 - distance / maxDistance) * 0.05
          const currentOpacity = parseFloat(this.color.match(/[\d.]+/)?.[0] || '0.05')
          const newOpacity = Math.min(0.15, currentOpacity + opacityBoost) // Cap at 0.15 for subtle enhancement
          lineOpacity = `rgba(3, 100, 200, ${newOpacity})`
        }
        
        ctx.strokeStyle = lineOpacity
        ctx.lineWidth = distance < maxDistance ? 2 + (1 - distance / maxDistance) * 1 : 2 // Thicker near cursor
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        // Draw solid lines only for points within the last 2 seconds
        if (this.pathPoints.length > 1) {
          ctx.beginPath()
          ctx.moveTo(this.pathPoints[0].x, this.pathPoints[0].y)
          
          for (let i = 1; i < this.pathPoints.length; i++) {
            ctx.lineTo(this.pathPoints[i].x, this.pathPoints[i].y)
          }
          ctx.stroke()
        }

        this.lastX = currentX
        this.lastY = currentY
        this.pathStarted = true
      }
    }

    let animationFrameId: number

    function loop() {
      animationFrameId = window.requestAnimationFrame(loop)

      if (!ctx) return

      tick++

      ctx.globalCompositeOperation = 'source-over'
      ctx.shadowBlur = 0
      // Use white background with opacity for smooth trailing fade effect
      ctx.fillStyle = `rgba(255,255,255,${opts.repaintAlpha})`
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'source-over'

      if (lines.length < opts.count && Math.random() < opts.spawnChance) {
        lines.push(new Line())
      }

      lines.forEach((line) => { line.step() })
    }

    loop()

    const handleResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
      
      // Clear the canvas completely
      ctx.fillStyle = 'rgba(255, 255, 255, 1)'
      ctx.fillRect(0, 0, w, h)

      // Update center and boundaries
      opts.cx = w / 2
      opts.cy = h / 2

      dieX = w / 2 / opts.len
      dieY = h / 2 / opts.len
      
      // Reset all lines to start fresh from the new center
      // Clear pathPoints for all existing lines
      lines.forEach((line) => {
        line.pathPoints = []
        line.pathStarted = false
        line.lastX = 0
        line.lastY = 0
      })
      
      // Reset mouse position to center
      mouseX = w / 2
      mouseY = h / 2
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  )
}

export default SparkleAnimation

