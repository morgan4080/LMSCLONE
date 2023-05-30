<template>
  <router-view />
</template>

<script lang="ts" setup>
import axios from "axios";

axios.interceptors.response.use(undefined, function (err) {
  return new Promise(function (resolve, reject) {
    if (
      err.response.status === 401 &&
      err.config &&
      !err.config.__isRetryRequest
    ) {
      const currentUrl = window.location.href;
      window.location.href = `${
        import.meta.env.VITE_APP_ROOT_AUTH
      }?redirect_url=${currentUrl}`;
    }
    throw err;
  });
});
</script>
