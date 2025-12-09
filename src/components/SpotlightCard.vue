<script setup>
import { ref } from 'vue'
import { useMouseInElement } from '@vueuse/core'

const target = ref(null)
const { elementX, elementY } = useMouseInElement(target)
</script>

<template>
  <div ref="target" class="relative overflow-hidden rounded-2xl bg-white dark:bg-[#151621] border border-slate-200 dark:border-slate-800 hover:border-cyan-500/30 dark:hover:border-cyan-500/30 transition-colors duration-300 group h-full flex flex-col justify-between shadow-sm hover:shadow-xl dark:shadow-none">
    
    <!-- Subtle Spotlight on Dark Mode Only -->
    <div class="hidden dark:block absolute -inset-px bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
         :style="{ 
           background: `radial-gradient(800px circle at ${elementX}px ${elementY}px, rgba(56, 189, 248, 0.08), transparent 40%)` 
         }">
    </div>
    
    <div class="p-8 relative z-10 flex flex-col h-full justify-between">
      <slot></slot>
    </div>
  </div>
</template>
