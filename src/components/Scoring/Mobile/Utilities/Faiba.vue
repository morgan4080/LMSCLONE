<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/services/api/axiosInstance";

interface FaibaDataItem {
  count: number;
  highest: string;
  lowest: string;
  total: string;
  last: string;
}

const route = useRoute();

const open = ref(true);
const tableData = ref([]);
const loading = ref(false);
const totalItems = ref(30);
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
    key: "statement",
    align: "end",
    sortable: false,
  },
  { title: "Name", key: "file_name", align: "end", sortable: false },
  { title: "Highest", key: "status", align: "end", sortable: false },
  { title: "Last Draw", key: "duration", align: "end", sortable: false },
  { title: "Last Amount", key: "upload", align: "end", sortable: false },
]);

const faibaTransData = ref<FaibaDataItem[]>([])

// API Call: Get Faiba Transactions Data
const loadFaibaTransData = async () => {
  await axiosInstance
    .get(`/e_statement/internet_bundles_summary?idNumber=${route.params.slug}&pageSize=100&sortBy=id`)
    .then(response => (faibaTransData.value = response.data.content))
    .catch(error => console.error(error));
};

onMounted(() => {
  loadFaibaTransData() 
})
</script>

<template>
  <v-container fluid>
    <div
      @click="open = !open"
      class="px-6 py-2 rounded bg-blue-darken-2 hover-cursor-pointer d-flex justify-space-between"
    >
      <p>Faiba JTL</p>
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
                  Faiba JTL Transactions
                </h1>
                <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                  Summary of Faiba JTL Transactions
                </h2>
              </div>
              <div class="mx-4 my-8">
                <v-row class="justify-space-between d-flex font-weight-bold">
                  <v-col>Title</v-col>
                  <v-col>Received</v-col>
                  <v-col>Sent</v-col>
                </v-row>
                <v-divider
                  class="my-3"
                  :thickness="3"
                />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Count</v-col>
                  <v-col>{{ faibaTransData[0]?.count }}</v-col>
                  <v-col>{{  }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Highest</v-col>
                  <v-col>{{ faibaTransData[0]?.highest }}</v-col>
                  <v-col>{{  }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Lowest</v-col>
                  <v-col>{{ faibaTransData[0]?.lowest }}</v-col>
                  <v-col>{{  }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Last</v-col>
                  <v-col>{{ faibaTransData[0]?.last }}</v-col>
                  <v-col>{{  }}</v-col>
                </v-row>
                <v-divider
                  class="my-3"
                  :thickness="3"
                />
                <v-row class="font-weight-bold justify-space-between d-flex">
                  <v-col>Total</v-col>
                  <v-col>{{ faibaTransData[0]?.total }}</v-col>
                  <v-col>{{  }}</v-col>
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
                Faiba JTL Transactions
              </h1>
              <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                Summary of Faiba JTL Transactions
              </h2>
            </div>
            <v-data-table-server
              class="px-4 text-caption"
              :headers="headers"
              :items-length="totalItems"
              :items="tableData"
              :loading="loading"
              loading-text="Loading...Please Wait"
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
