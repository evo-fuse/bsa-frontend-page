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

class Spark {
  fromPoint: Point
  toPoint: Point
  progress: number = 0
  speed: number
  opacity: number = 1
  lineKey: string // Unique identifier for this line

  constructor(fromPoint: Point, toPoint: Point) {
    this.fromPoint = fromPoint
    this.toPoint = toPoint
    this.speed = 0.005 + Math.random() * 0.01 // Random speed between 0.005 and 0.015
    // Create unique key for this line (order-independent)
    const fromId = `${fromPoint.x.toFixed(2)}_${fromPoint.y.toFixed(2)}`
    const toId = `${toPoint.x.toFixed(2)}_${toPoint.y.toFixed(2)}`
    this.lineKey = fromId < toId ? `${fromId}_${toId}` : `${toId}_${fromId}`
  }

  update() {
    this.progress += this.speed
    if (this.progress >= 1) {
      // Remove spark when it reaches the end instead of resetting
      return true // Signal to remove this spark
    }
    return false
  }

  getPosition(): { x: number; y: number } {
    return {
      x: this.fromPoint.x + (this.toPoint.x - this.fromPoint.x) * this.progress,
      y: this.fromPoint.y + (this.toPoint.y - this.fromPoint.y) * this.progress
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const pos = this.getPosition()
    const minOpacity = Math.min(this.fromPoint.active, this.toPoint.active)
    
    ctx.save()
    // Draw glowing spark
    const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 4)
    gradient.addColorStop(0, `rgba(3, 100, 200, ${minOpacity * 0.8})`)
    gradient.addColorStop(0.5, `rgba(3, 100, 200, ${minOpacity * 0.4})`)
    gradient.addColorStop(1, `rgba(3, 100, 200, 0)`)
    
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, 4, 0, 2 * Math.PI)
    ctx.fill()
    
    // Draw bright center
    ctx.fillStyle = `rgba(255, 255, 255, ${minOpacity * 0.9})`
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, 1.5, 0, 2 * Math.PI)
    ctx.fill()
    
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
    let sparks: Spark[] = []
    let animationFrameId: number
    let animateHeader = true
    let lastSparkSpawn = Date.now()
    let lastConnectionUpdate = Date.now()
    const connectionUpdateInterval = 1000 // Update connections every 1 second
    let maxConnectionDistance = Math.min(width, height) * 0.25 // Maximum distance threshold for connections

    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Initialize points grid (reduced to half)
    function initPoints() {
      points = []
      const gridSizeX = width / 12
      const gridSizeY = height / 12

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

        // Collect all distances to other points
        const distances: Array<{ point: Point; distance: number }> = []
        for (let j = 0; j < points.length; j++) {
          const p2 = points[j]
          if (p1 !== p2) {
            distances.push({ point: p2, distance: getDistance(p1, p2) })
          }
        }

        // Sort by distance
        distances.sort((a, b) => a.distance - b.distance)

        // Take the 3 closest points
        for (let k = 0; k < Math.min(3, distances.length); k++) {
          closest.push(distances[k].point)
        }

        p1.closest = closest
        
        // Ensure bidirectional connections
        for (const closePoint of closest) {
          if (!closePoint.closest.includes(p1)) {
            // Only add if the other point doesn't already have 3 connections
            if (closePoint.closest.length < 3) {
              closePoint.closest.push(p1)
            }
          }
        }
      }
      
      // Final pass: ensure every node has at least 1 connection
      for (const point of points) {
        if (point.closest.length === 0) {
          // Find the single closest point
          let minDistance = Infinity
          let closestPoint: Point | null = null
          
          for (const other of points) {
            if (other !== point) {
              const dist = getDistance(point, other)
              if (dist < minDistance) {
                minDistance = dist
                closestPoint = other
              }
            }
          }
          
          if (closestPoint) {
            point.closest.push(closestPoint)
            // Ensure bidirectional
            if (!closestPoint.closest.includes(point)) {
              if (closestPoint.closest.length < 3) {
                closestPoint.closest.push(point)
              }
            }
          }
        }
      }
    }
    
    // Update connections dynamically - disconnect far nodes and connect to closer ones
    function updateConnections() {
      const maxDistSquared = maxConnectionDistance * maxConnectionDistance
      
      for (const point of points) {
        // Check current connections and remove ones that are too far
        for (let i = point.closest.length - 1; i >= 0; i--) {
          const connectedPoint = point.closest[i]
          const distanceSquared = getDistance(point, connectedPoint)
          
          if (distanceSquared > maxDistSquared) {
            // Disconnect - remove from both sides
            point.closest.splice(i, 1)
            const index = connectedPoint.closest.indexOf(point)
            if (index > -1) {
              connectedPoint.closest.splice(index, 1)
            }
          }
        }
        
        // If we have less than 3 connections, find closer nodes to connect to
        if (point.closest.length < 3) {
          // Get all other points sorted by distance
          const candidates: Array<{ point: Point; distance: number }> = []
          
          for (const other of points) {
            if (other !== point && !point.closest.includes(other)) {
              const distSquared = getDistance(point, other)
              if (distSquared <= maxDistSquared) {
                candidates.push({ point: other, distance: distSquared })
              }
            }
          }
          
          // Sort by distance
          candidates.sort((a, b) => a.distance - b.distance)
          
          // Connect to closest available nodes (up to 3 total)
          for (let i = 0; i < candidates.length && point.closest.length < 3; i++) {
            const candidate = candidates[i].point
            
            // Only connect if candidate also has less than 3 connections
            if (candidate.closest.length < 3) {
              point.closest.push(candidate)
              // Ensure bidirectional
              if (!candidate.closest.includes(point)) {
                candidate.closest.push(point)
              }
            }
          }
        }
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
          // Update origin for next movement
          p.originX = p.x
          p.originY = p.y
          // Start next animation
          shiftPoint(p)
        }
      }

      animate()
    }
    
    // Main animation loop
    function animate() {
      if (animateHeader && ctx) {
        // Update connections periodically as nodes move
        const currentTime = Date.now()
        if (currentTime - lastConnectionUpdate > connectionUpdateInterval) {
          updateConnections()
          lastConnectionUpdate = currentTime
        }
        
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

        // Count sparks per line
        const sparksPerLine = new Map<string, number>()
        for (const spark of sparks) {
          const count = sparksPerLine.get(spark.lineKey) || 0
          sparksPerLine.set(spark.lineKey, count + 1)
        }

        // Update and draw sparks, remove completed ones
        for (let i = sparks.length - 1; i >= 0; i--) {
          const spark = sparks[i]
          
          // Remove sparks if line is no longer active
          if (spark.fromPoint.active < 0.01 || spark.toPoint.active < 0.01) {
            sparks.splice(i, 1)
            continue
          }
          
          // Update spark and check if it should be removed
          const shouldRemove = spark.update()
          if (shouldRemove) {
            sparks.splice(i, 1)
            continue
          }
          
          if (ctx) {
            spark.draw(ctx)
          }
        }

        // Spawn new sparks periodically (max 1-2 per line)
        const now = Date.now()
        if (now - lastSparkSpawn > 300) { // Spawn every 300ms
          // Find active points and spawn sparks on their connections
          for (const point of points) {
            if (point.active > 0.1 && point.closest.length > 0) {
              for (const closestPoint of point.closest) {
                // Create line key for this connection
                const fromId = `${point.x.toFixed(2)}_${point.y.toFixed(2)}`
                const toId = `${closestPoint.x.toFixed(2)}_${closestPoint.y.toFixed(2)}`
                const lineKey = fromId < toId ? `${fromId}_${toId}` : `${toId}_${fromId}`
                
                // Check current spark count for this line
                const currentCount = sparksPerLine.get(lineKey) || 0
                
                // Spawn spark if line has less than 2 sparks and random chance
                if (currentCount < 2 && Math.random() < 0.15) { // 15% chance per line
                  sparks.push(new Spark(point, closestPoint))
                  sparksPerLine.set(lineKey, currentCount + 1)
                }
              }
            }
          }
          lastSparkSpawn = now
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
      // Update max connection distance based on new dimensions
      maxConnectionDistance = Math.min(width, height) * 0.25
      initPoints()
      sparks = [] // Clear sparks on resize

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

