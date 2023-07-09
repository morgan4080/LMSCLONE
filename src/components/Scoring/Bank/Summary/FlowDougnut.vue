<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/services/api/axiosInstance";
import DoughnutChart from "@/components/Scoring/DoughnutChart.vue";

interface Flow {
  name: string;
  value: number;
}

const route = useRoute();

const inflowData = ref<Flow[]>([]);
const outflowData = ref<Flow[]>([]);

const InflowLoaded = ref(false);
const OutflowLoaded = ref(false);

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

  console.log(":::::inflowData.value::::::");
  console.log(inflowData.value);

  for (const item of inflowData.value) {
    const [month] = item.name.split("/").map(Number);
    const label = getMonthName(month);
    const monthIndex = labels.indexOf(label);

    console.log("inflowData.value");

    if (monthIndex === -1) {
      console.log("::::::item.value::::::");
      console.log(item.value);
      console.log("::::::label::::::");
      console.log(label);
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

const baseUrl: string =
  "https://staging-lending.presta.co.ke/bank_scoring/api/v1";
const flow = ref<string>("Inflow");
// API Call: Get In-Flow Data
const loadInFlowData = async () => {
  InflowLoaded.value = false;
  await axiosInstance
    .get(`${baseUrl}/bank_analysis/bank_inflow?refId=${route.params.slug}`)
    .then(response => {
      inflowData.value = response.data;
      InflowLoaded.value = true;
    })
    .catch(error => console.error(error));
};

// API Call: Get Out-Flow Data
const loadOutFlowData = async () => {
  OutflowLoaded.value = false;
  await axiosInstance
    .get(
      `${baseUrl}/bank_analysis/bank_expense_flow?refId=${route.params.slug}`
    )
    .then(response => {
      outflowData.value = response.data;
      OutflowLoaded.value = true;
    })
    .catch(error => console.error(error));
};

onMounted(() => {
  loadInFlowData();
  loadOutFlowData();
});
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col
        ><v-card
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
              v-if="InflowLoaded"
              class="h-75 w-75"
            />
          </v-container>
        </v-card>
      </v-col>
      <v-col
        ><v-card
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
              v-if="OutflowLoaded"
              class="h-75 w-75"
            />
          </v-container> </v-card
      ></v-col>
    </v-row>
  </v-container>
</template>
