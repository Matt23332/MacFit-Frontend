import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import api from '../services/api';
import router from '../router';

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token') ?? null)
    const user = ref(JSON.parse(localStorage.getItem('user')) ?? null)

    const isLoggedIn = computed(() => !!token.value)

    const logout = async () => {
        try {
            await api.post('/logout')
        } catch (err) {
            console.error(err);
        } finally {
            token.value = null
            user.value = null
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            router.push('/login')
        }
    }

    return { token, user, isLoggedIn, logout }
})