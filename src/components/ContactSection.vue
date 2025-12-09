<script setup>
import { config } from '../data/config.js'
import { Mail, Github, Linkedin } from 'lucide-vue-next'
</script>

<template>
  <section id="contact" class="py-24 px-6 relative overflow-hidden">
    <!-- Footer glow -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-8"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      >
        Get In <span class="text-cyan-400">Touch</span>
      </h2>

      <p class="text-slate-400 mb-12 text-lg">
        Interested in working together? Feel free to reach out directly.
      </p>

      <div class="flex flex-col md:flex-row items-center justify-center gap-6 mb-20"
           v-motion
           :initial="{ opacity: 0, scale: 0.9 }"
           :visible="{ opacity: 1, scale: 1, transition: { delay: 200 } }"
      >
        <a :href="'mailto:' + config.personal.email" class="glass-card px-8 py-4 rounded-xl flex items-center gap-3 hover:bg-slate-800 hover:border-cyan-500/50 transition-all group">
          <Mail class="w-5 h-5 text-cyan-400" />
          <span class="text-slate-200 group-hover:text-white">{{ config.personal.email }}</span>
        </a>
        
        <div class="flex gap-4">
          <a :href="config.personal.github" target="_blank" class="p-4 rounded-xl glass-card hover:bg-slate-800 hover:border-purple-500/50 transition-all text-slate-400 hover:text-white">
            <Github class="w-6 h-6" />
          </a>
          <a :href="config.personal.linkedin" target="_blank" class="p-4 rounded-xl glass-card hover:bg-slate-800 hover:border-blue-500/50 transition-all text-slate-400 hover:text-white">
            <Linkedin class="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
