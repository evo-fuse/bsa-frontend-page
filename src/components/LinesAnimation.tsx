import { useEffect, useRef } from 'react'

interface Point {
  x: number
  y: number
  originX: number
  originY: number
  active: number
  closest: Point[]
  textLabel: TextLabel
}

class TextLabel {
  pos: { x: number; y: number }
  size: number
  color: string
  active: number = 0

  constructor(pos: { x: number; y: number }, size: number, color: string) {
    this.pos = pos
    this.size = size
    this.color = color
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.active) return
    
    ctx.save()
    ctx.font = `bold ${this.size}px Arial`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = `rgba(3, 100, 200, ${this.active})`
    ctx.fillText('AI', this.pos.x, this.pos.y)
    ctx.restore()
  }
}

function LinesAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let width = window.innerWidth
    let height = window.innerHeight
    let target = { x: width / 2, y: height / 2 }
    let points: Point[] = []
    let animationFrameId: number
    let animateHeader = true

    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Initialize points grid (reduced to half)
    function initPoints() {
      points = []
      const gridSizeX = width / 12 // Reduced to half (doubled from 12 to 24)
      const gridSizeY = height / 12 // Reduced to half (doubled from 12 to 24)

      for (let x = 0; x < width; x += gridSizeX) {
        for (let y = 0; y < height; y += gridSizeY) {
          const px = x + Math.random() * gridSizeX
          const py = y + Math.random() * gridSizeY
          const p: Point = {
            x: px,
            originX: px,
            y: py,
            originY: py,
            active: 0,
            closest: [],
            textLabel: new TextLabel({ x: px, y: py }, 16 + Math.random() * 8, 'rgba(3, 100, 200, 0.3)')
          }
          points.push(p)
        }
      }

      // For each point, find the 3 closest points (max 3 lines per node)
      for (let i = 0; i < points.length; i++) {
        const closest: Point[] = []
        const p1 = points[i]

        for (let j = 0; j < points.length; j++) {
          const p2 = points[j]
          if (p1 !== p2) {
            let placed = false

            // Fill empty slots first
            for (let k = 0; k < 3; k++) {
              if (!placed && closest[k] === undefined) {
                closest[k] = p2
                placed = true
                break
              }
            }

            // Replace if closer
            if (!placed) {
              for (let k = 0; k < 3; k++) {
                if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                  closest[k] = p2
                  placed = true
                  break
                }
              }
            }
          }
        }

        p1.closest = closest
      }
    }

    // Get distance between two points
    function getDistance(p1: { x: number; y: number }, p2: { x: number; y: number }): number {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
    }

    // Draw lines from a point to its closest points
    function drawLines(p: Point) {
      if (!p.active || !ctx) return
      for (const closestPoint of p.closest) {
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(closestPoint.x, closestPoint.y)
        ctx.strokeStyle = `rgba(3, 100, 200, ${p.active})`
        ctx.stroke()
      }
    }

    // Animate point movement (replacement for TweenLite)
    function shiftPoint(p: Point) {
      const duration = 3000 + Math.random() * 2000 // 3-5 seconds (slower)
      const startX = p.x
      const startY = p.y
      const endX = p.originX - 50 + Math.random() * 100
      const endY = p.originY - 50 + Math.random() * 100
      const startTime = Date.now()

      function animate() {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Ease in-out circular function
        const ease = progress < 0.5
          ? 0.5 * (1 - Math.sqrt(1 - 4 * progress * progress))
          : 0.5 * (Math.sqrt(1 - 4 * (1 - progress) * (1 - progress)) + 1)

        p.x = startX + (endX - startX) * ease
        p.y = startY + (endY - startY) * ease
        p.textLabel.pos.x = p.x
        p.textLabel.pos.y = p.y

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          // Start next animation
          shiftPoint(p)
        }
      }

      animate()
    }

    // Main animation loop
    function animate() {
      if (animateHeader && ctx) {
        ctx.clearRect(0, 0, width, height)

        for (const point of points) {
          const distance = getDistance(target, point)

          // Base opacity for all lines (always visible)
          const baseOpacity = 0.05
          const baseTextOpacity = 0.1

          // Calculate opacity based on distance from cursor
          // Closer = higher opacity, farther = lower opacity (but never below base)
          let opacity = baseOpacity
          let textOpacity = baseTextOpacity

          if (distance < 4000) {
            // Very close to cursor - high opacity
            opacity = 0.3
            textOpacity = 0.6
          } else if (distance < 20000) {
            // Medium distance - medium-high opacity
            const factor = 1 - (distance - 4000) / 16000
            opacity = baseOpacity + (0.3 - baseOpacity) * factor
            textOpacity = baseTextOpacity + (0.6 - baseTextOpacity) * factor
          } else if (distance < 40000) {
            // Far distance - medium-low opacity
            const factor = 1 - (distance - 20000) / 20000
            opacity = baseOpacity + (0.15 - baseOpacity) * factor
            textOpacity = baseTextOpacity + (0.3 - baseTextOpacity) * factor
          } else {
            // Very far - base opacity (always visible)
            opacity = baseOpacity
            textOpacity = baseTextOpacity
          }

          point.active = opacity
          point.textLabel.active = textOpacity

          drawLines(point)
          if (ctx) {
            point.textLabel.draw(ctx)
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    // Event handlers
    function handleMouseMove(e: MouseEvent) {
      target.x = e.clientX
      target.y = e.clientY
    }

    function handleScroll() {
      // Keep animation running regardless of scroll position
      animateHeader = true
    }

    function handleResize() {
      if (!canvas) return
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      target = { x: width / 2, y: height / 2 }
      initPoints()

      // Restart animations for all points
      for (const point of points) {
        shiftPoint(point)
      }
    }

    // Initialize
    initPoints()
    animate()

    // Start point animations
    for (const point of points) {
      shiftPoint(point)
    }

    // Add event listeners
    if (!('ontouchstart' in window)) {
      window.addEventListener('mousemove', handleMouseMove)
    }
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
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
        pointerEvents: 'none',
        background: 'white'
      }}
    />
  )
}

export default LinesAnimation

