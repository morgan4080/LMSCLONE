import App from "./App.vue";
import { createApp } from "vue";
import { registerPlugins } from "@/plugins";
import router from "@/router";
import stores from "./store";

const app = createApp(App);
registerPlugins(app);
app.mount("#app");

const { authStore } = stores;
router.beforeEach(to => {
  authStore.setLoading(true);
  if (to.meta.requiresAuth) {
    authStore
      .initialize()
      .then((data: any) => {
        authStore.setAuthState(data);
      })
      .catch(() => {
        authStore.setAuthPrompt(true);
        setTimeout(() => {
          const currentUrl = window.location.href;
          /*window.location.href = `${
            import.meta.env.VITE_APP_ROOT
          }?redirect_url=${currentUrl}`;*/
        }, 5000);
      })
      .catch((e: any) => {
        console.log(JSON.stringify(e));
      })
      .finally(() => {
        authStore.setLoading(true);
      });
  } else {
    console.log("requiresAuth", to.meta.requiresAuth);
  }
});
