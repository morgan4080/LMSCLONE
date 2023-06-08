<script setup lang="ts">
import router from "@/router";
import { ref, toRef } from "vue";

const emit = defineEmits(["clickedTab"]);
const selectedTab = ref(0);

const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
const tabs = ["Summary", "Classifications"];

function onTabClick(id: number) {
  emit("clickedTab", id);
}
</script>

<template>
  <v-responsive>
    <div class="bg-white border-none">
      <v-container fluid>
        <v-row class="d-flex pb-4">
          <v-col>
            <v-menu transition="slide-y-transition">
              <template v-slot:activator="{ props }">
                <v-btn
                  variant="outlined"
                  append-icon="mdi:mdi-chevron-down"
                  v-bind="props"
                  class="text-none text-caption"
                  style="border: 1px solid rgba(128, 128, 128, 0.25)"
                >
                  Customer Name
                </v-btn>
              </template>
              <v-sheet
                border
                rounded
              >
                <v-list
                  nav
                  density="compact"
                  role="listbox"
                >
                  <v-list-item
                    v-for="(item, idx) in options"
                    :key="idx"
                    :value="item"
                    >{{ item }}</v-list-item
                  >
                </v-list>
              </v-sheet>
            </v-menu>
            <v-menu transition="slide-y-transition">
              <template v-slot:activator="{ props }">
                <v-btn
                  variant="outlined"
                  append-icon="mdi:mdi-chevron-down"
                  v-bind="props"
                  class="text-none text-caption ml-2"
                  style="border: 1px solid rgba(128, 128, 128, 0.25)"
                >
                  Bank
                </v-btn>
              </template>
              <v-sheet
                border
                rounded
              >
                <v-list
                  nav
                  density="compact"
                  role="listbox"
                >
                  <v-list-item
                    v-for="(item, idx) in options"
                    :key="idx"
                    :value="item"
                    >{{ item }}</v-list-item
                  >
                </v-list>
              </v-sheet>
            </v-menu>
            <v-menu transition="slide-y-transition">
              <template v-slot:activator="{ props }">
                <v-btn
                  variant="outlined"
                  append-icon="mdi:mdi-chevron-down"
                  v-bind="props"
                  class="text-none text-caption ml-2"
                  style="border: 1px solid rgba(128, 128, 128, 0.25)"
                >
                  #001 (NCBA)
                </v-btn>
              </template>
              <v-sheet
                border
                rounded
              >
                <v-list
                  nav
                  density="compact"
                  role="listbox"
                >
                  <v-list-item
                    v-for="(item, idx) in options"
                    :key="idx"
                    :value="item"
                    >{{ item }}</v-list-item
                  >
                </v-list>
              </v-sheet>
            </v-menu>
          </v-col>
          <v-col
            cols="auto"
            class="d-flex align-center"
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
                prepend-icon="mdi:mdi-file-plus-outline"
                variant="flat"
                color="info"
                class="text-none text-caption ml-4"
                @click="router.push({ name: 'scoring' })"
              >
                Upload Statement
              </v-btn>
              <v-btn
                prepend-icon="mdi:mdi-file-outline"
                variant="flat"
                color="info"
                class="mx-4 text-none text-caption"
              >
                Full Summary
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
              @click="onTabClick(idx)"
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
