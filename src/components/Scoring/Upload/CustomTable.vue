<script setup lang="ts">
import { ref, computed } from "vue"
import axiosInstance from "@/services/api/axiosInstance"
import {
  dateDiffInMonths,
  dateFromTimestamp,
  timeFromTimestamp,
} from "@/helpers"

const tableData = ref([])
const loading = ref(true)
const itemsPerPage = ref(5)
const totalItems = computed(() => tableData.value.length)
const headers = ref<
  { title: string; key: string; align: string; sortable: boolean }[]
>([
  {
    title: "#",
    align: "start",
    sortable: false,
    key: "id",
  },
  {
    title: "Statement Type",
    key: "document_type",
    align: "start",
    sortable: false,
  },
  { title: "File Name", key: "file_name", align: "start", sortable: false },
  { title: "Status", key: "status", align: "start", sortable: false },
  { title: "Duration", key: "updatedAt", align: "start", sortable: false },
  { title: "Upload Date", key: "createdAt", align: "start", sortable: false },
  { title: "Uploader", key: "identifier", align: "start", sortable: false },
]);

// API Call: Get recently uploaded statements
const loadData = async () => {
  loading.value = true;
  await axiosInstance
    .get("/e_statement/get_upload_requests")
    .then(response => (tableData.value = response.data))
    .catch(error => console.error(error))
    .finally(() => (loading.value = false));
};
</script>

<template>
  <VDataTableServer
    class="text-caption"
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items-length="totalItems"
    :items="tableData"
    :loading="loading"
    loading-text="Loading...Please Wait"
    item-value="name"
    @update:options="loadData"
  >
    <template v-slot:[`item.document_type`]="{ item }">
      <span
        class="text-caption text-white pa-1 rounded"
        :class="
          item.columns.document_type !== 'mobile'
            ? 'bg-green-darken-2'
            : 'bg-blue-darken-4'
        "
      >
        Mobile
      </span>
      <span class="border text-blue pa-1 ml-2 rounded">
        {{ item.columns.document_type }}
      </span>
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <span
        class="py-1 px-3 rounded"
        :class="{
          'bg-red-lighten-5 text-red': item.columns.status === 'failed',
          'bg-green-lighten-5 text-green': item.columns.status === 'completed',
          'bg-blue-lighten-5 text-blue': item.columns.status !== 'processing',
          'bg-yellow-lighten-5 text-yellow-darken-3':
            item.columns.status === 'waiting',
        }"
        >Processing</span
      >
    </template>
    <template v-slot:[`item.updatedAt`]="{ item }">
      {{ dateDiffInMonths(item.columns.updatedAt, item.columns.updatedAt) }}
      Months
    </template>
    <template v-slot:[`item.createdAt`]="{ item }">
      <p>{{ dateFromTimestamp(item.columns.createdAt) }}</p>
      <p>{{ timeFromTimestamp(item.columns.createdAt) }}</p>
    </template>
    <template v-slot:[`item.identifier`]="{ item }">
      <p>{{ item.columns.identifier }}</p>
      <p>07....</p>
    </template>
  </VDataTableServer>
</template>
