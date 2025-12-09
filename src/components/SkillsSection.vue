<script setup>
import { config } from '../data/config.js'

const getIconUrl = (iconName) => {
  const map = {
    go: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg',
    vite: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg',
    javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    vue: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg',
    tailwind: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
    git: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
    github: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
    server: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg'
  }
  return map[iconName] || ''
}
</script>

<template>
  <section id="skills" class="py-32 px-6 relative overflow-hidden">
     <!-- Background decoration -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl bg-gradient-to-b from-slate-900/0 via-slate-800/20 to-slate-900/0 -z-10 blur-3xl"></div>

    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-20">
        <h2 class="text-sm font-bold tracking-[0.2em] text-cyan-400 uppercase mb-4 opacity-80"
            v-motion
            :initial="{ opacity: 0, y: 10 }"
            :visible="{ opacity: 0.8, y: 0 }"
        >
          Tech Stack
        </h2>
        <h3 class="text-4xl md:text-5xl font-bold font-display"
             v-motion
             :initial="{ opacity: 0, y: 20 }"
             :visible="{ opacity: 1, y: 0, transition: { delay: 100 } }"
        >
          Tools I Use <span class="text-slate-600">&</span> Love
        </h3>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
        <div v-for="(skill, index) in config.skills" 
             :key="skill.name"
             class="group relative bg-slate-900/40 border border-white/5 rounded-2xl p-8 flex flex-col items-center gap-6 hover:bg-slate-800/60 transition-all duration-300 hover:-translate-y-1"
             v-motion
             :initial="{ opacity: 0, scale: 0.9 }"
             :visible="{ opacity: 1, scale: 1, transition: { delay: index * 50 } }"
        >
           <div class="w-16 h-16 relative">
              <div class="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img :src="getIconUrl(skill.icon)" :alt="skill.name" class="w-full h-full object-contain relative z-10 filter grayscale group-hover:grayscale-0 transition-all duration-300" />
           </div>
           
           <div class="text-center">
             <h4 class="font-bold text-slate-300 group-hover:text-white transition-colors">{{ skill.name }}</h4>
           </div>
           
           <!-- Bottom border gradient -->
           <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
        </div>
      </div>
    </div>
  </section>
</template>
