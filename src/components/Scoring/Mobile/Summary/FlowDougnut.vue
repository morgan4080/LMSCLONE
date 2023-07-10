<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "@/services/api/axiosInstance";
import DoughnutChart from "@/components/Scoring/DoughnutChart.vue";

interface Flow {
  id: number;
  data: string[];
  labels: string[];
  labeltype: string;
  refId: string;
  statementRefId: string;
  tenantId: string | null;
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
  let labels: string[] = [];
  let data: string[] = [];
  for (const item of apiData.value) {
    if (item.labeltype === "Income") {
      labels = [...item.labels];
      data = [...item.data];
    }
  }

  return { labels, data };
});

const outflow = computed(() => {
  let labels: string[] = [];
  let data: string[] = [];

  for (const item of apiData.value) {
    if (item.labeltype === "Expenditure") {
      labels = [...item.labels];
      data = [...item.data];
    }
  }

  return { labels, data };
});

const flow = ref<string>("Inflow");

// API Call: Get In-Out Flow Data
const loadFlowData = async () => {
  loaded.value = false;
  const getUrl = (): string => {
    return `/e_statement/chart_labels?refId=${route.params.slug}`;
  };

  await axios
    .get(getUrl())
    .then(response => {
      apiData.value = response.data;
    })
    .catch(error => console.error(error))
    .finally(() => {
      loaded.value = true;
    });
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
