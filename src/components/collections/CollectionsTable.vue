<script setup lang="ts">
import { useSalesDashboardStore } from "@/store/sales-dashboard";
import { dateFilters, formatMoney } from "@/helpers";
import { useToday } from "@/salesDashboard/composables/collections/useToday";
import { useSearch } from "@/composables/useSearch";
import { storeToRefs } from "pinia";
import { onBeforeUnmount } from "vue";
import { debounce } from "lodash";
import DataTableCollections from "@/components/DataTableCollections.vue";
const salesDashboardStore = useSalesDashboardStore();
const {
  pageables,
  fetchTodayCollections,
  setSelectedExportOption,
  setSelectedStatusOption,
  exportCollectionsData,
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

const { search } = useSearch(pageables, fetchTodayCollections);

const props = defineProps<{
  refId: string;
  period:
    | "day"
    | "week"
    | "month"
    | "last-month"
    | "quarter"
    | "year"
    | "all"
    | "arrears";
  title: string;
}>();

const emit = defineEmits(["clearFilters"]);

const kopeshaURL = import.meta.env.VITE_KOPESHA_API_URL;

type optionsType = {
  page: number;
  itemsPerPage: number;
  search: string;
};

const loadItems = async (options: optionsType) => {
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
  await fetchTodayCollections();
  isLoading.value = false;
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
        exportCollectionsData();
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
  <DataTableCollections
    :headers="headers"
    :todayCollections="todayCollections"
    :pageables="pageables"
    :salesDashboardStore="salesDashboardStore"
    :isLoading="isLoading"
    @load-items="loadItems"
  />
</template>

<style scoped>
.custom-input {
  outline-style: none;
}
</style>
