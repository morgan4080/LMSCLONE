<script setup lang="ts">
import { formatMoney } from "@/helpers";
const kopeshaURL = import.meta.env.VITE_KOPESHA_API_URL;

const props = defineProps<{
  headers: any;
  todayCollections: any;
  pageables: any;
  salesDashboardStore: any;
  isLoading: boolean;
}>()

const emit = defineEmits(["loadItems"])
type optionsType = {
  page: number;
  itemsPerPage: number;
  search: string;
};
const loadItems = (options: optionsType) => {
  emit("loadItems", options)
}
</script>

<template>
  <v-data-table-server
    :headers="headers as any"
    :items="todayCollections.data"
    :items-per-page="pageables.length"
    :items-length="todayCollections.recordsTotal"
    :server-items-length="salesDashboardStore.upcomingCollections.recordsTotal"
    :loading="isLoading"
    :search="pageables.searchTerm"
    no-data-text="No data available"
    loadingText="isLoading"
    :items-per-page-text="'Show'"
    :first-icon="''"
    :last-icon="''"
    :show-current-page="true"
    :items-per-page-options="[
      {
        title: '5',
        value: 5,
      },
      {
        title: '10',
        value: 10,
      },
      {
        title: '50',
        value: 50,
      },
    ]"
    @update:options="loadItems"
  >
    <template v-slot:[`item.dueDate`]="{ item }">
      <p>{{ item.raw.dueDate }}</p>
    </template>
    <template v-slot:[`item.customerName`]="{ item }">
      <p>{{ item.raw.customerName }}</p>
      <p>{{ item.raw.phoneNumber }}</p>
    </template>
    <template v-slot:[`item.productName`]="{ item }">
      <p>{{ item.raw.productName }}</p>
    </template>
    <template v-slot:[`item.amountDue`]="{ item }">
      <p>{{ formatMoney(item.raw.amountDue) }}</p>
    </template>
    <template v-slot:[`item.amountPaid`]="{ item }">
      <p>{{ formatMoney(item.raw.amountPaid) }}</p>
    </template>
    <template v-slot:[`item.loanBalance`]="{ item }">
      <p>{{ formatMoney(item.raw.loanBalance) }}</p>
    </template>
    <template v-slot:[`item.dueToday`]="{ item }">
      <p
        style="color: #4d99d4"
        class="font-weight-regular"
      >
        {{ formatMoney(item.raw.dueToday) }}
      </p>
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <v-chip
        :label="true"
        :color="
          item.raw.status === 'PAID'
            ? 'green'
            : item.raw.status === 'NOTPAID'
            ? '#FB6B27'
            : '#D90000'
        "
      >
        {{ item.raw.status }}
      </v-chip>
    </template>
    <template v-slot:[`item.refId`]="{ item }">
      <a
        :href="`${kopeshaURL}/lender/index.html#/loans/loanprofile/${item.raw.refId}`"
      >
        <v-btn
          variant="outlined"
          density="compact"
          size="small"
          class="action-btn action-btn-icon mx-0.5"
          :color="'secondary'"
        >
          <v-icon icon="mdi mdi-eye" />
        </v-btn>
      </a>
    </template>
  </v-data-table-server>
</template>

<style scoped>

</style>
