import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './i18n';
import './assets/styles/main.scss';

createApp(App)
  .use(i18n)
  .use(router)
  .mount('#app')

// Initialize theme
document.body.classList.add('light-theme', 'lao');
