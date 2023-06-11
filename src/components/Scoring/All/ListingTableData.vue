<script setup lang="ts">
import { ref, computed } from "vue"
import axiosInstance from "@/services/api/axiosInstance"
import {
  dateDiffInMonths,
  dateFromTimestamp,
  timeFromTimestamp,
} from "@/helpers";
import router from "@/router"

const tableData = ref([])
const loading = ref(true)
const itemsPerPage = ref(5)
const totalItems = computed(() => tableData.value.length)
const headers = ref<
  { title: string; key: string; align: string; sortable: boolean }[]
>([
  { title: "#", key: "id", align: "start", sortable: false },
  { title: "Upload Date", key: "createdAt", align: "start", sortable: false },
  { title: "Customer", key: "identifier", align: "start", sortable: false },
  {
    title: "Statement Type",
    key: "document_type",
    align: "start",
    sortable: false,
  },
  { title: "Status", key: "status", align: "start", sortable: false },
  { title: "Statement Period", key: "period", align: "start", sortable: false },
  { title: "Password", key: "decrypter", align: "start", sortable: false },
  { title: "Actions", key: "actions", align: "end", sortable: false },
])

// API Call: Get all uploaded statements
const loadData = async () => {
  loading.value = true
  await axiosInstance
    .get("/e_statement/get_upload_requests")
    .then(response => tableData.value = response.data)
    .catch(error => console.error(error))
    .finally(() => loading.value = false)
}
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
    <template v-slot:[`item.createdAt`]="{ item }">
      <p>{{ dateFromTimestamp(item.columns.createdAt) }}</p>
      <p>{{ timeFromTimestamp(item.columns.createdAt) }}</p>
    </template>
    <template v-slot:[`item.identifier`]="{ item }">
      <p>{{ item.columns.identifier }}</p>
      <p>07......</p>
    </template>
    <template v-slot:[`item.document_type`]="{ item }">
      <span
        class="text-caption text-white pa-1 rounded"
        :class="
          item.columns.document_type.toLowerCase() !== 'mobile'
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
          'bg-red-lighten-5 text-red': item.columns.status === 'Failed',
          'bg-green-lighten-5 text-green': item.columns.status === 'Completed',
          'bg-blue-lighten-5 text-blue': item.columns.status !== 'Processing',
          'bg-yellow-lighten-5 text-yellow-darken-3':
            item.columns.status === 'Waiting',
        }"
        >Pending</span
      >
    </template>
    <template v-slot:[`item.period`]="{ item }">
      <p>
        {{ item.columns.createdAt }} -
        {{ item.columns.createdAt }}
      </p>
      <p>
        {{ dateDiffInMonths(item.columns.createdAt, item.columns.createdAt) }}
        Months
      </p>
    </template>
    <template v-slot:[`item.decrypter`]="{ item }">
      {{ item.columns.decrypter || "N/A" }}
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <div class="d-flex justify-end">
        <div
          class="border rounded px-1"
          @click="
            router.push(
              `/scoring/mobile/${item.columns.id}`
            )
          "
        >
          <v-icon
            size="x-small"
            icon="mdi:mdi-eye-outline"
            class=""
          ></v-icon>
        </div>
        <div class="border rounded px-1 ml-1">
          <v-icon
            color="green"
            size="x-small"
            icon="mdi:mdi-reload"
            class=""
          ></v-icon>
        </div>
        <div class="border rounded px-1 ml-1">
          <v-icon
            color="blue"
            size="x-small"
            icon="mdi:mdi-pencil-outline"
            class=""
          ></v-icon>
        </div>
        <div class="border rounded px-1 ml-1">
          <v-icon
            color="red"
            size="x-small"
            icon="mdi:mdi-trash-can-outline"
            class=""
          ></v-icon>
        </div>
      </div>
    </template>
  </VDataTableServer>
</template>
