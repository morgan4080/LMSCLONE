<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/services/api/axiosInstance";

import LineChart from "@/components/Scoring/LineChart.vue";

interface Flow {
  name: string;
  value: number;
}

const route = useRoute();

const inflowData = ref<Flow[]>([]);
const outflowData = ref<Flow[]>([]);
const loaded = ref(false);

const getMonthName = (month: number): string => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[month - 1];
};

const inflow = computed(() => {
  const labels: string[] = [];
  const data: string[] = [];

  for (const item of inflowData.value) {
    const [month] = item.name.split("/").map(Number);
    const label = getMonthName(month);
    const monthIndex = labels.indexOf(label);

    if (monthIndex === -1) {
      labels.push(label);
      data.push(String(item.value));
    } else {
      const currentValue = parseFloat(data[monthIndex]);
      data[monthIndex] = String(currentValue);
    }
  }

  return { labels, data };
});

const outflow = computed(() => {
  const labels: string[] = [];
  const data: string[] = [];

  for (const item of outflowData.value) {
    const [month] = item.name.split("/").map(Number);
    const label = getMonthName(month);
    const monthIndex = labels.indexOf(label);

    if (monthIndex === -1) {
      labels.push(label);
      data.push(String(item.value));
    } else {
      const currentValue = parseFloat(data[monthIndex]);
      data[monthIndex] = String(currentValue);
    }
  }

  return { labels, data };
});

const flow = ref<string>("Inflow");

const baseUrl: string =
  "https://staging-lending.presta.co.ke/bank_scoring/api/v1";

// API Call: Get In-Flow Data
const loadInFlowData = async () => {
  loaded.value = false;
  await axiosInstance
    .get(`${baseUrl}/bank_analysis/bank_inflow?refId=${route.params.slug}`)
    .then(response => {
      inflowData.value = response.data;
      loaded.value = true;
    })
    .catch(error => console.error(error));
};

// API Call: Get Out-Flow Data
const loadOutFlowData = async () => {
  await axiosInstance
    .get(
      `${baseUrl}/bank_analysis/bank_expense_flow?refId=${route.params.slug}`
    )
    .then(response => (outflowData.value = response.data))
    .catch(error => console.error(error));
};

onMounted(() => {
  loadInFlowData();
  loadOutFlowData();
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
            v-if="flow.toLowerCase() === 'inflow' && loaded"
            class="h-75 w-75"
          />
          <LineChart
            :propData="outflow"
            v-if="flow.toLowerCase() === 'outflow' && loaded"
            class="h-75 w-75"
          />
        </div>
      </v-container>
    </v-card>
  </v-container>
</template>
