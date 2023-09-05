<script setup lang="ts">
import { formatMoney } from "@/helpers";
import { useLoanApproval } from "@/salesDashboard/composables/collections/useLoanApproval";
import { useSearch } from "@/composables/useSearch";
import { storeToRefs } from "pinia";
import { debounce } from "lodash";

const { pageables, fetchApprovalCollections, setSelectedExportOption } =
  useLoanApproval();

const { headers, isLoading, exportOptions, approvalCollections } = storeToRefs(
  useLoanApproval()
);

const reload = debounce(() => {
  fetchApprovalCollections();
  isLoading.value = false;
}, 1000);

const { search } = useSearch(pageables, reload);

const props = defineProps<{
  refId: string;
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
  if (options.page === 1) {
    pageables.start = 0;
  } else {
    pageables.start = options.itemsPerPage + 1;
  }
  pageables.length = options.itemsPerPage;
  reload();
};
</script>

<template>
  <v-row class="d-flex justify-center my-2">
    <h3 class="pa-2 font-weight-regular">
      Pending Approvals({{ approvalCollections.recordsTotal }})
    </h3>
    <v-spacer></v-spacer>
    <v-row class="d-flex justify-end">
      <div>
        <v-input
          hide-details
          class="px-2 py-1 font-weight-light mr-4 border rounded"
          density="comfortable"
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
      <v-btn
        class="v-btn--size-default text-caption text-capitalize mr-4"
        density="comfortable"
        variant="tonal"
        style="border: 1px solid rgba(128, 128, 128, 0.25)"
        @click="setSelectedExportOption(exportOptions[0])"
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
          pageables.draw = 1;
          pageables.searchTerm = '';
          pageables.salesRepRefIds = '';
          pageables.startDate = '';
          pageables.endDate = '';
          pageables.endDate = '';
          pageables.start = 0;
          pageables.length = 10;

          fetchApprovalCollections();
        "
      >
        Clear Filters
      </v-btn>
    </v-row>
  </v-row>

  <v-data-table-server
    :headers="headers as any"
    :items="approvalCollections.data"
    :items-per-page="pageables.length"
    :items-length="approvalCollections.recordsTotal"
    :server-items-length="approvalCollections.recordsTotal"
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
    <template v-slot:[`item.loanDate`]="{ item }">
      <p>{{ item.raw.loanDate }}</p>
    </template>
    <template v-slot:[`item.fullName`]="{ item }">
      <p class="text-capitalize">{{ item.raw.fullName }}</p>
      <p>{{ item.raw.applicantPhoneNumber }}</p>
    </template>
    <template v-slot:[`item.productName`]="{ item }">
      <p>{{ item.raw.productName }}</p>
    </template>
    <template v-slot:[`item.currentAppraisalStepDesc`]="{ item }">
      <p>{{ item.raw.currentAppraisalStepDesc }}</p>
    </template>
    <template v-slot:[`item.requestedAmount`]="{ item }">
      <p style="color: #4d99d4">{{ formatMoney(item.raw.requestedAmount) }}</p>
    </template>
    <template v-slot:[`item.approvalStatus`]="{ item }">
      <v-chip
        :label="true"
        :color="
          item.raw.approvalStatus === 'APPROVED'
            ? '#43A047'
            : item.raw.approvalStatus === 'PENDING'
            ? '#FB6B27'
            : '#D90000'
        "
      >
        {{ item.raw.approvalStatus }}
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
