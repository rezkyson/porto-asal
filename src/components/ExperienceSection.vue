<script setup>
import { config } from '../data/config.js'
import { ref } from 'vue'

const experiences = config.experience
</script>

<template>
  <section id="experience" class="py-32 px-4 relative z-10">
    <div class="max-w-6xl mx-auto">
      
      <!-- Section Header -->
      <div class="mb-20 text-center" v-motion-slide-visible-once-bottom>
        <h2 class="text-3xl md:text-5xl font-display font-bold mb-4 text-white">
          Journey & <span class="text-blue-500">Milestones</span>
        </h2>
        <div class="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-6"></div>
        <p class="text-slate-400 max-w-xl mx-auto font-light text-lg">
          My professional path and educational background.
        </p>
      </div>

      <!-- Experience Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        
        <!-- Center Line for Desktop -->
        <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent -translate-x-1/2"></div>

        <div v-for="(exp, index) in experiences" :key="index" 
             class="relative group"
             v-motion
             :initial="{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }"
             :visible="{ opacity: 1, x: 0, transition: { duration: 600, delay: index * 100 } }"
        >
           <!-- Dot on Line -->
           <div class="hidden md:block absolute top-8 w-4 h-4 rounded-full border-2 border-blue-500 bg-[#0B1120] z-10 transition-colors group-hover:bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                :class="index % 2 === 0 ? '-right-[1.6rem]' : '-left-[1.6rem]'"
           ></div>

           <!-- Card -->
           <div class="relative p-8 rounded-3xl border border-white/5 bg-[#0F1014]/80 backdrop-blur-xl hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 group-hover:bg-[#15161A]"
                :class="index % 2 !== 0 ? 'md:mt-24' : ''"
           >
              <!-- Icon/Badge based on type -->
              <div class="absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-white/5"
                   :class="exp.type === 'work' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-purple-500/10 text-purple-400 border-purple-500/20'">
                {{ exp.type === 'work' ? 'Work' : 'Education' }}
              </div>

              <div class="text-sm font-mono text-slate-500 mb-2">{{ exp.period }}</div>
              <h3 class="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{{ exp.title }}</h3>
              <div class="text-lg text-slate-400 font-medium mb-4">{{ exp.company }}</div>
              <p class="text-slate-400 leading-relaxed text-sm md:text-base">
                {{ exp.description }}
              </p>
           </div>
        </div>
      </div>
    </div>
  </section>
</template>
