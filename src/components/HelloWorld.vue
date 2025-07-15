<script setup>
import { ref } from "vue";

const name = ref("");
const password = ref("");
const data = ref([]);
const apiUrl = import.meta.env.VITE_API_LINK;

const fetchData = async () => {
  const res = await fetch(apiUrl);
  data.value = await res.json();
};

const hashText = async (text) => {
  const encoder = new TextEncoder();
  const buffer = await crypto.subtle.digest("SHA-256", encoder.encode(text));
  return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, "0")).join("");
};

const handleSubmit = async () => {
  const hashedPassword = await hashText(password.value);

  const formData = new FormData();
  formData.append("Username", name.value);
  formData.append("Password", hashedPassword);

  await fetch(apiUrl, {
    method: "POST",
    body: formData,
  });

  await fetchData();
};

</script>

<template>
  <div class="p-4">
    <input v-model="name" placeholder="Name" class="border px-2 py-1 mr-2" />
    <input v-model="password" placeholder="password" class="border px-2 py-1 mr-2" />
    <button @click="handleSubmit" class="bg-blue-500 text-white px-4 py-1">Submit</button>

    <ul class="mt-4">
      <li v-for="(item, i) in data" :key="i">{{ item.Username }} - {{ item.Password }}</li>
    </ul>
  </div>
</template>
