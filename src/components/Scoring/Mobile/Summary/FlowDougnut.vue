<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/services/api/axiosInstance";
import DoughnutChart from "@/components/Scoring/DoughnutChart.vue";

interface Flow {
  id: number;
  idnum: string;
  name: string;
  value: number;
  expenseflowname: string;
}

const route = useRoute();

const apiData = ref<Flow[]>([])

const getMonthName = (month: number): string => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month - 1];
};

const inflow = computed(() => {
  const labels: string[] = [];
  const data: string[] = [];

  for (const item of apiData.value) {
    if (item.expenseflowname === 'Inflow') {
      const [month] = item.name.split('/').map(Number);
      const label = getMonthName(month);
      const monthIndex = labels.indexOf(label);

      if (monthIndex === -1) {
        labels.push(label);
        data.push(String(item.value));
      } else {
        const currentValue = parseFloat(data[monthIndex]);
        data[monthIndex] = String(currentValue + item.value);
      }
    }
  }

  return { labels, data };
});

const outflow = computed(() => {
  const labels: string[] = [];
  const data: string[] = [];

  for (const item of apiData.value) {
    if (item.expenseflowname === 'Outflow') {
      const [month] = item.name.split('/').map(Number);
      const label = getMonthName(month);
      const monthIndex = labels.indexOf(label);

      if (monthIndex === -1) {
        labels.push(label);
        data.push(String(item.value));
      } else {
        const currentValue = parseFloat(data[monthIndex]);
        data[monthIndex] = String(currentValue + item.value);
      }
    }
  }

  return { labels, data };
});

const flow = ref<string>('Inflow');

// API Call: Get In-Out Flow Data
const loadFlowData = async () => {
  await axiosInstance
    .get(`/income/income_expense_flow?idNumber=${route.params.slug}&pageSize=100&sortBy=id`)
    .then(response => (apiData.value = response.data.content))
    .catch(error => console.error(error));
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
        <div>
          <DoughnutChart
            :propData="inflow"
            v-if="flow.toLowerCase() === 'inflow'"
            class="h-25 w-25"
          />
          <DoughnutChart
            :propData="outflow"
            v-if="flow.toLowerCase() === 'outflow'"
            class="h-25 w-25"
          />
        </div>
      </v-container>
    </v-card>
  </v-container>
</template>
