<template>
  <nav class="w-full hidden md:block border-b border-gray-200 dark:border-gray-700">
    <div class="container mx-auto flex justify-center items-center px-4 py-2">
      <div class="flex space-x-6">
        <NuxtLink
          v-for="category in categories"
          :key="category.name"
          :to="category.link"
          class="relative group"
          @mouseenter="showDropdown(category.name)"
          @mouseleave="hideDropdown"
        >
          <span
            :class="{
              'text-orange-600': isActive(category.link) || isDropdownVisible(category.name),
              'text-gray-800 dark:text-gray-400': !(isActive(category.link) || isDropdownVisible(category.name))
            }"
            class="mx-2 font-normal text-base transition-colors duration-200"
          >
            {{ category.name }}
          </span>
          <div
            class="absolute left-0 h-[0.15rem] bg-orange-600 transition-all rounded-sm duration-300 ease-in-out transform origin-left"
            :class="{
              'w-full': isActive(category.link) || isDropdownVisible(category.name),
              'w-0': !(isActive(category.link) || isDropdownVisible(category.name))
            }"
          ></div>
          <div
            v-if="category.subcategories"
            class="absolute left-0 top-7 hidden bg-gray-100 dark:bg-gray-950 focus:outline-none w-36 text-gray-800 dark:text-gray-400 shadow-lg rounded-lg border dark:border-gray-900 group-hover:block transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-50"
          >
            <transition name="fade">
              <div
                class="py-0 rounded-lg hover:rounded-lg"
                v-show="isDropdownVisible(category.name)"
                @mouseleave="hideDropdown"
              >
                <NuxtLink
                  v-for="subcategory in category.subcategories"
                  :key="subcategory.name"
                  :to="subcategory.link"
                  class="block px-4 py-2 hover:rounded-lg hover:bg-gray-200 dark:hover:bg-gray-900 dark:hover:bg-opacity-25 rounded-lg"
                >
                  {{ subcategory.name }}
                </NuxtLink>
              </div>
            </transition>
          </div>
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router'; // Import useRoute to access the current route

const categories = [
  { name: "Home", link: "/" },
  {
    name: "Men's",
    link: "/mens",
    subcategories: [
      { name: "Shoes", link: "/mens/shoes" },
      { name: "Clothing", link: "/mens/clothing" },
      { name: "Accessories", link: "/mens/accessories" },
      { name: "Grooming", link: "/mens/grooming" },
      { name: "Bags", link: "/mens/bags" },
    ],
  },
  {
    name: "Women's",
    link: "/womens",
    subcategories: [
      { name: "Shoes", link: "/womens/shoes" },
      { name: "Clothing", link: "/womens/clothing" },
      { name: "Accessories", link: "/womens/accessories" },
      { name: "Beauty", link: "/womens/beauty" },
      { name: "Bags", link: "/womens/bags" },
    ],
  },
  {
    name: "Jewelry",
    link: "/jewelry",
    subcategories: [
      { name: "Necklaces", link: "/jewelry/necklaces" },
      { name: "Bracelets", link: "/jewelry/bracelets" },
      { name: "Earrings", link: "/jewelry/earrings" },
      { name: "Rings", link: "/jewelry/rings" },
      { name: "Watches", link: "/jewelry/watches" },
    ],
  },
  {
    name: "Perfume",
    link: "/perfume",
    subcategories: [
      { name: "Men's Fragrances", link: "/perfume/mens" },
      { name: "Women's Fragrances", link: "/perfume/womens" },
      { name: "Unisex Fragrances", link: "/perfume/unisex" },
      { name: "Travel Sizes", link: "/perfume/travel-sizes" },
      { name: "Gift Sets", link: "/perfume/gift-sets" },
    ],
  },
  { name: "Blog", link: "/blog" },
  { name: "Hot Offers", link: "/offers" },
];

const visibleDropdown = ref(null);
const route = useRoute(); // Access the current route

const showDropdown = (categoryName) => {
  visibleDropdown.value = categoryName;
};

const hideDropdown = () => {
  visibleDropdown.value = null;
};

const isDropdownVisible = (categoryName) => {
  return visibleDropdown.value === categoryName;
};

// Function to check if the route is active
const isActive = (link) => {
  return route.path === link;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
