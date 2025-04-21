<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-white p-6"
  >
    <h1 class="text-3xl font-bold mb-4 text-gray-800 text-center">
      🚀 Rocket List
    </h1>

    <!-- Search Input -->
    <div class="flex flex-col text-center p-5 mb-10">
      <input
        v-model="rocketStore.searchQuery"
        type="text"
        placeholder="Search rocket name..."
        class="input-inner"
      />
      <button @click="goToAddRocket" class="button">Add Rocket</button>
    </div>

    <!-- <router-link
      to="/AddRocket"
      class="button"
    >
      ➕ Add Rocket
    </router-link> -->

    <div v-if="rocketStore.loading" class="text-black text-center h-screen">
      Loading rockets...
    </div>

    <div
      v-else-if="rocketStore.filteredRockets.length === 0"
      class="text-gray-500 text-center mt-8 h-screen"
    >
      No rockets found.
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl"
    >
      <router-link
        v-for="rocket in rocketStore.filteredRockets.slice(0, 5)"
        :key="rocket.id"
        :to="`/${rocket.id}`"
        class="rocket-card no-underline"
      >
        <img
          :src="
            rocket.image || 'https://via.placeholder.com/300x200?text=No+Image'
          "
          alt="Rocket Image"
          class="rocket-image"
        />
        <div class="mt-4 text-center mb-5">
          <h2 class="text-xl font-semibold text-gray-800">
            {{ rocket.name }}
          </h2>
          <p class="description">
            {{ rocket.description }}
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRocketStore } from "@/stores/rocketStore";

import { useRouter } from "vue-router";

const router = useRouter();
const rocketStore = useRocketStore();

function goToAddRocket() {
  router.push("/AddRocket");
}

onMounted(() => {
  if (rocketStore.rockets.length === 0) {
    rocketStore.fetchRockets();
  }
});
</script>

<style scoped>
.rocket-card {
  @apply bg-white rounded-xl shadow-md p-4 transition-transform hover:scale-105;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rocket-image {
  width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 0.75rem;
}

.description {
  margin-top: 0.5rem;
  color: #4b5563;
  font-size: 14px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  text-align: justify;
}

.no-underline {
  text-decoration: none;
  color: inherit;
}

.button {
  background: green;
  padding: 10px;
  border-radius: 5px;
  color: white;
  margin-left: 15px;
}

.input-inner {
  background-color: #DCDCDC;
  border: rgb(179, 174, 174) solid 1px;
  border-radius: 5px;
  padding: 10px;
  color: black;
  outline: none;
  width: 400px;
}
</style>
