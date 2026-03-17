<script setup>

import { ref, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const scrolled = ref(false);

const handleScroll = () => {
    scrolled.value = window.scrollY > 0;
}
onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<template>
    <v-app-bar color="#000000" dark :elevation="scrolled ? 4 : 0">
        <v-app-bar-title>MacFit</v-app-bar-title>

        <!--Visible when logged out-->
        <template v-if="!auth.isLoggedIn">
            <v-btn to="/login">Login</v-btn>
            <v-btn to="/signUp" color="#c8ff00" variant="flat">Sign Up</v-btn>
        </template>

        <!--Visible when logged in-->
        <template v-if="auth.isLoggedIn">
            <v-btn to="/homePage">Home</v-btn>
            <v-btn to="/bundles">Bundles</v-btn>
            <v-btn to="/gymLocations">Gym Locations</v-btn>
            <v-btn v-if="auth.user?.role?.name == 'admin'" to="/admin">Admin</v-btn>
            <v-btn icon="mdi-account">
                <v-icon>mdi-account</v-icon>
                <v-menu activator="parent">
                    <v-list bg-color="#111" border>
                        <v-list-item>
                            <v-btn variant="text" to="/profile" prepend-icon="mdi-account-outline">Profile</v-btn>
                        </v-list-item>
                        <v-list-item>
                            <v-btn variant="text" color="#ff6060" prepend-icon="mdi-logout" @click="auth.logout">Logout</v-btn>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-btn>
        </template>
    </v-app-bar>
</template>