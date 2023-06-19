<script setup lang="ts">
import { ref, computed, toRef, watch } from "vue";
import axiosInstance from "@/services/api/axiosInstance";
import {
  // dateDiffInMonths,
  // dateFromTimestamp,
  // timeFromTimestamp,
} from "@/helpers";

interface Statement {
  id: number;
  doctype: string;
  statementtype: string;
  idnum: string;
  fileName: string;
  customername: string;
  status: string;
  bankcode: string;
  uploaderName: string;
  uploaderPhone: string | null;
  statementPeriod: string;
  fileUrl: string;
  filePath: string;
  password: string;
  uploadDate: string;
}

const props = defineProps<{
  headers: {
    title: string;
    key: string;
    align: string;
    sortable: boolean;
    visible: boolean;
  }[];
  params: string;
}>();

const loading = ref(false);
const itemsPerPage = ref(5);
const search = ref("");
const totalItems = computed(() => tableData.value.length);
const headers = toRef(props, "headers");
const params = toRef(props, "params");

// Transform the API Data
const apiData = ref<Statement[]>([]);
const tableData = computed(() =>
  apiData.value.map(item => {
    return {
      id: item.id,
      statement: {
        doctype: item.doctype,
        bankcode: item.bankcode,
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

// API Call: Get all uploaded statements
const loadData = async (filters?: string) => {
  loading.value = true;
  let url = `/e_statement/get_uploaded_statements?pageSize=${itemsPerPage.value}&sortBy=id`;
  if (filters) url += filters;
  await axiosInstance
    .get(url)
    .then(response => {
      console.log(response);
      apiData.value = response.data.content;
    })
    .catch(error => console.error(error))
    .finally(() => (loading.value = false));
};

// API Call: Reupload failed statement
const reuploadStatement = async (payload: number) => {
  loading.value = true; 
  await axiosInstance
    .post(`/e_statement/retry_upload_statement?statementUploadId=${payload}`)
    .then(response => {
      response.data.status === "200" ? loadData() : ''
    })
    .catch(error => console.error(error))
    .finally(() => (loading.value = false));
};

// API Call: Delete uploaded statement
const deleteStatement = async (payload: number) => {
  loading.value = true; 
  await axiosInstance
    .delete(`/e_statement/uploaded_statement/delete?statementId=${payload}`)
    .then(response => {
      response.data.status === "200" ? loadData() : ''
    })
    .catch(error => console.error(error))
    .finally(() => (loading.value = false));
};


watch(params, () => {
  loadData(params.value);
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
    :search="search"
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

    <template v-slot:[`item.uploadDate`]="{ item }">
      <p>{{ item.columns.uploadDate }}</p>
      <!-- <p>{{ dateFromTimestamp(item.columns.uploadDate) }}</p> -->
      <!-- <p>{{ timeFromTimestamp(item.columns.uploadDate) }}</p> -->
    </template>
    <template v-slot:[`item.customer`]="{ item }">
      <p>{{ item.columns.customer.customername }}</p>
      <p>{{ item.columns.customer.uploaderPhone }}</p>
    </template>
    <template v-slot:[`item.statement`]="{ item }">
      <span
        class="text-white rounded text-caption pa-1"
        :class="
          item.columns.statement.doctype === 'MOBILE'
            ? 'bg-green-darken-2'
            : 'bg-blue-darken-4'
        "
      >
        {{ item.columns.statement.doctype }}
      </span>
      <span class="ml-2 border rounded text-blue pa-1">
        {{ item.columns.statement.bankcode }}
      </span>
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <span
        class="px-3 py-1 rounded"
        :class="{
          'bg-red-lighten-5 text-red': item.columns.status === 'Failed',
          'bg-green-lighten-5 text-green': item.columns.status === 'Completed',
          'bg-blue-lighten-5 text-blue': item.columns.status === 'Processing',
          'bg-yellow-lighten-5 text-yellow-darken-3':
            item.columns.status === 'Waiting',
        }"
        >{{ item.columns.status }}</span
      >
    </template>
    <template v-slot:[`item.statementPeriod`]="{ item }">
      <p>
        {{ item.columns.statementPeriod }}
      </p>
      <p>
        <!-- {{ dateDiffInMonths("2023-01-12", item.columns.uploadDate) }} -->
        Months
      </p>
    </template>
    <template v-slot:[`item.password`]="{ item }">
      {{ item.columns.password || "N/A" }}
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <div class="justify-end d-flex">
        <div
          class="px-1 border rounded hover-cursor-pointer"
          @click="
            $router.push(`/scoring/mobile/${item.columns.customer.idnum}`)
          "
        >
          <v-icon
            size="x-small"
            icon="mdi:mdi-eye-outline"
          ></v-icon>
        </div>
        <div @click.stop="item.columns.status?.toLowerCase() === 'failed' ? reuploadStatement(item.columns.customer.idnum) : ''"
          class="px-1 ml-1 border rounded"
          :class="
            item.columns.status?.toLowerCase() === 'failed'
              ? 'hover-cursor-pointer'
              : ''
          "
        >
          <v-icon
            :color="
              item.columns.status?.toLowerCase() === 'failed'
                ? 'green'
                : 'blue-grey-lighten-4'
            "
            size="x-small"
            icon="mdi:mdi-reload"
            class=""
          ></v-icon>
        </div>
        <div @click.stop="deleteStatement(item.columns.customer.idnum)" class="px-1 ml-1 border rounded hover-cursor-pointer">
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

<style>
.hover-cursor-pointer :hover {
  cursor: pointer;
}
</style>
