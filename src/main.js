import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

// Icons and Styles
import FontAwesomePlugin from './plugins/FontAwesome';
import './assets/main.pcss';

// App Wide Components
import AppButton from './components/AppButton.vue';
import AppCountInput from './components/AppCountInput.vue';
import AppModalOverlay from './components/AppModalOverlay.vue';

// Pinia Plugins
import { PiniaHistoryPlugin } from '@/plugins/PiniaHistoryPlugin';

// Init Pinia
const pinia = createPinia();
// Register Pinia history Plugin
pinia.use(PiniaHistoryPlugin);
// Init App
const app = createApp(App);
app
  .use(FontAwesomePlugin)
  .use(pinia)
  .component('AppButton', AppButton)
  .component('AppCountInput', AppCountInput)
  .component('AppModalOverlay', AppModalOverlay)
  .mount('#app');
