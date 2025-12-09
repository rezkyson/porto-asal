<script setup>
import { config } from '../data/config.js'
</script>

<template>
  <footer class="relative z-10 pt-32 pb-12 px-4 border-t border-white/5 bg-[#020617]/50 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto">
      
      <!-- Big CTA Section -->
      <div class="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 mb-24">
         <div class="max-w-3xl">
            <h2 class="font-display font-bold text-6xl md:text-8xl lg:text-9xl text-white leading-[0.9] tracking-tighter mb-8">
              LET'S WORK <br />
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">TOGETHER</span>
            </h2>
            <a :href="'mailto:' + config.personal.email" class="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-blue-400 transition-colors group">
               <span>Drop me a line</span>
               <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
               </svg>
            </a>
         </div>
         
         <!-- Circular Badge (Optional decoration) -->
         <div class="hidden lg:flex w-40 h-40 rounded-full border border-white/10 items-center justify-center animate-[spin_10s_linear_infinite]">
            <svg viewBox="0 0 100 100" width="140" height="140">
              <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
              <text fill="white" font-size="12" letter-spacing="2">
                <textPath href="#circlePath" startOffset="0%">
                  OPEN FOR NEW OPPORTUNITIES • REACH OUT •
                </textPath>
              </text>
            </svg>
         </div>
      </div>

      <!-- Links & Info -->
      <div class="flex flex-col md:flex-row justify-between gap-10 border-t border-white/5 pt-12">
         
         <!-- Brand -->
         <div>
            <h3 class="font-display font-bold text-2xl text-white mb-4">{{ config.personal.name }}</h3>
            <p class="text-slate-400 max-w-xs">
              {{ config.personal.tagline }}
            </p>
         </div>

         <!-- Link Columns -->
         <div class="flex gap-16">
            <div>
               <h4 class="font-bold text-white mb-4 uppercase tracking-wider text-sm">Navigation</h4>
               <ul class="space-y-2 text-slate-400">
                  <li><a href="#" class="hover:text-blue-400 transition-colors">Home</a></li>
                  <li><a href="#projects" class="hover:text-blue-400 transition-colors">Work</a></li>
                  <li><a href="#skills" class="hover:text-blue-400 transition-colors">Arsenal</a></li>
                  <li><a href="#contact" class="hover:text-blue-400 transition-colors">Contact</a></li>
               </ul>
            </div>
            
            <div>
               <h4 class="font-bold text-white mb-4 uppercase tracking-wider text-sm">Socials</h4>
               <ul class="space-y-2 text-slate-400">
                  <li><a :href="config.personal.linkedin" target="_blank" class="hover:text-blue-400 transition-colors">LinkedIn</a></li>
                  <li><a :href="config.personal.github" target="_blank" class="hover:text-blue-400 transition-colors">GitHub</a></li>
                  <li><a href="#" class="hover:text-blue-400 transition-colors">Twitter</a></li>
                  <li><a href="#" class="hover:text-blue-400 transition-colors">Instagram</a></li>
               </ul>
            </div>
         </div>

      </div>

      <!-- Copyright -->
      <div class="mt-12 text-center md:text-left text-slate-600 text-sm">
         <p>&copy; {{ new Date().getFullYear() }} {{ config.personal.name }}. crafted with precision.</p>
      </div>

    </div>
  </footer>
</template>
