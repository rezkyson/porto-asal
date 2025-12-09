<script setup>
import { config } from '../data/config.js'

const marqueeSkills = [...config.skills, ...config.skills, ...config.skills]

const getIconUrl = (iconName) => {
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${iconName}/${iconName}-original.svg`
}
</script>

<template>
  <section id="skills" class="py-24 relative overflow-hidden bg-transparent transition-colors duration-500">
    
    <div class="max-w-7xl mx-auto px-4 mb-12 text-center">
      <h2 class="text-3xl md:text-5xl font-display font-bold text-white mb-2">
        My <span class="text-gradient-premium">Skills</span>
      </h2>
      <p class="text-slate-400">Powered by modern technologies.</p>
    </div>

    <!-- Marquee -->
    <div class="relative z-0">
      <!-- Side Fades for infinite look -->
      <div class="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-[#0B1120] to-transparent z-10 pointer-events-none"></div>
      <div class="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-[#0B1120] to-transparent z-10 pointer-events-none"></div>

      <div class="flex gap-6 animate-marquee w-max py-4">
        <div 
          v-for="(skill, index) in marqueeSkills" 
          :key="index"
          class="w-32 h-32 md:w-36 md:h-36 flex flex-col items-center justify-center gap-3 md:gap-4 bg-[#151515] border border-white/5 rounded-2xl shadow-none hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:border-violet-500/30 transition-all duration-300 group cursor-default"
        >
          <img 
            :src="getIconUrl(skill.icon)" 
            :alt="skill.name" 
            class="w-10 h-10 md:w-14 md:h-14 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" 
          />
          <span class="text-xs md:text-sm font-bold text-slate-400 group-hover:text-white uppercase tracking-widest">{{ skill.name }}</span>
        </div>
      </div>
    </div>

  </section>
</template>

<style scoped>
html.dark .from-\[\#0A0A0A\] {
    --tw-gradient-from: #050505; /* Match global bg */
}

.animate-marquee {
  animation: marquee 50s linear infinite;
}
.animate-marquee:hover {
  animation-play-state: paused;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>
