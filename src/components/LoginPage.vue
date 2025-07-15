<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <h2 class="text-2xl font-bold text-center text-gray-800">Login</h2>
            <form @submit.prevent="handleLogin" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Username</label>
                    <input type="text" v-model="username" required
                        class="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Username" />
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

const username = ref("");
const password = ref("");
const error = ref("");
const apiUrl = import.meta.env.VITE_API_LINK;



const handleLogin = async () => {
    const sha256 = async (text) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    };

    if (!username.value || !password.value) {
        error.value = "Username/Password wajib diisi";
        return;
    }

    const hashedPassword = await sha256(password.value);
    alert(`Hashed Password: ${hashedPassword}`);
    const params = new URLSearchParams();
    params.append("action", "login");
    params.append("username", username.value);
    params.append("password", hashedPassword);

    try {
        const res = await fetch(apiUrl, {
            method: "POST",
            body: params,
        });

        const result = await res.json();

        if (result.status === "success") {
            alert("Login berhasil!");
            error.value = "";
            // Redirect or change route
        } else {
            error.value = result.message || "Login gagal";
        }
    } catch (err) {
        error.value = "Gagal koneksi ke server";
    }
};

</script>
