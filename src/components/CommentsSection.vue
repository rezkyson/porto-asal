<script setup>
import Giscus from '@giscus/vue'

// Note: To make this work, you need to:
// 1. Enable GitHub Discussions in your repo.
// 2. Install the Giscus App on your repo.
// 3. Get your repoId and categoryId from https://giscus.app
</script>

<template>
    <section id="comments" class="py-32 px-6 relative overflow-hidden">
        <!-- Background decoration -->
        <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl bg-gradient-to-b from-purple-900/0 via-purple-900/10 to-slate-900/0 -z-10 blur-3xl">
        </div>

        <div class="max-w-4xl mx-auto px-4 z-10 relative">
            <div class="text-center mb-16">
                <h2 class="text-sm font-bold tracking-[0.2em] text-purple-400 uppercase mb-4 opacity-80" v-motion
                    :initial="{ opacity: 0, y: 10 }" :visible="{ opacity: 0.8, y: 0 }">
                    Feedback
                </h2>
                <h3 class="text-4xl md:text-5xl font-bold font-display text-white" v-motion
                    :initial="{ opacity: 0, y: 20 }" :visible="{ opacity: 1, y: 0, transition: { delay: 100 } }">
                    Leave a <span class="text-purple-400">Message</span>
                </h3>
            </div>

            <!-- Modern Glass Container -->
            <div class="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden group"
                v-motion :initial="{ opacity: 0, y: 30 }" :visible="{ opacity: 1, y: 0, transition: { delay: 200 } }">
                <!-- Glow Effect -->
                <div
                    class="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-purple-500/30 transition-colors duration-500">
                </div>
                <div
                    class="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-cyan-500/30 transition-colors duration-500">
                </div>

                <Giscus id="comments" repo="rezkyson/porto-asal" repoId="R_kgDONGCeWg" category="General"
                    categoryId="DIC_kwDONGCeWs4Cjx9j" mapping="pathname" term="Welcome to my portfolio!"
                    reactionsEnabled="1" emitMetadata="0" inputPosition="top" theme="dark_dimmed" lang="en"
                    loading="lazy" />
            </div>
        </div>
    </section>
</template>
