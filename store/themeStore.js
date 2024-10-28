// stores/themeStore.js
import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: 'Light',
  }),
  actions: {
    setTheme(mode) {
      this.theme = mode;
      // Update the HTML class for Tailwind's dark mode
      if (mode === 'Dark') {
        document.documentElement.classList.add('dark');
        this.saveThemeToLocalStorage('Dark');
      } else {
        document.documentElement.classList.remove('dark');
        this.saveThemeToLocalStorage('Light');
      }
    },
  },
});
