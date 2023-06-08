<script setup lang="ts">
import { ref } from "vue";
import DoughnutChart from "@/components/Scoring/Bank/Summary/DoughnutChart.vue";

const inflow = ref({
  labels: ["January", "February", "March"],
  data: [40, 20, 12],
});
const outflow = ref({
  labels: ["October", "November", "December"],
  data: [80, 68, 10],
});
const flow = ref("Outflow");
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
        <div>
          <DoughnutChart
            v-if="flow.toLowerCase() === 'inflow'"
            class="h-25 w-25"
          />
          <DoughnutChart
            v-if="flow.toLowerCase() === 'outflow'"
            class="h-25 w-25"
          />
        </div>
      </v-container>
    </v-card>
  </v-container>
</template>
