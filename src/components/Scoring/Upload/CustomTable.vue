<script setup lang="ts">
import { ref, watch, toRef } from "vue";
import { storeToRefs } from "pinia";
import axios from "axios";
import { useUploadStore } from "@/store/uploadStore";
import axiosInstance from "@/services/api/axiosInstance";

interface Statement {
  id: number;
  refId: string;
  doctype: string;
  statementtype: string;
  statementid: string;
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

interface DataItem {
  id: number;
  statement: {
    doctype: string;
    bankcode: string;
    uniqueId: string;
  };
  fileName: string;
  customer: {
    idnum: string;
    uploaderName?: string;
    uploaderPhone?: string;
  };
  status: string;
  uploaderName?: string;
  statementPeriod?: string;
  fileUrl: string;
  filePath?: string;
  password?: string;
  uploadDate: string;
}

const props = defineProps<{
  headers: { title: string; key: string; align: string; sortable: boolean }[];
  params: string;
}>();
const loading = ref(true);
const itemsPerPage = ref(5);
const totalItems = ref(0);
const headers = toRef(props, "headers");
const params = toRef(props, "params");

const { setUploadFalse } = useUploadStore();
const { upload } = storeToRefs(useUploadStore());

const apiData = ref<DataItem[]>([]);

// Transform the API Data
const transformData = (payload: Statement[]): any =>
  payload.map(item => {
    return {
      id: item.id,
      statement: {
        refId: item.refId,
        doctype: item.doctype,
        bankcode: item.bankcode,
        uniqueId: item.statementid,
      },
      fileName: item.fileName,
      customer: {
        idnum: item.idnum,
        uploaderName: item.uploaderName,
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
  });

const baseUrl: string =
  "https://staging-lending.presta.co.ke/bank_scoring/api/v1";

// API Call: Query statement status
const queryStatementStatus = async (
  id: number,
  score: string,
  uniqueId: string,
  type: string,
  refId: string
) => {
  try {
    loading.value = true;
    const response =
      type === "MOBILE"
        ? await axiosInstance.post(
            `/e_statement/query_status?scoreType=${score}&refId=${refId}`
          )
        : await axios.post(
            `${baseUrl}/bank_analysis/query_status?scoreType=${score}&refId=${refId}`
          );
    const element = apiData.value.find(item => item.id === id);
    if (element) {
      element.status = response.data.data.state_name;
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

// API Call: Get recently uploaded statements
const loadData = async (filters?: string) => {
  loading.value = true;
  let url = `/e_statement/get_uploaded_statements?pageSize=${itemsPerPage.value}&sortBy=id`;
  if (filters) url += filters;

  try {
    const response = await axiosInstance.get(url);
    apiData.value = transformData(response.data.content);
    totalItems.value = response.data.totalElements;
    setUploadFalse();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
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
    :items="apiData"
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
    <template v-slot:[`item.duration`]="{ item }">
      <span v-if="item"></span>
      Months
    </template>
    <template v-slot:[`item.uploadDate`]="{ item }">
      <p>{{ item.columns.uploadDate }}</p>
    </template>
    <template v-slot:[`item.customer`]="{ item }">
      <p>{{ item.columns.customer.uploaderName }}</p>
      <p>{{ item.columns.customer.uploaderPhone }}</p>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <div class="justify-start d-flex">
        <v-tooltip
          location="bottom"
          text="Statement"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              size="small"
              density="compact"
              variant="tonal"
              :loading="false"
              @click="
                item.columns.status?.toLowerCase() === 'completed'
                  ? $router.push(
                      `/scoring/${
                        item.columns.statement.doctype !== 'MOBILE'
                          ? 'bank'
                          : 'mobile'
                      }/${item.columns.statement.refId}`
                    )
                  : ''
              "
              icon
              v-bind="props"
              :color="
                item.columns.status?.toLowerCase() === 'completed'
                  ? 'blue'
                  : 'blue-grey-lighten-4'
              "
            >
              <v-icon
                size="x-small"
                icon="mdi:mdi-eye-outline"
              ></v-icon>
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip
          location="bottom"
          text="Sync"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              size="small"
              density="compact"
              variant="tonal"
              :loading="false"
              @click.stop="
                queryStatementStatus(
                  item.columns.id,
                  item.columns.statement.doctype !== 'MOBILE'
                    ? 'BANK'
                    : item.columns.statement.bankcode,
                  item.columns.statement.uniqueId,
                  item.columns.statement.doctype,
                  item.columns.statement.refId
                )
              "
              class="ml-1"
              v-bind="props"
              icon
              :color="
                item.columns.status?.toLowerCase() === 'processing'
                  ? 'orange'
                  : 'grey-lighten-4'
              "
            >
              <v-icon
                size="x-small"
                icon="mdi:mdi-sync"
                class=""
              ></v-icon>
            </v-btn>
          </template>
        </v-tooltip>
      </div>
    </template>
  </VDataTableServer>
</template>
