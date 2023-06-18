<script setup lang="ts">
import { ref, computed, } from "vue";
import { useRoute } from "vue-router";
import axios from 'axios';

interface MonthlyBreakdown {
  month: string;
  debits: number;
  credits: number;
  closing: number;
}

const route = useRoute();

const monthlyBreakdown = ref<MonthlyBreakdown[]>([]);
const totalItems = computed(()=>monthlyBreakdown.value.length);

const baseUrl: string = "https://staging-lending.presta.co.ke/bank_scoring/api/v1"

const headers = ref<
  { title: string; key: string; align: string; sortable: boolean }[]
>([
  {
    title: "Month",
    align: "start",
    sortable: false,
    key: "month",
  },
  {
    title: "Debits (Dr)",
    key: "debits",
    align: "end",
    sortable: false,
  },
  { title: "Credits (CR)", key: "credits", align: "end", sortable: false },
  { title: "Closing", key: "closing", align: "end", sortable: false },
]);
const loading = ref(false);

// API Call: Get monthlyBreakdown
const loadMonthlyBreakdown = async () => {
  await axios
    .get(`${baseUrl}/bank_analysis/bank_income_expense_tabulated?idNumber=${route.params.slug}`)
    .then(response => (monthlyBreakdown.value = response.data))
    .catch(error => console.error(error));
};
</script>

<template>
  <v-container
    fluid
    class="my-4"
  >
    <v-card
      variant="flat"
      color="white"
      class="rounded h-100"
    >
      <div class="mx-4">
        <v-container
          fluid
          class="mx-auto"
        >
          <div>
            <h1 class="text-h6 font-weight-regular">Monthly Breakdown</h1>
            <h2 class="text-caption text-grey-darken-2 font-weight-regular">
              Summary Of Upcoming Collections
            </h2>
          </div>

          <div class="my-10">
            <v-data-table-server
              class="text-caption px-4"
              :headers="headers"
              :items-length="totalItems"
              :items="monthlyBreakdown"
              :loading="loading"
              loading-text="Loading...Please Wait"
              item-value="name"
              @update:options="loadMonthlyBreakdown()"
            ><template v-slot:bottom> </template></v-data-table-server>
          </div>
        </v-container>
      </div>
    </v-card>
  </v-container>
</template>
