<script setup lang="ts">
import { ref, computed, watch, toRef, inject } from "vue";
import { storeToRefs } from "pinia";
import { useUploadStore } from "@/store/uploadStore";
import axiosInstance from "@/services/api/axiosInstance";
import {
  // dateDiffInMonths,
  dateFromTimestamp,
  timeFromTimestamp,
} from "@/helpers";

interface Statement {
  id: number;
  statementtype: string;
  idnum: string;
  fileName: string;
  customername: string;
  status: string;
  bankCode: string;
  uploaderName: string;
  uploaderPhone: string | null;
  statementPeriod: string;
  fileUrl: string;
  filePath: string;
  password: string;
  uploadDate: string;
}

const props = defineProps<{
  headers: { title: string; key: string; align: string; sortable: boolean }[];
  params: string;
}>();
const loading = ref(true);
const itemsPerPage = ref(5);
const totalItems = computed(() => tableData.value.length);
const headers = toRef(props, "headers");
const params = toRef(props, "params");

const { setUploadFalse } = useUploadStore();
const { upload } = storeToRefs(useUploadStore());

// Transform the API Data
const apiData = ref<Statement[]>([]);
const tableData = computed(() =>
  apiData.value.map(item => {
    return {
      id: item.id,
      statement: {
        statementtype: item.statementtype,
        bankCode: item.bankCode,
      },
      fileName: item.fileName,
      customer: {
        idnum: item.idnum,
        customername: item.customername,
        uploaderPhone: item.uploaderPhone,
      },
      status: item.status,
      uploaderName: item.uploaderName,
      statementPeriod: item.statementPeriod,
      fileUrl: item.fileUrl,
      filePath: item.filePath,
      password: item.password,
      uploadDate: item.uploadDate,
    };
  })
);

// API Call: Get recently uploaded statements
const loadData = async (filters?: string) => {
  loading.value = true;
  let url = `/e_statement/get_uploaded_statements?pageSize=${itemsPerPage.value}&sortBy=id`;
  if (filters) url += filters;

  await axiosInstance
    .get(url)
    .then(response => {
      apiData.value = response.data.content;
      setUploadFalse();
    })
    .catch(error => console.error(error))
    .finally(() => (loading.value = false));
};
watch(params, () => {
  loadData(params.value);
});

watch(upload, val => {
  val ? loadData(params.value) : "";
});
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
    @update:options="loadData()"
  >
    <template v-slot:[`headers`]="{ columns }">
      <tr>
        <template
          v-for="column in columns"
          :key="column.key"
        >
          <td v-if="column.visible">
            <span class="mr-2">{{ column.title }}</span>
          </td>
        </template>
      </tr>
    </template>

    <template v-slot:[`item.statement`]="{ item }">
      <span
        class="text-caption text-white pa-1 rounded"
        :class="
          item.columns.statement.statementtype === 'MPESA'
            ? 'bg-green-darken-2'
            : 'bg-blue-darken-4'
        "
      >
        {{ item.columns.statement.statementtype }}
      </span>
      <span class="border text-blue pa-1 ml-2 rounded">
        {{ item.columns.statement.statementtype }}
      </span>
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <span
        class="py-1 px-3 rounded"
        :class="{
          'bg-red-lighten-5 text-red': item.columns.status === 'failed',
          'bg-green-lighten-5 text-green': item.columns.status === 'Completed',
          'bg-blue-lighten-5 text-blue': item.columns.status === 'Processing',
          'bg-yellow-lighten-5 text-yellow-darken-3':
            item.columns.status === 'Waiting',
        }"
        >{{ item.columns.status }}</span
      >
    </template>
    <template v-slot:[`item.duration`]="{ item }">
      <span v-if="item"></span>
      <!-- {{ dateDiffInMonths("2023-01-12", item.columns.uploadDate) }} -->
      Months
    </template>
    <template v-slot:[`item.customer`]="{ item }">
      <p>{{ dateFromTimestamp(item.columns.uploadDate) }}</p>
      <p>{{ timeFromTimestamp(item.columns.uploadDate) }}</p>
    </template>
    <template v-slot:[`item.identifier`]="{ item }">
      <p>{{ item.columns.customer.uploaderName }}</p>
      <p>{{ item.columns.customer.uploaderPhone }}</p>
    </template>
  </VDataTableServer>
</template>
