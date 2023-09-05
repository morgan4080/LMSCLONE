<script setup lang="ts">
import { useSalesDashboardStore } from "@/store/sales-dashboard";
import { formatMoney } from "@/helpers";
import { useSearch } from "@/composables/useSearch";
import { storeToRefs } from "pinia";
import { useOnboarding } from "@/salesDashboard/composables/mycustomers/useOnboarding";
import { toRef } from "vue";

const {
  pageables,
  fetchOnBoardingCollections,
  setSelectedExportOption,
  exportOnBoarding,
} = useOnboarding();

const {
  headers,
  isLoading,
  selectedExportOption,
  exportOptions,
  onBoardingCollections,
} = storeToRefs(useOnboarding());

const { search } = useSearch(pageables, fetchOnBoardingCollections);
const props = defineProps<{
  refId: string | null;
}>();

const refId = toRef(props, "refId");

const kopeshaURL = import.meta.env.VITE_KOPESHA_API_URL;

type optionsType = {
  page: number;
  itemsPerPage: number;
  search: string;
};

const loadItems = (options: optionsType) => {
  if (refId.value) {
    pageables.salesRepRefIds = refId.value;
  }
  if (options.page === 1) {
    pageables.start = 0;
  } else {
    pageables.start = options.itemsPerPage + 1;
  }
  pageables.length = options.itemsPerPage;
  // fetch due today again
  fetchOnBoardingCollections();
};
</script>

<template>
  <v-row class="d-flex justify-center my-2">
    <h3 class="pa-2 font-weight-regular">
      Pending Approvals({{ onBoardingCollections.recordsTotal }})
    </h3>
    <v-spacer></v-spacer>
    <v-row class="d-flex justify-end">
      <div>
        <v-input
          hide-details
          class="px-2 font-weight-light border rounded mr-4"
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
      <v-menu transition="slide-y-transition"> </v-menu>
      <v-btn
        class="v-btn--size-default text-caption text-capitalize mr-6"
        density="comfortable"
        variant="tonal"
        style="border: 1px solid rgba(128, 128, 128, 0.25)"
        @click="exportOnBoarding"
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
          setSelectedExportOption(null);
          pageables.repaymentStatus = '';
          pageables.draw = 1;
          pageables.searchTerm = '';
          pageables.salesRepRefIds = '';
          pageables.startDate = '';
          pageables.endDate = '';
          pageables.endDate = '';
          pageables.start = 0;
          pageables.length = 10;

          fetchOnBoardingCollections();
        "
      >
        Clear Filters
      </v-btn>
    </v-row>
  </v-row>
  <v-data-table-server
    :headers="headers as any"
    :items="onBoardingCollections.data"
    :items-per-page="pageables.length"
    :items-length="onBoardingCollections.recordsTotal"
    :server-items-length="onBoardingCollections.recordsFiltered"
    :isLoading="isLoading"
    :search="pageables.searchTerm"
    no-data-text="No data available"
    isLoading-text="isLoading"
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
    <template v-slot:[`item.dayJoined`]="{ item }">
      <p>{{ item.raw.dayJoined }}</p>
    </template>
    <template v-slot:[`item.fullName`]="{ item }">
      <p>{{ item.raw.fullName}}</p>
    </template>
    <template v-slot:[`item.productName`]="{ item }">
      <p>{{ item.raw.phoneNumber }}</p>
      <p>{{ item.raw.phoneNumber }}</p>
    </template>
    <template v-slot:[`item.approvalLimit`]="{ item }">
      <p>{{ formatMoney(item.raw.approvalLimit) }}</p>
    </template>
    <template v-slot:[`item.onboardingStatus`]="{ item }">
      <p>{{ formatMoney(item.raw.onboardingStatus) }}</p>
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <v-chip
        label
        :color="
          item.raw.status === 'Paid'
            ? 'green'
            : item.raw.status === 'Not Paid'
            ? 'red'
            : 'yellow'
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
      <a
        :href="`${kopeshaURL}/lender/index.html#/loans/loanprofile/${item.raw.refId}`"
      >
        <v-btn
          variant="outlined"
          density="compact"
          size="small"
          class="action-btn action-btn-icon mx-1"
          :color="'secondary'"
        >
          <v-icon icon="mdi mdi-pencil" />
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
