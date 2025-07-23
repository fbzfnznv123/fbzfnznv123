<template>
  <router-view />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const currentTheme = ref('light')

// Set initial theme and language class on mount
onMounted(() => {
  document.body.classList.add(currentTheme.value === 'light' ? 'light-theme' : 'dark-theme')
  document.body.classList.add(locale.value === 'en' ? 'eng' : 'lao')
})

// Watch for theme changes and update body class
watch(currentTheme, (newTheme, oldTheme) => {
  document.body.classList.remove(oldTheme === 'light' ? 'light-theme' : 'dark-theme')
  document.body.classList.add(newTheme === 'light' ? 'light-theme' : 'dark-theme')
})

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'lo' : 'en'
  document.body.classList.remove('eng', 'lao')
  document.body.classList.add(locale.value === 'en' ? 'eng' : 'lao')
}

const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
}
</script>
