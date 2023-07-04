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

const apiData = ref<Flow[]>([]);
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

  for (const item of apiData.value) {
    if (item.expenseflowname === "Inflow") {
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
  }

  return { labels, data };
});

const outflow = computed(() => {
  const labels: string[] = [];
  const data: string[] = [];

  for (const item of apiData.value) {
    if (item.expenseflowname === "Outflow") {
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
  }

  return { labels, data };
});

const flow = ref<string>("Inflow");

// API Call: Get In-Out Flow Data
const loadFlowData = async () => {
  loaded.value = false;
  await axiosInstance
    .get(
      `/income/income_expense_flow?idNumber=${route.params.slug}&pageSize=100&sortBy=id`
    )
    .then(response => {
      apiData.value = response.data.content;
      loaded.value = true;
    })
    .catch(error => console.error(error));
};

onMounted(async () => {
  await loadFlowData();
});
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card
          variant="flat"
          color="white"
          class="rounded h-100"
        >
          <v-container fluid>
            <div class="d-flex justify-space-between">
              <div>
                <h1 class="text-h6 font-weight-regular">Inflow</h1>
                <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                  Summary Of Inflow Transactions
                </h2>
              </div>
            </div>
            <DoughnutChart
              :propData="inflow"
              v-if="loaded"
              class="w-75 h-75"
            />
          </v-container>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          variant="flat"
          color="white"
          class="rounded h-100"
        >
          <v-container fluid>
            <div class="d-flex justify-space-between">
              <div>
                <h1 class="text-h6 font-weight-regular">Outflow</h1>
                <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                  Summary Of Outflow Transactions
                </h2>
              </div>
            </div>
            <DoughnutChart
              :propData="outflow"
              v-if="loaded"
              class="w-75 h-75"
            />
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
