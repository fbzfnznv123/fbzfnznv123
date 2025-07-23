<!-- src/layouts/MainLayout.vue -->
<template>
  <div class="big-card">
    <div class="navbar-card">
      <TheNavbar
        :locale="locale"
        :currentTheme="currentTheme"
        @toggle-language="toggleLanguage"
        @toggle-theme="toggleTheme"
      />
    </div>
    <router-view />
  </div>
</template>

<script setup>
import TheNavbar from "@/components/Navbar.vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const currentTheme = ref("light");

const toggleLanguage = () => {
  locale.value = locale.value === "en" ? "lo" : "en";
  document.body.classList.remove("eng", "lao");
  document.body.classList.add(locale.value === "en" ? "eng" : "lao");
};

const toggleTheme = () => {
  currentTheme.value = currentTheme.value === "light" ? "dark" : "light";
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
};
</script>

<style scoped>
.main-layout {
  background-color: #f9fafb;
  min-height: 100vh;
  padding: 2rem 1rem;
}

.big-card {
  width: 95vw;
  height: auto;
  margin: auto;
  margin-top: 1rem;
  padding: 24px;
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  gap: 16px;
}

.navbar-card {
  display: block;
}

@media (max-width: 1023px) {
  .navbar-card {
    display: none;
  }
}
</style>
