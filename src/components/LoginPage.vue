<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <h2 class="text-2xl font-bold text-center text-gray-800">Login</h2>
            <form @submit.prevent="handleLogin" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" v-model="email" required
                        class="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="you@example.com" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" v-model="password" required
                        class="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="••••••••" />
                </div>
                <button type="submit"
                    class="w-full bg-blue-600 text-white font-semibold py-2 rounded-xl hover:bg-blue-700 transition">
                    Masuk
                </button>
            </form>

            <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");
const error = ref("");

const handleLogin = () => {
    if (!email.value || !password.value) {
        error.value = "Email dan password harus diisi.";
        return;
    }

    // Simulasi login (ganti dengan API call nanti)
    if (email.value === "admin@example.com" && password.value === "123456") {
        alert("Login berhasil!");
        error.value = "";
        // Lanjut ke halaman berikutnya
    } else {
        error.value = "Email atau password salah.";
    }
};
</script>
