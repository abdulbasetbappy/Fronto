<template>
  <div class="relative inline-block text-left">
    <!-- Dropdown Button -->
    <button
      @click="toggleDropdown"
      class="inline-flex justify-between w-full my-1 px-2 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-transparent rounded-md shadow-sm focus:outline-none"
      id="currency-button"
    >
      <span>{{ selectedItem.label }}</span>
      <Icon
        :class="dropdownOpen ? 'rotate-180' : 'rotate-0'"
        name="line-md:chevron-down"
        class="w-5 h-5 ml-2 transition-all delay-300 ease-in-out"
      />
    </button>

    <!-- Dropdown Menu -->
    <div
      v-if="dropdownOpen"
      class="absolute right-0 z-10 mt-0 w-20 origin-top-right bg-white dark:bg-gray-950 border border-orange-100 dark:border-gray-900 text-gray-700 dark:text-gray-300 rounded-md shadow-lg"
    >
      <div class="py-0">
        <button
          v-for="item in items"
          :key="item.label"
          @click="selectMoods(item)"
          class="flex justify-around flex-row items-center w-full px-3 py-1 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 hover:rounded-md rounded-md focus:outline-none"
        >
          <span> {{ item.label }} </span>
          <Icon :name="item.symbol" class="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useThemeStore } from "~/store/themeStore";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

// Local state
const dropdownOpen = ref(false);
const selectedItem = ref(props.items[0]);

// Methods
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const themeStore = useThemeStore();
const selectMoods = (item) => {
  selectedItem.value = item;
  dropdownOpen.value = false;
  themeStore.setTheme(item.label);
  themeStore.saveThemeToLocalStorage(item.label);
};
</script>

<style scoped></style>
