<script setup lang="ts">
import router from "@/router";
import { onMounted, ref, toRef } from "vue";
import { useRoute } from "vue-router";

const emit = defineEmits(["clickedTab"]);
const selectedTab = ref(0);
const route = useRoute();

const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
const tabs = [
  "Summary",
  "Financial Institutions",
  "Lifestyle",
  "Utilities",
  "Transactions",
];

function onTabClick(id: number, tab: string) {
  router.push({ path: route.path, query: { tab: tab } });
  emit("clickedTab", id);
}
onMounted(() => {
  tabs.find((tab, i) => {
    if (tab == route.query.tab) {
      selectedTab.value = i;
      emit("clickedTab", i);
    }
  });
});
</script>

<template>
  <v-responsive>
    <div class="bg-white border-none">
      <v-container fluid>
        <v-row class="d-flex pb-4">
          <v-col> </v-col>
          <v-col
            cols="auto"
            class="d-flex align-center pt-6"
          >
            <v-row class="d-flex justify-end">
              <v-btn
                variant="plain"
                class="text-none text-caption border"
                @click="router.push({ name: 'allScoring' })"
              >
                Go Back
              </v-btn>
              <v-btn
                prepend-icon="mdi:mdi-file-outline"
                variant="flat"
                color="info"
                class="text-none text-caption ml-4"
                @click="router.push({ name: 'scoring' })"
              >
                Upload Statement
              </v-btn>
              <v-btn
                prepend-icon="mdi:mdi-file-download-outline"
                variant="flat"
                color="info"
                class="mx-4 text-none text-caption"
              >
                Download Summary
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="mx-2">
          <v-tabs
            color="blue"
            v-model="selectedTab"
          >
            <v-tab
              @click="onTabClick(idx, tab)"
              v-for="(tab, idx) in tabs"
              :key="idx"
              :value="idx"
              class="text-none font-weight-regular text-caption"
              >{{ tab }}</v-tab
            >
          </v-tabs>
        </v-row>
      </v-container>
    </div>
  </v-responsive>
</template>

<style>
.fixed {
  position: fixed;
}
</style>
