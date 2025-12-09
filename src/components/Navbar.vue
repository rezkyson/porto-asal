<script setup>
import { ref, onMounted, computed } from 'vue'
import { config } from '../data/config.js'
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 50)

const links = [
  { name: 'Home', href: '#' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' }
]

const isMobileMenuOpen = ref(false)
const hoverStyle = ref({})
const activeLink = ref(null)

const handleMouseEnter = (event) => {
  const { offsetLeft, offsetWidth } = event.target
  hoverStyle.value = {
    left: `${offsetLeft}px`,
    width: `${offsetWidth}px`,
    opacity: 1
  }
}

const handleMouseLeave = () => {
  hoverStyle.value = {
    ...hoverStyle.value,
    opacity: 0
  }
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500"
    :class="isScrolled ? 'pt-4' : 'pt-8'">
    <!-- Ultra-Premium Floating Dock -->
    <div class="relative flex items-center gap-2 px-2 py-2 rounded-full border transition-all duration-500" :class="[
      isScrolled
        ? 'bg-[#0B1120]/80 backdrop-blur-2xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] scale-90'
        : 'bg-transparent border-transparent'
    ]">

      <!-- Glass Background for Dock (Only visible when scrolled or distinct mode needed, actually let's keep it visible but subtle always for 'Premium' feel) -->
      <div v-if="!isScrolled"
        class="absolute inset-0 bg-white/5 backdrop-blur-md rounded-full border border-white/5 -z-10"></div>

      <!-- Logo Area -->
      <a href="#" class="pl-4 pr-6 flex items-center gap-2 group">
        <div
          class="relative w-8 h-8 flex items-center justify-center bg-gradient-to-tr from-blue-500 to-purple-600 rounded-lg overflow-hidden transition-transform duration-300 group-hover:rotate-12">
          <span class="text-white font-bold font-display text-sm">R</span>
        </div>
        <span
          class="font-display font-bold text-white tracking-widest text-sm group-hover:text-blue-300 transition-colors">
          {{ config.personal.name }}
        </span>
      </a>

      <!-- Desktop Spotlight Links -->
      <div class="hidden md:flex relative items-center bg-black/20 rounded-full p-1" @mouseleave="handleMouseLeave">

        <!-- Sliding Glow Pill -->
        <div
          class="absolute h-[85%] bg-white/10 rounded-full border border-white/5 transition-all duration-300 ease-out pointer-events-none shadow-[0_0_15px_rgba(100,100,255,0.3)]"
          :style="hoverStyle"></div>

        <a v-for="link in links" :key="link.name" :href="link.href" @mouseenter="handleMouseEnter"
          class="relative px-6 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors z-10">
          {{ link.name }}
        </a>
      </div>

      <!-- Call to Action (Mini) -->
      <a href="mailto:contact@rezky.com"
        class="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white text-black hover:scale-110 transition-transform ml-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </a>

      <!-- Mobile Menu Button -->
      <button @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="md:hidden p-3 text-white rounded-full hover:bg-white/10 transition-colors">
        <div class="w-5 h-4 flex flex-col justify-between">
          <span class="w-full h-0.5 bg-current transform transition-all"
            :class="isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''"></span>
          <span class="w-full h-0.5 bg-current transition-all" :class="isMobileMenuOpen ? 'opacity-0' : ''"></span>
          <span class="w-full h-0.5 bg-current transform transition-all"
            :class="isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''"></span>
        </div>
      </button>

    </div>

    <!-- Mobile Menu Overlay -->
    <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-4">
      <div v-if="isMobileMenuOpen"
        class="absolute top-24 left-4 right-4 bg-[#0B1120]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 flex flex-col gap-2 shadow-2xl md:hidden">
        <a v-for="link in links" :key="link.name" :href="link.href" @click="isMobileMenuOpen = false"
          class="flex items-center justify-between px-6 py-4 text-slate-300 hover:text-white hover:bg-white/5 rounded-2xl transition-all group">
          <span class="font-display font-bold text-lg">{{ link.name }}</span>
          <span
            class="w-2 h-2 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
        </a>
      </div>
    </Transition>
  </nav>
</template>
