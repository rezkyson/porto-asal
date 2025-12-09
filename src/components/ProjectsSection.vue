<script setup>
import { config } from '../data/config.js'
</script>

<template>
  <section id="projects" class="py-32 px-4 relative z-10 bg-transparent">
    <div class="max-w-7xl mx-auto">
      
      <!-- Section Header -->
      <div class="mb-16 text-center">
        <h2 class="text-3xl md:text-5xl font-display font-bold mb-4 text-white">
          Selected Works
        </h2>
        <div class="w-16 h-1 bg-blue-500 mx-auto rounded-full mb-4"></div>
        <p class="text-slate-400 max-w-xl mx-auto font-light text-sm md:text-base">
          Compact showcase of my latest engineering.
        </p>
      </div>

      <!-- Compact 3-Column Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div v-for="(project, index) in config.projects" :key="index" 
             class="group relative bg-[#0F1014] border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
           
           <!-- Compact Image Area -->
           <div class="relative h-48 overflow-hidden border-b border-white/5">
              <img :src="project.image" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              
              <!-- Hover Overlay -->
              <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <a :href="project.link" class="px-4 py-2 bg-white text-black text-xs font-bold rounded-full transform scale-90 group-hover:scale-100 transition-transform">
                    View Case Study
                 </a>
              </div>
           </div>

           <!-- Content Area -->
           <div class="p-5">
              <!-- Tech Tags -->
              <div class="flex flex-wrap gap-2 mb-3">
                <span v-for="tech in project.tech.slice(0, 3)" :key="tech" class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white/5 rounded border border-white/5">
                  {{ tech }}
                </span>
              </div>
              
              <h3 class="text-lg font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors">
                {{ project.title }}
              </h3>
              
              <p class="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                {{ project.description }}
              </p>
           </div>
           
        </div>

      </div>
    </div>
  </section>
</template>
