<template>
  <div
    class="max-h-screen mb-20px flex items-center justify-center bg-white px-6 py-2"
  >
    <form @submit.prevent="handleSubmit" class="form">
      <h1 class="text-4xl font-bold text-gray-800 text-center mb-6">
        🚀 Add New Rocket
      </h1>

      <div class="input-container">
        <label class="block text-gray-700 font-medium mb-2">Rocket Name</label>
        <input v-model="form.name" type="text" required class="input-inner" />
        <p v-if="errors.name" class="text-red-600 text-sm mt-1">
          {{ errors.name }}
        </p>
      </div>

      <div class="input-container">
        <label class="block text-gray-700 font-medium mb-2">Description</label>
        <textarea
          v-model="form.description"
          required
          class="input-inner"
        ></textarea>
        <p v-if="errors.name" class="text-red-600 text-sm mt-1">
          {{ errors.description }}
        </p>
      </div>

      <div class="input-container">
        <label class="block text-gray-700 font-medium mb-2">Image URL</label>
        <input v-model="form.image" type="url" required class="input-inner" />
        <p v-if="errors.name" class="text-red-600 text-sm mt-1">
          {{ errors.image }}
        </p>
      </div>

      <div class="input-container">
        <label class="block text-gray-700 font-medium mb-2"
          >Cost per Launch ($)</label
        >
        <input
          v-model.number="form.costPerLaunch"
          type="number"
          required
          class="input-inner"
        />
        <p v-if="errors.name" class="text-red-600 text-sm mt-1">
          {{ errors.costPerLaunch  }}
        </p>
      </div>

      <div class="input-container">
        <label class="block text-gray-700 font-medium mb-2">Country</label>
        <input
          v-model="form.country"
          type="text"
          required
          class="input-inner"
        />
        <p v-if="errors.name" class="text-red-600 text-sm mt-1">
          {{ errors.country  }}
        </p>
      </div>

      <!-- <div class="input-container">
        <label class="block text-gray-700 font-medium mb-2">First Flight</label>
        <input
          v-model="form.firstFlight"
          type="date"
          required
          class="input-inner"
        />
      </div> -->

      <div class="input-container">
        <label class="block text-gray-700 font-medium mb-2">First Flight</label>
        <div class="input-inner cursor-pointer" @click="focusDateInput">
          <input
            ref="dateInput"
            v-model="form.firstFlight"
            type="date"
            required
            class="date-component"
          />
        </div>
        <p v-if="errors.name" class="text-red-600 text-sm mt-1">
          {{ errors.firstFlight  }}
        </p>
      </div>

      <button type="submit" class="button" :disabled="rocketStore.isLoading">
        <span v-if="rocketStore.isLoading">Saving...</span>
        <span v-else>Save Rocket</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useRocketStore } from "@/stores/rocketStore";
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";

const rocketStore = useRocketStore();
const router = useRouter();
const errors = reactive<Record<string, string>>({});

const dateInput = ref<HTMLInputElement | null>(null);

function focusDateInput() {
  dateInput.value?.showPicker?.() || dateInput.value?.focus();
}

const form = reactive({
  name: "",
  description: "",
  image: "",
  costPerLaunch: 0,
  country: "",
  firstFlight: "",
});

function handleSubmit() {
  if (!validateForm()) return;

  rocketStore.addRocket({
    id: uuidv4(),
    ...form,
  });
  router.push("/");
}

function validateForm() {
  errors.name = form.name ? "" : "Rocket Name is required";
  errors.description = form.description ? "" : "Description is required";
  errors.image = form.image ? "" : "Image URL is required";
  errors.costPerLaunch =
    form.costPerLaunch > 0 ? "" : "Cost must be greater than 0";
  errors.country = form.country ? "" : "Country is required";
  errors.firstFlight = form.firstFlight ? "" : "First Flight is required";

  // return true jika semua error kosong
  return Object.values(errors).every((err) => err === "");
}
</script>

<style scoped>
.form {
  max-width: 100%;
  padding: 2rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 50%;
  justify-content: center;
}

.button {
  background-color: red;
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 2rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: white;
  font-weight: bold;
}

.input-inner {
  background-color: #dcdcdc;
  border: rgb(179, 174, 174) solid 1px;
  border-radius: 5px;
  padding: 4px;
  color: black;
  outline: none;
}

.date-component {
  outline: none;
  width: 100%;
  color: black;
}
</style>
