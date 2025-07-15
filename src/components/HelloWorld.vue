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
  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("email", email.value);

  await fetch("https://script.google.com/macros/s/AKfycbzME3JPLbkY_n2hcdYStjQphu430jKicI9qiAfY7dVWgYVESyO-m7LSVpxqZaOsNIC2Ww/exec", {
    method: "POST",
    body: formData,
  });

  await fetchData();
};


onMounted(fetchData);
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
