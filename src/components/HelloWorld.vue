<script setup>
import { ref, onMounted } from "vue";

const name = ref("");
const email = ref("");
const data = ref([]);

const fetchData = async () => {
  const res = await fetch("https://script.google.com/macros/s/AKfycbzME3JPLbkY_n2hcdYStjQphu430jKicI9qiAfY7dVWgYVESyO-m7LSVpxqZaOsNIC2Ww/exec");
  data.value = await res.json();
};

const handleSubmit = async () => {
  await fetch("https://script.google.com/macros/s/YOUR_WEBAPP_ID/exec", {
    method: "POST",
    body: JSON.stringify({ name: name.value, email: email.value }),
    headers: { "Content-Type": "application/json" },
  });
  await fetchData(); // Refresh
};

onMounted(fetchData);
</script>

<template>
  <div class="p-4">
    <input v-model="name" placeholder="Name" class="border px-2 py-1 mr-2" />
    <input v-model="email" placeholder="Email" class="border px-2 py-1 mr-2" />
    <button @click="handleSubmit" class="bg-blue-500 text-white px-4 py-1">Submit</button>

    <ul class="mt-4">
      <li v-for="(item, i) in data" :key="i">{{ item.Name }} - {{ item.Email }}</li>
    </ul>
  </div>
</template>
