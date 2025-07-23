<template>
  <nav class="navbar">
    <div class="nav-links">
      <router-link to="/">{{ $t('nav.home') }}</router-link>
      <router-link to="/about">{{ $t('nav.about') }}</router-link>
      <router-link to="/member">{{ $t('nav.member') }}</router-link>
      <router-link to="/cross-border">{{ $t('nav.crossBorder') }}</router-link>
    </div>
    <div class="controls">
      <button @click="$emit('toggle-language')">
        {{ locale.value === 'en' ? 'LAO' : 'ENG' }}
      </button>
      <button @click="$emit('toggle-theme')">
        {{ currentTheme === 'light' ? '🌙' : '☀️' }}
      </button>
    </div>
  </nav>
</template>

<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  locale: {
    type: [Object, String], // Accept both Object (ref) and String (plain)
    required: true
  },
  currentTheme: String,
})
const { locale, currentTheme } = toRefs(props)
</script>

<style scoped lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--bg-1);

  .nav-links {
    display: flex;
    gap: 1rem;

    a {
      color: var(--primary);
      text-decoration: none;

      &.router-link-active {
        color: var(--accent);
        font-weight: bold;
      }
    }
  }

  .controls {
    display: flex;
    gap: 0.5rem;

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      background: var(--primary);
      color: white;
      cursor: pointer;

      &:hover {
        background: var(--accent);
      }
    }
  }
}
</style>
