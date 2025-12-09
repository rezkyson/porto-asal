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
const roles = [config.personal.role, "ENGGINER STRESS", "SOFTWARE ENGINEER", "WEB3 ENTHUSIAST"]
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
             <img :src="config.personal.profileImage" class="w-full h-full rounded-full object-cover object-[50%_0%]" />
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
          <a href="https://wa.me/6282283306045" target="_blank" class="px-10 py-4 rounded-2xl border-2 border-white/10 text-white font-bold text-lg hover:bg-green-600/20 hover:border-green-500 transition-colors flex items-center justify-center gap-3">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="text-green-500"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
             Contact Me
          </a>
       </div>

    </div>
  </section>
</template>
