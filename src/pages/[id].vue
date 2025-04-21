<template>
  <div class="min-h-screen flex flex-col items-center bg-white py-10 px-4">
    <div v-if="rocketStore.loading" class="text-gray-500 text-center">
      Loading rocket details...
    </div>

    <div
      v-else-if="rocket"
      class="max-w-3xl w-full bg-white rounded-xl shadow-md p-6"
    >
      <div>
        <h1 class="text-3xl font-bold mb-4 text-gray-800 text-center">
          🚀 Rocket List
        </h1>
      </div>
      <img
        :src="
          rocket.image || 'https://via.placeholder.com/600x300?text=No+Image'
        "
        alt="Rocket Image"
        class="w-full max-w-2xl h-72 object-cover rounded-lg mb-6 mx-auto"
      />
      <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ rocket.name }}</h1>
      <p class="text-gray-700 mb-4 text-justify">{{ rocket.description }}</p>
      <div class="text-sm text-gray-600 space-y-1">
        <p>
          <strong>🚀 Cost per Launch:</strong>
          ${{ rocket.costPerLaunch.toLocaleString() }}
        </p>
        <p><strong>🌍 Country:</strong> {{ rocket.country }}</p>
        <p><strong>📅 First Flight:</strong> {{ rocket.firstFlight }}</p>
      </div>
    </div>

    <div v-else class="text-gray-500">Rocket not found.</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useRocketStore } from "@/stores/rocketStore";

const route = useRoute();
const rocketStore = useRocketStore();

const rocket = computed(() => {
  return rocketStore.getRocketById(route.params.id as string);
});

onMounted(() => {
  if (!rocket.value) {
    rocketStore.fetchRockets();
  }
});
</script>
