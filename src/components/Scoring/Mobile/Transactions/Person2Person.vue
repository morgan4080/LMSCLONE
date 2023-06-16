<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import axiosInstance from "@/services/api/axiosInstance";

interface Rerson2personDataItem {
  count: number;
  highest: string;
  lowest: string;
  total: string;
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

const person2personTransReceivedData = ref<Rerson2personDataItem[]>([])
const person2personTransSentData = ref<Rerson2personDataItem[]>([])

// API Call: Get Rerson2person Transactions Data
const loadRerson2personTransReceivedData = async () => {
  await axiosInstance
    .get(`/e_statement/top_customers_received?idNumber=${route.params.slug}&pageSize=100&sortBy=id`)
    .then(response => (person2personTransReceivedData.value = response.data.content))
    .catch(error => console.error(error));
};

const loadRerson2personTransSentData = async () => {
  await axiosInstance
    .get(`/e_statement/top_customers_sent?idNumber=${route.params.slug}&pageSize=100&sortBy=id`)
    .then(response => (person2personTransSentData.value = response.data.content))
    .catch(error => console.error(error));
};

onMounted(() => { 
  loadRerson2personTransReceivedData();
  loadRerson2personTransSentData()
});
</script>

<template>
  <v-container fluid>
    <div
      @click="open = !open"
      class="bg-blue-darken-2 hover-cursor-pointer px-6 py-2 rounded d-flex justify-space-between hover-cursor-pointer"
    >
      <p>Person To Person</p>
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
                  Person To Person Transactions
                </h1>
                <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                  Summary of Person To Person Transactions
                </h2>
              </div>
              <div class="my-8 mx-4">
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
                  <v-col>{{ person2personTransReceivedData[0]?.count }}</v-col>
                  <v-col>{{ person2personTransSentData[0]?.count }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Highest</v-col>
                  <v-col>{{ person2personTransReceivedData[0]?.highest }}</v-col>
                  <v-col>{{ person2personTransSentData[0]?.highest }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Lowest</v-col>
                  <v-col>{{ person2personTransReceivedData[0]?.lowest }}</v-col>
                  <v-col>{{ person2personTransSentData[0]?.lowest }}</v-col>
                </v-row>
                <v-divider
                  class="my-3"
                  :thickness="3"
                />
                <v-row class="font-weight-bold justify-space-between d-flex">
                  <v-col>Total</v-col>
                  <v-col>{{ person2personTransReceivedData[0]?.total }}</v-col>
                  <v-col>{{ person2personTransSentData[0]?.total }}</v-col>
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
            class="rounded py-4"
            color="white"
          >
            <div class="px-8">
              <h1 class="text-h6 font-weight-regular">
                Top Person To Person Transactions
              </h1>
              <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                Summary of Person To Person Transactions
              </h2>
            </div>
            <v-data-table-server
              class="text-caption px-4"
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
