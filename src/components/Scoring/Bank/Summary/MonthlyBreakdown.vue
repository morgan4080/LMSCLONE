<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "@/services/api/axiosbank";
import formatter from "@/helpers/currency";

interface MonthlyBreakdown {
  month: string;
  debits: number;
  credits: number;
  closing: number;
}

const route = useRoute();

const monthlyBreakdown = ref<MonthlyBreakdown[]>([]);
const totalItems = computed(() => monthlyBreakdown.value.length);

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
    .get(
      `/bank_analysis/bank_income_expense_tabulated?refId=${route.params.slug}`
    )
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
              class="px-4 text-caption"
              :headers="headers"
              :items-length="totalItems"
              :items="monthlyBreakdown"
              :loading="loading"
              loading-text="Loading...Please Wait"
              item-value="name"
              @update:options="loadMonthlyBreakdown()"
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
            </v-data-table-server>
          </div>
        </v-container>
      </div>
    </v-card>
  </v-container>
</template>
