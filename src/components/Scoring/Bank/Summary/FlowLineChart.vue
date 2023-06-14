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
  loadFlowData();
});
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
