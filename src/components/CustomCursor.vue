<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useMouse } from '@vueuse/core'

const { x, y } = useMouse()
const isHovering = ref(false)
const isVisible = ref(false)

// Lagging Cursor Logic
const cursorX = ref(0)
const cursorY = ref(0)
const LAG_FACTOR = 0.15 // 0.1 = Slow/Heavy, 0.3 = Fast/Light

let rafId = null

const updateCursor = () => {
    // Linear Interpolation (Lerp)
    cursorX.value += (x.value - cursorX.value) * LAG_FACTOR
    cursorY.value += (y.value - cursorY.value) * LAG_FACTOR
    
    rafId = requestAnimationFrame(updateCursor)
}

const checkHover = (e) => {
    const target = e.target
    // Check for clickable elements (including common parents)
    const clickable = target.closest('a') || target.closest('button') || target.closest('.cursor-pointer') || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'
    isHovering.value = !!clickable
}

// Global Listeners for Visibility & Hover
onMounted(() => {
    cursorX.value = x.value
    cursorY.value = y.value
    
    document.addEventListener('mouseover', checkHover)
    document.addEventListener('mouseenter', () => isVisible.value = true)
    document.addEventListener('mouseleave', () => isVisible.value = false)
    
    // Start Animation Loop
    updateCursor()
})

onUnmounted(() => {
    document.removeEventListener('mouseover', checkHover)
    if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <div class="pointer-events-none fixed inset-0 z-[999999] hidden md:block mix-blend-difference">
     
     <!-- Inner Dot (Instant) -->
     <div 
        class="fixed w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        :class="{ 'opacity-0': isHovering }" 
        :style="{ left: `${x}px`, top: `${y}px` }"
     ></div>

     <!-- Outer Ring (Lagging) -->
     <div 
        class="fixed border border-white rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-[width,height,background-color,border-color] duration-300 ease-out"
        :class="isHovering ? 'w-16 h-16 bg-white/20 border-transparent backdrop-blur-sm' : 'w-8 h-8 bg-transparent'"
        :style="{ left: `${cursorX}px`, top: `${cursorY}px` }"
     ></div>

  </div>
</template>

<style>
/* Hide Default Cursor ONLY on devices that support hover (Desktop) to prevent Mobile bugs */
@media (hover: hover) and (pointer: fine) {
    body, a, button, input, textarea {
        cursor: none !important;
    }
}
</style>
