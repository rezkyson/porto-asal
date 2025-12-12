<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from '../lib/supabase'

const comments = ref([])
const name = ref('')
const message = ref('')
const isLoading = ref(false)
const error = ref('')
const successMessage = ref('')

// Demo data for initial view
const demoComments = [
    { id: 1, name: 'Visitor', message: 'This guestbook is waiting for your Supabase connection!', created_at: new Date().toISOString() },
    { id: 2, name: 'Developer', message: 'You can configure the database to save real comments here.', created_at: new Date(Date.now() - 86400000).toISOString() }
]

// Get initials from name (first letter, or first two if multiple words)
const getInitials = (nameStr) => {
    if (!nameStr) return '?'
    const words = nameStr.trim().split(' ')
    if (words.length >= 2) {
        return (words[0][0] + words[1][0]).toUpperCase()
    }
    return nameStr.charAt(0).toUpperCase()
}

// Generate consistent color based on name
const getAvatarColor = (nameStr) => {
    const colors = [
        'from-purple-500 to-pink-500',
        'from-blue-500 to-cyan-500',
        'from-green-500 to-emerald-500',
        'from-orange-500 to-amber-500',
        'from-rose-500 to-red-500',
        'from-indigo-500 to-violet-500',
        'from-teal-500 to-green-500',
        'from-fuchsia-500 to-purple-500',
    ]
    let hash = 0
    for (let i = 0; i < nameStr.length; i++) {
        hash = nameStr.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
}

const fetchComments = async () => {
    try {
        const { data, error: fetchError } = await supabase
            .from('comments')
            .select('*')
            .order('created_at', { ascending: false })

        if (fetchError) throw fetchError
        comments.value = data || []
    } catch (err) {
        console.warn('Supabase not connected or table missing. Showing demo data.')
        comments.value = demoComments
    }
}

const submitComment = async () => {
    if (!name.value.trim() || !message.value.trim()) return

    isLoading.value = true
    error.value = ''
    successMessage.value = ''

    try {
        const newComment = {
            name: name.value,
            message: message.value,
        }

        const { error: insertError } = await supabase
            .from('comments')
            .insert([newComment])

        if (insertError) throw insertError

        // Reset form and reload
        name.value = ''
        message.value = ''
        successMessage.value = 'Message sent successfully! ✨'
        setTimeout(() => successMessage.value = '', 3000)
        await fetchComments()
    } catch (err) {
        console.error('Error submitting:', err)
        error.value = 'Failed to send. Please try again later.'
        // Fallback: Add to local list for demo feel
        const newComment = {
            id: Date.now(),
            name: name.value,
            message: message.value,
            created_at: new Date().toISOString()
        }
        comments.value.unshift(newComment)
        name.value = ''
        message.value = ''
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    fetchComments()
})

const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    
    return date.toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
    })
}
</script>

<template>
    <section id="guestbook" class="py-24 md:py-32 px-4 md:px-6 relative overflow-hidden">
        <!-- Background decorations -->
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div class="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]"></div>
            <div class="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]"></div>
        </div>

        <div class="max-w-5xl mx-auto z-10 relative">
            <!-- Header -->
            <div class="text-center mb-12 md:mb-16">
                <div class="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6"
                    v-motion :initial="{ opacity: 0, y: 10 }" :visible="{ opacity: 1, y: 0 }">
                    <span class="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                    <span class="text-sm font-medium text-purple-300">Guestbook</span>
                </div>
                <h3 class="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white mb-4" v-motion
                    :initial="{ opacity: 0, y: 20 }" :visible="{ opacity: 1, y: 0, transition: { delay: 100 } }">
                    Leave Your <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Mark</span>
                </h3>
                <p class="text-slate-400 max-w-md mx-auto text-sm md:text-base" v-motion
                    :initial="{ opacity: 0, y: 20 }" :visible="{ opacity: 1, y: 0, transition: { delay: 150 } }">
                    Share your thoughts, say hello, or just leave a virtual signature!
                </p>
            </div>

            <!-- Main Content Grid -->
            <div class="grid lg:grid-cols-5 gap-6 md:gap-8">
                <!-- Form Column -->
                <div class="lg:col-span-2 order-2 lg:order-1">
                    <div class="sticky top-8">
                        <div class="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden group"
                            v-motion :initial="{ opacity: 0, x: -30 }"
                            :visible="{ opacity: 1, x: 0, transition: { delay: 200 } }">
                            
                            <!-- Decorative gradient border -->
                            <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                            
                            <div class="flex items-center gap-3 mb-6">
                                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </div>
                                <h4 class="text-xl font-bold text-white">Sign the Book</h4>
                            </div>

                            <form @submit.prevent="submitComment" class="space-y-5">
                                <div class="space-y-2">
                                    <label class="block text-sm font-medium text-slate-300">Your Name</label>
                                    <div class="relative">
                                        <input v-model="name" type="text" placeholder="Enter your name"
                                            class="w-full bg-slate-800/60 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-500"
                                            required />
                                    </div>
                                </div>

                                <div class="space-y-2">
                                    <label class="block text-sm font-medium text-slate-300">Your Message</label>
                                    <textarea v-model="message" rows="4" placeholder="Write something nice..."
                                        class="w-full bg-slate-800/60 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-500 resize-none"
                                        required></textarea>
                                </div>

                                <button type="submit" :disabled="isLoading"
                                    class="w-full relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3.5 rounded-xl transition-all transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group">
                                    <span class="relative z-10 flex items-center justify-center gap-2">
                                        <svg v-if="isLoading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>{{ isLoading ? 'Sending...' : 'Send Message' }}</span>
                                        <svg v-if="!isLoading" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                </button>

                                <!-- Success/Error Messages -->
                                <transition name="fade">
                                    <p v-if="successMessage" class="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-2">
                                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                        </svg>
                                        {{ successMessage }}
                                    </p>
                                </transition>
                                <transition name="fade">
                                    <p v-if="error" class="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
                                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                                        </svg>
                                        {{ error }}
                                    </p>
                                </transition>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Comments List Column -->
                <div class="lg:col-span-3 order-1 lg:order-2" v-motion
                    :initial="{ opacity: 0, x: 30 }" :visible="{ opacity: 1, x: 0, transition: { delay: 300 } }">
                    
                    <!-- Comments count -->
                    <div class="flex items-center justify-between mb-6">
                        <h4 class="text-lg font-semibold text-white flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            Messages
                            <span class="text-sm font-normal text-slate-400">({{ comments.length }})</span>
                        </h4>
                    </div>

                    <!-- Comments List -->
                    <div class="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                        <transition-group name="list">
                            <div v-for="(comment, index) in comments" :key="comment.id"
                                class="comment-card group bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-lg border border-white/5 rounded-2xl p-5 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300"
                                :style="{ animationDelay: `${index * 50}ms` }">
                                
                                <div class="flex gap-4">
                                    <!-- Avatar -->
                                    <div class="flex-shrink-0">
                                        <div :class="['w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-lg shadow-lg', getAvatarColor(comment.name)]">
                                            {{ getInitials(comment.name) }}
                                        </div>
                                    </div>
                                    
                                    <!-- Content -->
                                    <div class="flex-1 min-w-0">
                                        <div class="flex flex-wrap items-center gap-2 mb-2">
                                            <h5 class="font-semibold text-white truncate">{{ comment.name }}</h5>
                                            <span class="text-xs text-slate-500 flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {{ formatDate(comment.created_at) }}
                                            </span>
                                        </div>
                                        <p class="text-slate-300 text-sm leading-relaxed">{{ comment.message }}</p>
                                    </div>
                                </div>
                            </div>
                        </transition-group>

                        <!-- Empty State -->
                        <div v-if="comments.length === 0" class="text-center py-16">
                            <div class="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h4 class="text-lg font-semibold text-white mb-2">No messages yet</h4>
                            <p class="text-slate-400 text-sm">Be the first to leave a message!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.02);
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, rgba(139, 92, 246, 0.4), rgba(236, 72, 153, 0.4));
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, rgba(139, 92, 246, 0.6), rgba(236, 72, 153, 0.6));
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.list-enter-active {
    animation: slideIn 0.4s ease-out;
}

.list-leave-active {
    animation: slideOut 0.3s ease-in;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideOut {
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(20px);
    }
}

.comment-card {
    animation: fadeInUp 0.5s ease-out both;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive adjustments */
@media (max-width: 640px) {
    .comment-card {
        padding: 1rem;
    }
}
</style>
