<script setup lang="ts">
import { ref, onMounted } from "vue";
// import axiosInstance from "@/services/api/axiosInstance";

import LineChart from "@/components/Scoring/LineChart.vue";

const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

const inflow = ref({
  labels: ["January", "February", "March"],
  data: ["40", "20", "12"],
});
const outflow = ref({
  labels: ["October", "November", "December"],
  data: ["80", "68", "10"],
});
const flow = ref("Inflow");

// const flowData = ref([])

// API Call: Get In-Out Flow Data
const loadFlowData = async () => {
  // await axiosInstance
  //   .get("/e_statement/")
  //   .then(response => (flowData.value = response.data))
  //   .catch(error => console.error(error));
};

onMounted(() => {
  loadFlowData() 
})
</script>

<template>
  <v-container fluid>
    <v-card
      variant="flat"
      color="white"
      class="rounded h-100"
    >
      <v-container fluid>
        <div class="d-flex justify-space-between">
          <div>
            <h1 class="text-h6 font-weight-regular">{{ flow }}</h1>
            <h2 class="text-caption text-grey-darken-2 font-weight-regular">
              Summary Of {{ flow }} Transactions
            </h2>
          </div>
          <div class="d-flex">
            <v-btn
              variant="outlined"
              @click="
                () => {
                  flow = 'Inflow';
                }
              "
              :class="
                flow.toLowerCase() === 'inflow'
                  ? 'bg-black text-white'
                  : 'bg-white text-black'
              "
              class="text-none font-weight-regular rounded-e-0 border"
              >Inflow</v-btn
            >
            <v-btn
              variant="outlined"
              @click="
                () => {
                  flow = 'Outflow';
                }
              "
              :class="
                flow.toLowerCase() === 'outflow'
                  ? 'bg-black text-white'
                  : 'bg-white text-black'
              "
              class="text-none font-weight-regular rounded-s-0 border"
              >Outflow</v-btn
            >
          </div>
        </div>

        <div class="my-10">
          <div class="d-flex justify-space-between">
            <div>
              <v-menu transition="slide-y-transition">
                <template v-slot:activator="{ props }">
                  <v-btn
                    variant="outlined"
                    append-icon="mdi:mdi-chevron-down"
                    v-bind="props"
                    class="text-none text-caption ml-2"
                    style="border: 1px solid rgba(128, 128, 128, 0.25)"
                  >
                    Select Year
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
                    Select Month
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
            </div>
            <div>
              <v-menu transition="slide-y-transition">
                <template v-slot:activator="{ props }">
                  <v-btn
                    variant="outlined"
                    append-icon="mdi:mdi-chevron-down"
                    v-bind="props"
                    class="text-none text-caption ml-2"
                    style="border: 1px solid rgba(128, 128, 128, 0.25)"
                  >
                    Export
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
                    Show / Hide
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
                    <v-icon icon="mdi:mdi-dots-vertical" />
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
            </div>
          </div>
        </div>

        <div>
          <LineChart
            :propData="inflow"
            v-if="flow.toLowerCase() === 'inflow'"
            class="h-75 w-75"
          />
          <LineChart
            :propData="outflow"
            v-if="flow.toLowerCase() === 'outflow'"
            class="h-75 w-75"
          />
        </div>
      </v-container>
    </v-card>
  </v-container>
</template>
