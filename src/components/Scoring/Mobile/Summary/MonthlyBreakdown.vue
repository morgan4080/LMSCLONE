<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/services/api/axiosInstance";
import formatter from "@/helpers/currency";

interface MonthlyData {
  month: string;
  debits: number;
  credits: number;
  closing: number;
}
const route = useRoute();
const tableData = ref<MonthlyData[]>([]);

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
const itemsPerPage = ref(100);
const totalItems = ref(0);
const loading = ref(false);

// API Call: Get monthly breakdown
const loadMonthlyBreakdown = async () => {
  await axiosInstance
    .get(
      `income/income_expense_tabulated?statementRefId=${route.params.slug}&pageSize=100&sortBy=id`
    )
    .then(response => {
      tableData.value = response.data.content;
      totalItems.value = response.data.totalElements;
    })
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
            <VDataTableServer
              v-model:items-per-page="itemsPerPage"
              class="px-4 text-caption"
              :headers="headers"
              :items-length="totalItems"
              :items="tableData"
              :loading="loading"
              item-value="name"
              loading-text="Loading...Please Wait"
              @update:options="loadMonthlyBreakdown"
            >
              <template v-slot:[`item.debits`]="{ item }"
                ><span>{{ formatter(item.columns.debits) }}</span></template
              >
              <template v-slot:[`item.credits`]="{ item }"
                ><span>{{ formatter(item.columns.credits) }}</span></template
              >
              <template v-slot:[`item.closing`]="{ item }"
                ><span>{{ formatter(item.columns.closing) }}</span></template
              >
              <template v-slot:bottom> </template>
            </VDataTableServer>
          </div>
        </v-container>
      </div>
    </v-card>
  </v-container>
</template>
