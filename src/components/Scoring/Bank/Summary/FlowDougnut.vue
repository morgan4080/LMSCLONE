<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import DoughnutChart from "@/components/Scoring/DoughnutChart.vue";

interface Flow {
  name: string;
  value: number;
  labeltype: string;
  data: string[];
  labels: string[];
}

const route = useRoute();

const inflowData = ref<Flow[]>([]);
const outflowData = ref<Flow[]>([]);

const InflowLoaded = ref(false);
const OutflowLoaded = ref(false);

const inflow = computed(() => {
  let labels: string[] = [];
  let data: string[] = [];

  for (const item of inflowData.value) {
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

  for (const item of outflowData.value) {
    if (item.labeltype === "Expenditure") {
      labels = [...item.labels];
      data = [...item.data];
    }
  }

  return { labels, data };
});

const flow = ref<string>("Inflow");
// API Call: Get In-Flow Data
const loadInFlowData = async () => {
  InflowLoaded.value = false;

  const getUrl = () => {
    return `https://staging-lending.presta.co.ke/bank_scoring/api/v1/bank_analysis/chart_labels?StatementRefId=${route.params.slug}`;
  };

  await axios
    .get(getUrl())
    .then(response => {
      inflowData.value = response.data;
    })
    .catch(error => console.error(error))
    .finally(() => {
      InflowLoaded.value = true;
    });
};

// API Call: Get Out-Flow Data
const loadOutFlowData = async () => {
  OutflowLoaded.value = false;

  const getUrl = () => {
    return `https://staging-lending.presta.co.ke/bank_scoring/api/v1/bank_analysis/chart_labels?StatementRefId=${route.params.slug}`;
  };

  await axios
    .get(getUrl())
    .then(response => {
      outflowData.value = response.data;
    })
    .catch(error => console.error(error))
    .finally(() => {
      OutflowLoaded.value = true;
    });
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
