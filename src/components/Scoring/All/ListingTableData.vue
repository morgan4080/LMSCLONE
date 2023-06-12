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
const loading = ref(false)
const itemsPerPage = ref(5)
const totalItems = computed(() => tableData.value.length)
const headers = ref<
  { title: string; key: string; align: string; sortable: boolean }[]
>([
  { title: "#", key: "id", align: "start", sortable: false },
  { title: "Upload Date", key: "uploadDate", align: "start", sortable: false },
  { title: "Customer", key: "customername", align: "start", sortable: false },
  {
    title: "Statement Type",
    key: "statementtype",
    align: "start",
    sortable: false,
  },
  { title: "Status", key: "status", align: "start", sortable: false },
  { title: "Statement Period", key: "statementPeriod", align: "start", sortable: false },
  { title: "Password", key: "password", align: "start", sortable: false },
  { title: "Actions", key: "actions", align: "end", sortable: false },
])

// API Call: Get all uploaded statements
const loadData = async () => {
  loading.value = true
  await axiosInstance
    .get(`/e_statement/get_uploaded_statements?pageSize=${itemsPerPage.value}&sortBy=id`)
    .then(response => {
      tableData.value = response.data.content
    })
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
    <template v-slot:[`item.uploadDate`]="{ item }">
      <p>{{ dateFromTimestamp(item.columns.uploadDate) }}</p>
      <p>{{ timeFromTimestamp(item.columns.uploadDate) }}</p>
    </template>
    <template v-slot:[`item.uploadedBy`]="{ item }">
      <p>{{ item.columns.uploadedBy }}</p>
      <p>0712345678</p>
    </template>
    <template v-slot:[`item.statementtype`]="{ item }">
      <span
        class="text-caption text-white pa-1 rounded"
        :class="
          item.columns.statementtype !== 'mobile'
            ? 'bg-green-darken-2'
            : 'bg-blue-darken-4'
        "
      >
        Mobile
      </span>
      <span class="border text-blue pa-1 ml-2 rounded">
        {{ item.columns.statementtype }}
      </span>
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <span
        class="py-1 px-3 rounded"
        :class="{
          'bg-red-lighten-5 text-red': item.columns.status === 'Failed',
          'bg-green-lighten-5 text-green': item.columns.status === 'Completed',
          'bg-blue-lighten-5 text-blue': item.columns.status === 'Processing',
          'bg-yellow-lighten-5 text-yellow-darken-3':
            item.columns.status === 'Waiting',
        }"
        >Pending</span
      >
    </template>
    <template v-slot:[`item.statementPeriod`]="{ item }">
      <p>
        {{ item.columns.statementPeriod }}
      </p>
      <p>
        {{ dateDiffInMonths('2023-01-12', item.columns.uploadDate) }}
        Months
      </p>
    </template>
    <template v-slot:[`item.password`]="{ item }">
      {{ item.columns.password || "N/A" }}
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
