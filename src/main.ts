import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";
import axios from "axios";

axios.defaults.withCredentials = true;

const url = `${import.meta.env.VITE_APP_ROOT_AUTH}/authentication`;
axios
  .get(url)
  .then((response: any): void => {
    const app = createApp(App);
    registerPlugins(app);
    app.mount("#app");
    console.log(response.data);
  })
  .catch((e: any) => {
    const currentUrl = window.location.href;
    window.location.href = `${
      import.meta.env.VITE_APP_ROOT_AUTH
    }?redirect_url=${currentUrl}`;
  });
