<script setup>
import { ref } from "vue";

const name = ref("");
const email = ref("");
const data = ref([]);

const fetchData = async () => {
  const res = await fetch("https://script.google.com/macros/s/AKfycbzME3JPLbkY_n2hcdYStjQphu430jKicI9qiAfY7dVWgYVESyO-m7LSVpxqZaOsNIC2Ww/exec");
  data.value = await res.json();
};

const hashText = async (text) => {
  const encoder = new TextEncoder();
  const buffer = await crypto.subtle.digest("SHA-256", encoder.encode(text));
  return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, "0")).join("");
};

const handleSubmit = async () => {
  const hashedName = await hashText(name.value);
  const hashedEmail = await hashText(email.value);

  const formData = new FormData();
  formData.append("name", hashedName);
  formData.append("email", hashedEmail);

  await fetch("https://script.google.com/macros/s/AKfycbzME3JPLbkY_n2hcdYStjQphu430jKicI9qiAfY7dVWgYVESyO-m7LSVpxqZaOsNIC2Ww/exec", {
    method: "POST",
    body: formData,
  });

  await fetchData();
};

</script>

<template>
  <div class="p-4">
    <input v-model="name" placeholder="Name" class="border px-2 py-1 mr-2" />
    <input v-model="email" placeholder="Email" class="border px-2 py-1 mr-2" />
    <button @click="handleSubmit" class="bg-blue-500 text-white px-4 py-1">Submit</button>

    <ul class="mt-4">
      <li v-for="(item, i) in data" :key="i">{{ item.Username }} - {{ item.Password }}</li>
    </ul>
  </div>
</template>
