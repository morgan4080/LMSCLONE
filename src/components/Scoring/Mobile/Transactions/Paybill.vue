<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/services/api/axiosInstance";

interface PaybillDataItem {
  count: number;
  highest: string;
  lowest: string;
  total: string;
  transactiontype: string;
}

interface TopPaybillDataItem {
  paybill_no: string;
  name: string;
  count: number;
  total: string;
  highest: string;
  transactiontype: string;
}

const route = useRoute();

const open = ref(true);
const loading = ref(false);
const totalItems = computed(() => topPaybillTransData.value.length);

const headers = ref<
  { title: string; key: string; align: string; sortable: boolean }[]
>([
  {
    title: "count",
    align: "start",
    sortable: false,
    key: "id",
  },
  {
    title: "Transaction Type",
    key: "transactiontype",
    align: "start",
    sortable: false,
  },
  {
    title: "Paybill/Till No",
    key: "paybill_no",
    align: "start",
    sortable: false,
  },
  { title: "Name", key: "name", align: "start", sortable: false },
  { title: "Highest", key: "highest", align: "end", sortable: false },
  { title: "Total", key: "total", align: "end", sortable: false },
]);

const paybillTransData = ref<PaybillDataItem[]>([]);
const topPaybillTransData = ref<TopPaybillDataItem[]>([]);

// API Call: Get Paybill Transactions Data
const loadPaybillTransData = async () => {
  await axiosInstance
    .get(
      `/e_statement/paybill_summary?idNumber=${route.params.slug}&pageSize=100&sortBy=id`
    )
    .then(response => (paybillTransData.value = response.data.content))
    .catch(error => console.error(error));
};

// API Call: Get Buy Goods Transactions Data
const loadTopPaybillTransData = async () => {
  await axiosInstance
    .get(
      `/e_statement/top_paybill_transactions?idNumber=${route.params.slug}&pageSize=100&sortBy=id`
    )
    .then(response => (topPaybillTransData.value = response.data.content))
    .catch(error => console.error(error));
};

onMounted(() => {
  loadPaybillTransData();
});
</script>

<template>
  <v-container fluid>
    <div
      @click="open = !open"
      class="px-6 py-2 rounded bg-blue-darken-2 hover-cursor-pointer d-flex justify-space-between"
    >
      <p>Paybill & Buy Goods</p>
      <v-icon
        icon="mdi:mdi-arrow-down-thin-circle-outline"
        :class="open ? 'fa-rotate-180' : ''"
      ></v-icon>
    </div>
    <div v-if="open">
      <v-row>
        <v-col class="my-2">
          <v-card
            class="rounded text-caption"
            variant="flat"
            color="white"
          >
            <v-container fluid>
              <div class="mx-4">
                <h1 class="text-h6 font-weight-regular">
                  Paybill & Buy Goods Transactions
                </h1>
                <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                  Summary of Paybill & Buy Goods Transactions
                </h2>
              </div>
              <div class="mx-4 my-8">
                <v-row class="justify-space-between d-flex font-weight-bold">
                  <v-col>Title</v-col>
                  <v-col>{{ paybillTransData[0]?.transactiontype }}</v-col>
                  <v-col>{{ paybillTransData[1]?.transactiontype }}</v-col>
                </v-row>
                <v-divider
                  class="my-3"
                  :thickness="3"
                />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Count</v-col>
                  <v-col>{{ paybillTransData[0]?.count }}</v-col>
                  <v-col>{{ paybillTransData[1]?.count }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Highest</v-col>
                  <v-col>{{ paybillTransData[0]?.highest }}</v-col>
                  <v-col>{{ paybillTransData[1]?.highest }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Lowest</v-col>
                  <v-col>{{ paybillTransData[0]?.lowest }}</v-col>
                  <v-col>{{ paybillTransData[1]?.lowest }}</v-col>
                </v-row>
                <v-divider
                  class="my-3"
                  :thickness="3"
                />
                <v-row class="font-weight-bold justify-space-between d-flex">
                  <v-col>Total</v-col>
                  <v-col>{{ paybillTransData[0]?.total }}</v-col>
                  <v-col>{{ paybillTransData[1]?.total }}</v-col>
                </v-row>
              </div>
            </v-container>
          </v-card>
        </v-col>
        <v-col></v-col>
      </v-row>
      <!--      Table-->
      <v-row>
        <v-container fluid>
          <v-card
            variant="flat"
            class="py-4 rounded"
            color="white"
          >
            <div class="px-8">
              <h1 class="text-h6 font-weight-regular">
                Top Paybill & Buy Goods Transactions
              </h1>
              <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                Summary of Paybill & Buy Goods Transactions
              </h2>
            </div>
            <v-data-table-server
              class="px-4 text-caption"
              :headers="headers"
              :items-length="totalItems"
              :items="topPaybillTransData"
              :loading="loading"
              loading-text="Loading...Please Wait"
              item-value="name"
              @update:options="loadTopPaybillTransData()"
            ></v-data-table-server>
          </v-card>
        </v-container>
      </v-row>
    </div>
  </v-container>
</template>

<style>
.hover-cursor-pointer :hover {
  cursor: pointer;
}
</style>
