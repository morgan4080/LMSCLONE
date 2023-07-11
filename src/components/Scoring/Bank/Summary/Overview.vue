<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "@/services/api/axiosbank";
import formatter from "@/helpers/currency";

interface OverviewInformation {
  lodgements: string;
  withdrawals: string;
  monthlyDisposable: string;
}

const route = useRoute();

const overviewInformation = ref<OverviewInformation[]>([]);

// API Call: Get overview information
const loadOverviewInformation = async () => {
  await axios
    .get(
      `/bank_analysis/bank_totals?statementRefId=${route.params.slug}&pageSize=100&sortBy=id`
    )
    .then(response => (overviewInformation.value = response.data.content))
    .catch(error => console.error(error));
};

onMounted(() => {
  loadOverviewInformation();
});
</script>

<template>
  <v-container fluid>
    <h1 class="text-h6 font-weight-regular text-grey-darken-2">Overview</h1>

    <v-row>
      <v-col>
        <v-card
          border
          color="white"
          variant="flat"
        >
          <v-container fluid>
            <h1 class="text-caption font-weight-regular">Total Inflow (CR)</h1>
            <h3 class="text-subtitle-1 font-weight-regular text-blue">
              {{ formatter(overviewInformation[0]?.lodgements) }}
            </h3>
          </v-container>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          border
          color="white"
          variant="flat"
        >
          <v-container fluid>
            <h1 class="text-caption font-weight-regular">Total Outflow (CR)</h1>
            <h3 class="text-subtitle-1 font-weight-regular text-blue">
              {{ formatter(overviewInformation[0]?.withdrawals) }}
            </h3>
          </v-container>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          border
          color="white"
          variant="flat"
        >
          <v-container fluid>
            <h1 class="text-caption font-weight-regular">Monthly Disposable</h1>
            <h3 class="text-subtitle-1 font-weight-regular text-blue">
              {{ formatter(overviewInformation[0]?.monthlyDisposable) }}
            </h3>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
