<script setup>
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import SkillsMarquee from './components/SkillsMarquee.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import Footer from './components/Footer.vue'
import InteractiveBackground from './components/InteractiveBackground.vue'
</script>

<template>
  <div class="antialiased min-h-screen relative overflow-x-hidden selection:bg-purple-500/30 selection:text-purple-200">
    
    <!-- Modern Starfield Background -->
    <InteractiveBackground />
    
    <Navbar />
    
    <main>
      <HeroSection />
      <SkillsMarquee />
      <ProjectsSection />
      <ContactSection />
    </main>
    
    <Footer />
  </div>
</template>
