import App from "./App.vue";
import { createApp } from "vue";
import { registerPlugins } from "@/plugins";
import router from "@/router";
import stores from "./store";

const app = createApp(App);

const { authStore } = stores;
router.beforeEach(to => {
  authStore.setLoading(true);
  if (to.meta.requiresAuth) {
    authStore
      .initialize()
      .then((data: any) => {
        authStore.setAuthState(data);
      })
      .catch((e: any) => {
        alert(JSON.stringify(e));
        const currentUrl = window.location.href;
        window.location.href = `${
          import.meta.env.VITE_APP_ROOT_AUTH
        }?redirect_url=${currentUrl}`;
      })
      .catch((e: any) => {
        console.log(JSON.stringify(e));
      })
      .finally(() => {
        authStore.setLoading(true);
      });
  } else {
    const currentUrl = window.location.href;
    authStore.setLoading(true);
    window.location.href = `${
      import.meta.env.VITE_APP_AUTH
    }?redirect_url=${currentUrl}`;
  }
});

registerPlugins(app);
app.mount("#app");
