<script setup>
import { ref, onMounted } from 'vue'
import { config } from '../data/config.js'

// --- Hacker Decode Effect for Name ---
const nameText = ref(config.personal.name)
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*"
const originalName = config.personal.name
let iterations = 0

const hackEffect = () => {
    const interval = setInterval(() => {
        nameText.value = originalName
            .split("")
            .map((letter, index) => {
                if (index < iterations) {
                    return originalName[index];
                }
                return alphabet[Math.floor(Math.random() * 26)];
            })
            .join("");

        if (iterations >= originalName.length) {
            clearInterval(interval);
        }

        iterations += 1 / 3;
    }, 30);
}

// Trigger effect on mount and periodically
onMounted(() => {
    hackEffect()
    setInterval(() => {
        iterations = 0;
        hackEffect();
    }, 5000); // Glitch every 5 seconds
})

// --- Typewriter for Role ---
const roles = [config.personal.role, "FULLSTACK ENG.", "CREATIVE DEV.", "WEB3 ENTHUSIAST"]
const currentRole = ref('')
const roleIndex = ref(0)
const charIndex = ref(0)
const isDeleting = ref(false)
const typeSpeed = 80
const deleteSpeed = 40
const pauseTime = 1500

const typeRole = () => {
  const currentFullRole = roles[roleIndex.value];
  
  if (isDeleting.value) {
    currentRole.value = currentFullRole.substring(0, charIndex.value - 1);
    charIndex.value--;
  } else {
    currentRole.value = currentFullRole.substring(0, charIndex.value + 1);
    charIndex.value++;
  }

  if (!isDeleting.value && charIndex.value === currentFullRole.length) {
    isDeleting.value = true;
    setTimeout(typeRole, pauseTime);
  } else if (isDeleting.value && charIndex.value === 0) {
    isDeleting.value = false;
    roleIndex.value = (roleIndex.value + 1) % roles.length;
    setTimeout(typeRole, 500);
  } else {
    setTimeout(typeRole, isDeleting.value ? deleteSpeed : typeSpeed);
  }
}

onMounted(() => {
  typeRole()
})
</script>

<template>
  <section class="min-h-screen flex flex-col items-center justify-center px-4 relative py-32">
    
    <div class="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center gap-10">
       
       <!-- Profile Photo -->
       <div class="relative group cursor-pointer" @mouseover="iterations=0; hackEffect()">
          <div class="absolute -inset-4 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div class="relative w-40 h-40 md:w-56 md:h-56 rounded-full p-2 bg-[#111111] shadow-2xl ring-1 ring-white/10">
             <img :src="config.personal.profileImage" class="w-full h-full rounded-full object-cover" />
          </div>
       </div>

       <!-- Dynamic Typography -->
       <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-mono text-blue-400">
             &lt;Hello_World /&gt;
          </h2>
          
          <h1 class="font-display font-extrabold tracking-tight leading-none text-white text-6xl md:text-9xl uppercase select-none"
              @mouseover="iterations=0; hackEffect()">
             {{ nameText }}
          </h1>
          
          <div class="h-10 flex items-center justify-center">
             <span class="px-4 py-2 rounded-md bg-white/5 border border-white/10 text-lg md:text-xl font-mono text-purple-300">
               {{ currentRole }}<span class="cursor-blink">_</span>
             </span>
          </div>
       </div>

       <p class="text-xl md:text-2xl text-slate-400 max-w-3xl leading-relaxed text-center font-light mt-4">
         {{ config.personal.about }}
       </p>

       <!-- Spaced Out Buttons -->
       <div class="flex flex-col sm:flex-row gap-6 pt-8 w-full justify-center">
          <a href="#projects" class="px-10 py-4 rounded-2xl bg-white text-black font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-white/5">
             See My Projects
          </a>
          <a href="#contact" class="px-10 py-4 rounded-2xl border-2 border-white/10 text-white font-bold text-lg hover:bg-white/5 transition-colors">
             Contact Me
          </a>
       </div>

    </div>
  </section>
</template>
