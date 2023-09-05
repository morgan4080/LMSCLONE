<script setup lang="ts">
import { useSalesDashboardStore } from "@/store/sales-dashboard";
import { dateFilters, formatMoney } from "@/helpers";
import { useToday } from "@/salesDashboard/composables/collections/useToday";
import { useSearch } from "@/composables/useSearch";
import { storeToRefs } from "pinia";
import { onBeforeUnmount } from "vue";
import { debounce } from "lodash";
const salesDashboardStore = useSalesDashboardStore();
const {
  pageables,
  fetchTodayCollections,
  setSelectedExportOption,
  setSelectedStatusOption,
  exportData,
  $reset,
} = useToday();
const {
  headers,
  isLoading,
  selectedStatusOption,
  statusOptions,
  exportOptions,
  todayCollections,
} = storeToRefs(useToday());

const reload = debounce(() => {
  fetchTodayCollections();
  isLoading.value = false;
}, 1000);

const { search } = useSearch(pageables, reload);

const props = defineProps<{
  refId: string;
  period: "day" | "week" | "month" | "quarter" | "year" | "all" | "arrears";
  title: string;
}>();

const emit = defineEmits(["clearFilters"]);

const kopeshaURL = import.meta.env.VITE_KOPESHA_API_URL;

type optionsType = {
  page: number;
  itemsPerPage: number;
  search: string;
};

const loadItems = (options: optionsType) => {
  isLoading.value = true;
  pageables.salesRepRefIds = props.refId;
  const [start, end] = dateFilters(props.period);
  pageables.startDate = start;
  pageables.endDate = end;
  if (options.page === 1) {
    pageables.start = 0;
  } else {
    pageables.start = options.itemsPerPage + 1;
  }
  pageables.length = options.itemsPerPage;
  reload();
};

onBeforeUnmount(() => {
  $reset();
});
</script>

<template>
  <v-row class="v-row d-flex pl-2 gap-4 justify-start my-6">
    <h4 class="font-weight-medium">
      {{ title }} ({{ todayCollections.recordsTotal }})
    </h4>
    <v-spacer></v-spacer>
    <div>
      <v-input
        hide-details
        class="px-2 py-1 font-weight-light border rounded mr-4"
        density="comfortable"
        style="
          height: 28px !important;
          padding-left: 16px !important;
          padding-right: 16px !important;
        "
      >
        <template #append>
          <v-icon
            icon="mdi mdi-magnify"
            size="small"
          />
        </template>
        <template v-slot:default>
          <input
            class="text-caption searchField custom-input"
            type="text"
            placeholder="Search Here"
            v-model="pageables.searchTerm"
            @input="search"
          />
        </template>
      </v-input>
    </div>
    <v-menu transition="slide-y-transition">
      <template #activator="{ props }">
        <v-btn
          variant="outlined"
          append-icon="mdi:mdi-chevron-down"
          v-bind="props"
          density="comfortable"
          class="mr-4 text-none text-caption"
          style="border: 1px solid rgba(128, 128, 128, 0.25)"
        >
          {{ selectedStatusOption ? selectedStatusOption.name : "Status" }}
        </v-btn>
      </template>

      <v-sheet
        border
        rounded
      >
        <v-list
          :nav="true"
          density="comfortable"
          role="listbox"
        >
          <v-list-item
            v-for="(item, idx) in statusOptions"
            :key="idx"
            :value="item"
            @click="
              setSelectedStatusOption(item);
              pageables.repaymentStatus = item.value;
              fetchTodayCollections();
            "
          >
            {{ item.name }}</v-list-item
          >
        </v-list>
      </v-sheet>
    </v-menu>
    <v-btn
      class="v-btn--size-default text-caption text-capitalize mr-4"
      density="comfortable"
      variant="tonal"
      style="border: 1px solid rgba(128, 128, 128, 0.25)"
      @click="
        setSelectedExportOption(exportOptions[0]);
        exportData();
      "
    >
      Export
    </v-btn>
    <v-btn
      class="v-btn--size-default text-caption text-capitalize mr-6"
      density="comfortable"
      append-icon="mdi:mdi-close"
      color="primary"
      variant="tonal"
      style="border: 1px solid rgba(128, 128, 128, 0.25)"
      @click="
        emit('clearFilters');
        setSelectedExportOption(null);
        setSelectedStatusOption(null);
        pageables.repaymentStatus = '';
        pageables.draw = 1;
        pageables.searchTerm = '';
        pageables.salesRepRefIds = '';
        pageables.startDate = '';
        pageables.endDate = '';
        pageables.endDate = '';
        pageables.start = 0;
        pageables.length = 10;

        fetchTodayCollections();
      "
    >
      Clear Filters
    </v-btn>
  </v-row>
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
.custom-input {
  outline-style: none;
}
</style>
