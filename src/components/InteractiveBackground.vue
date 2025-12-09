<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useWindowSize, useMouse } from '@vueuse/core'

const canvas = ref(null)
const { width, height } = useWindowSize()
const { x: mouseX, y: mouseY } = useMouse()

let ctx = null
let animationFrameId = null
let crystals = []

// WEB3 CONFIG
const COUNT = 15
const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4'] // Indigo, Violet, Pink, Cyan

class Crystal {
  constructor() {
    this.init()
  }

  init() {
    this.x = Math.random() * window.innerWidth
    this.y = Math.random() * window.innerHeight
    this.size = Math.random() * 60 + 20
    this.speedX = (Math.random() - 0.5) * 0.2
    this.speedY = (Math.random() - 0.5) * 0.2
    this.rotation = Math.random() * Math.PI * 2
    this.uRotation = (Math.random() - 0.5) * 0.005
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
    this.opacity = Math.random() * 0.5 + 0.1
    this.depth = Math.random() * 2 + 0.5 // For Parallax
    this.vertices = Math.floor(Math.random() * 3) + 3 // Triangles (3) to Pentagons (5)
  }

  update() {
    // Continuous Rotation
    this.rotation += this.uRotation

    // Float
    this.x += this.speedX
    this.y += this.speedY

    // Mouse Parallax (3D feel)
    // Move opposite to mouse based on depth
    const mx = (mouseX.value - window.innerWidth/2) * 0.02 * this.depth
    const my = (mouseY.value - window.innerHeight/2) * 0.02 * this.depth
    
    // Boundary Wrap
    if (this.x < -100) this.x = window.innerWidth + 100
    if (this.x > window.innerWidth + 100) this.x = -100
    if (this.y < -100) this.y = window.innerHeight + 100
    if (this.y > window.innerHeight + 100) this.y = -100

    this.drawX = this.x + mx
    this.drawY = this.y + my
  }

  draw() {
    ctx.save()
    ctx.translate(this.drawX, this.drawY)
    ctx.rotate(this.rotation)
    
    ctx.beginPath()
    const angleStep = (Math.PI * 2) / this.vertices
    for (let i = 0; i < this.vertices; i++) {
        const vx = Math.cos(i * angleStep) * this.size
        const vy = Math.sin(i * angleStep) * this.size
        if (i === 0) ctx.moveTo(vx, vy)
        else ctx.lineTo(vx, vy)
    }
    ctx.closePath()

    // Glass Style: Stroke + Faint Fill
    ctx.strokeStyle = this.color
    ctx.lineWidth = 1.5
    ctx.stroke()
    
    ctx.fillStyle = this.color
    ctx.globalAlpha = this.opacity * 0.1 // Very transparent fill
    ctx.fill()
    
    // Inner reflection line for detail
    ctx.beginPath()
    ctx.moveTo(0,0)
    ctx.lineTo(Math.cos(0)*this.size, Math.sin(0)*this.size)
    ctx.strokeStyle = 'rgba(255,255,255,0.2)'
    ctx.stroke()

    ctx.restore()
  }
}

const init = () => {
  if (!canvas.value) return
  ctx = canvas.value.getContext('2d')
  crystals = Array.from({ length: COUNT }, () => new Crystal())
  resize()
  animate()
}

const resize = () => {
  if (!canvas.value) return
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
}

const animate = () => {
  if (!ctx) return
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  // Subtle connection lines (Network)
  ctx.lineWidth = 0.5
  ctx.strokeStyle = 'rgba(255,255,255,0.05)'
  for (let i = 0; i < crystals.length; i++) {
      for (let j = i + 1; j < crystals.length; j++) {
          const dx = crystals[i].drawX - crystals[j].drawX
          const dy = crystals[i].drawY - crystals[j].drawY
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < 200) {
              ctx.beginPath()
              ctx.moveTo(crystals[i].drawX, crystals[i].drawY)
              ctx.lineTo(crystals[j].drawX, crystals[j].drawY)
              ctx.stroke()
          }
      }
  }

  crystals.forEach(c => {
    c.update()
    c.draw()
  })

  animationFrameId = requestAnimationFrame(animate)
}

onMounted(() => {
  init()
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', resize)
})
</script>

<template>
  <div class="fixed inset-0 z-0 pointer-events-none bg-[#0a0a0a]">
      <!-- Deep Dark base -->
      <canvas ref="canvas" class="absolute inset-0 w-full h-full"></canvas>
      
      <!-- Gradient Glows for Atmosphere -->
      <div class="absolute top-0 left-0 w-[50vw] h-[50vh] bg-purple-900/10 blur-[100px] rounded-full"></div>
      <div class="absolute bottom-0 right-0 w-[50vw] h-[50vh] bg-blue-900/10 blur-[100px] rounded-full"></div>
  </div>
</template>
