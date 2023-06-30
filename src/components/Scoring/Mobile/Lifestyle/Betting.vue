<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import axiosInstance from "@/services/api/axiosInstance";
import formatter from "@/helpers/currency";

interface BettingDataItem {
  total: number;
  highest: string;
  highest_who: string;
  lowest: string;  
  lowest_who: string; 
  classification: string;
}

interface BettingTopTransData {
  last_draw: string; 
  last: string; 
  highest: string; 
  count: string; 
  name: string; 
  transactiontype: string; 
  classification: string; 
}

const route = useRoute();

const open = ref(true);
const loading = ref(false);
const itemsPerPage = ref(5);
const totalItems = computed(()=>bettingTopTransData.value.length);
const headers = ref<
  { title: string; key: string; align: string; sortable: boolean }[]
>([
  {
    title: "Count",
    align: "start",
    sortable: false,
    key: "count",
  },
  {
    title: "Transaction Type",
    key: "transactiontype",
    align: "start",
    sortable: false,
  },
  { title: "Betting Name", key: "name", align: "start", sortable: false },
  { title: "Highest", key: "highest", align: "end", sortable: false },
  { title: "Last Draw", key: "last_draw", align: "end", sortable: false },
  { title: "Last Amount", key: "last", align: "end", sortable: false },
]);

const bettingTransReceivedData = ref<BettingDataItem[]>([])
const bettingTransSentData = ref<BettingDataItem[]>([])
const bettingTransBuyGoodsData = ref<BettingDataItem[]>([])
const bettingTopTransData = ref<BettingTopTransData[]>([])

// API Call: Get Betting Transactions Data
const loadBettingTransReceivedData = async () => {
  await axiosInstance 
    .get(`/e_statement/pay_bill_classifications_received?idNumber=${route.params.slug}&classification=Betting&pageSize=100&sortBy=id`)
    .then(response => (bettingTransReceivedData.value = response.data.content))
    .catch(error => console.error(error));
};

const loadBettingTransSentData = async () => {
  await axiosInstance
    .get(`/e_statement/pay_bill_classifications_sent?idNumber=${route.params.slug}&classification=Betting&pageSize=100&sortBy=id`)
    .then(response => (bettingTransSentData.value = response.data.content))
    .catch(error => console.error(error));
};

const loadBettingTransBuyGoodsData = async () => {
  await axiosInstance
    .get(`/e_statement/buy_goods_classifications_summary?idNumber=${route.params.slug}&classification=Betting&pageSize=100&sortBy=id`)
    .then(response => (bettingTransBuyGoodsData.value = response.data.content))
    .catch(error => console.error(error));
};

// API Call: Get Top Betting Trans Data
const loadBettingTopTransData = async () => {
  await axiosInstance
    .get(`/e_statement/top_paybill_classifications?idNumber=${route.params.slug}&pageSize=${itemsPerPage.value}&sortBy=id`)
    .then(response => (bettingTopTransData.value = response.data.content.filter((item: BettingTopTransData) => item.classification === "Betting")))
    .catch(error => console.error(error));
};

onMounted(() => {
  loadBettingTransReceivedData();
  loadBettingTransSentData()
  loadBettingTransBuyGoodsData()
});
</script>

<template>
  <v-container fluid>
    <div
      @click="open = !open"
      class="px-6 py-2 rounded bg-blue-darken-2 hover-cursor-pointer d-flex justify-space-between"
    >
      <p>Betting</p>
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
                  Betting Transactions (Paybill)
                </h1>
                <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                  Summary of Betting Transactions
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
                  <v-col class="font-weight-medium">Highest</v-col>
                  <v-col>{{ formatter(bettingTransReceivedData[0]?.highest) }}</v-col>
                  <v-col>{{ formatter(bettingTransSentData[0]?.highest) }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Highest To</v-col>
                  <v-col>{{ bettingTransReceivedData[0]?.highest_who }}</v-col>
                  <v-col>{{ bettingTransSentData[0]?.highest_who }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Lowest</v-col>
                  <v-col>{{ formatter(bettingTransReceivedData[0]?.lowest) }}</v-col>
                  <v-col>{{ formatter(bettingTransSentData[0]?.lowest) }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Lowest To</v-col>
                  <v-col>{{ bettingTransReceivedData[0]?.lowest_who }}</v-col>
                  <v-col>{{ bettingTransSentData[0]?.lowest_who }}</v-col>
                </v-row>
                <v-divider
                  class="my-3"
                  :thickness="3"
                />
                <v-row class="font-weight-bold justify-space-between d-flex">
                  <v-col>Total</v-col>
                  <v-col>{{ formatter(bettingTransReceivedData[0]?.total) }}</v-col>
                  <v-col>{{ formatter(bettingTransSentData[0]?.total) }}</v-col>
                </v-row>
              </div>
            </v-container>
          </v-card>
        </v-col>
        <v-col>
          <v-card
            class="rounded text-caption"
            variant="flat"
            color="white"
          >
            <v-container fluid>
              <div class="mx-4">
                <h1 class="text-h6 font-weight-regular">
                  Betting Transactions (Buy Goods)
                </h1>
                <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                  Summary of Betting Transactions
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
                  <v-col class="font-weight-medium">Highest</v-col>
                  <v-col> - </v-col>
                  <v-col>{{ formatter(bettingTransBuyGoodsData[0]?.highest) }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Highest To</v-col>
                  <v-col> - </v-col>
                  <v-col>{{ bettingTransBuyGoodsData[0]?.highest_who }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Lowest</v-col>
                  <v-col> - </v-col>
                  <v-col>{{ formatter(bettingTransBuyGoodsData[0]?.lowest) }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Lowest To</v-col>
                  <v-col> - </v-col>
                  <v-col>{{ bettingTransBuyGoodsData[0]?.lowest_who }}</v-col>
                </v-row>
                <v-divider
                  class="my-3"
                  :thickness="3"
                />
                <v-row class="font-weight-bold justify-space-between d-flex">
                  <v-col>Total</v-col>
                  <v-col> - </v-col>
                  <v-col>{{ formatter(bettingTransBuyGoodsData[0]?.total) }}</v-col>
                </v-row>
              </div>
            </v-container>
          </v-card>
        </v-col>
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
                Top Betting Transactions
              </h1>
              <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                Summary of Betting Transactions
              </h2>
            </div>
            <v-data-table-server
              class="px-4 text-caption"
              v-model:items-per-page="itemsPerPage"
              :headers="headers"
              :items-length="totalItems"
              :items="bettingTopTransData"
              :loading="loading"
              loading-text="Loading...Please Wait"
              item-value="name"
              @update:options="loadBettingTopTransData()"
            >
            <template v-slot:[`item.highest`]="{ item }"><span>{{ formatter(item.columns.highest) }}</span></template>
            <template v-slot:[`item.last`]="{ item }"><span>{{ formatter(item.columns.last) }}</span></template>
            </v-data-table-server>
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
