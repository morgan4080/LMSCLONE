<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/services/api/axiosInstance"; 

interface MfiDataItem {
  total: number;
  highest: string;
  highest_who: string;
  lowest: string;  
  lowest_who: string;
  classification: string;
}

interface MfiTopTransData {
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
const totalItems = computed(()=>mfiTopTransData.value.length);
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
  { title: "Mfi Name", key: "name", align: "start", sortable: false },
  { title: "Highest", key: "highest", align: "end", sortable: false },
  { title: "Last Draw", key: "last_draw", align: "end", sortable: false },
  { title: "Last Amount", key: "last", align: "end", sortable: false },
]);

const mfiTransReceivedData = ref<MfiDataItem[]>([])
const mfiTransSentData = ref<MfiDataItem[]>([])
const mfiTopTransData = ref<MfiTopTransData[]>([])

// API Call: Get Mfi Transactions Data
const loadMfiTransReceivedData = async () => {
  await axiosInstance
    .get(`/e_statement/pay_bill_classifications_received?idNumber=${route.params.slug}&classification=MFIs&pageSize=100&sortBy=id`)
    .then(response => (mfiTransReceivedData.value = response.data.content))
    .catch(error => console.error(error));
};

const loadMfiTransSentData = async () => {
  await axiosInstance
    .get(`/e_statement/pay_bill_classifications_sent?idNumber=${route.params.slug}&classification=MFIs&pageSize=100&sortBy=id`)
    .then(response => (mfiTransSentData.value = response.data.content))
    .catch(error => console.error(error));
};

// API Call: Get Top Mfi Trans Data
const loadMfiTopTransData = async () => {
  await axiosInstance
    .get(`/e_statement/top_paybill_classifications?idNumber=${route.params.slug}&classification=MFIs&pageSize=${itemsPerPage.value}&sortBy=id`)
    .then(response => (mfiTopTransData.value = response.data.content))
    .catch(error => console.error(error));
};

onMounted(() => {
  loadMfiTransReceivedData();
  loadMfiTransSentData()
});
</script>

<template>
  <v-container fluid>
    <div
      @click="open = !open"
      class="bg-blue-darken-2 px-6 py-2 rounded d-flex justify-space-between hover-cursor-pointer"
    >
      <p>MFI</p>
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
                <h1 class="text-h6 font-weight-regular">MFI Transactions</h1>
                <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                  Summary of MFI Transactions
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
                  <v-col class="font-weight-medium">Highest</v-col>
                  <v-col>{{ mfiTransReceivedData[0]?.highest }}</v-col>
                  <v-col>{{ mfiTransSentData[0]?.highest }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Highest To</v-col>
                  <v-col>{{ mfiTransReceivedData[0]?.highest_who }}</v-col>
                  <v-col>{{ mfiTransSentData[0]?.highest_who }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Lowest</v-col>
                  <v-col>{{ mfiTransReceivedData[0]?.lowest }}</v-col>
                  <v-col>{{ mfiTransSentData[0]?.lowest }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Last</v-col>
                  <v-col>{{ mfiTransReceivedData[0]?.lowest_who }}</v-col>
                  <v-col>{{ mfiTransSentData[0]?.lowest_who }}</v-col>
                </v-row>
                <v-divider
                  class="my-3"
                  :thickness="3"
                />
                <v-row class="font-weight-bold justify-space-between d-flex">
                  <v-col>Total</v-col>
                  <v-col>{{ mfiTransReceivedData[0]?.total }}</v-col>
                  <v-col>{{ mfiTransSentData[0]?.total }}</v-col>
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
              <h1 class="text-h6 font-weight-regular">Top MFI Transactions</h1>
              <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                Summary of MFI Transactions
              </h2>
            </div>
            <v-data-table-server
              class="text-caption px-4"
              v-model:items-per-page="itemsPerPage"
              :headers="headers"
              :items-length="totalItems"
              :items="mfiTopTransData"
              :loading="loading"
              loading-text="Loading...Please Wait"
              item-value="name"
              @update:options="loadMfiTopTransData()"
            ></v-data-table-server>
          </v-card>
        </v-container>
      </v-row>
    </div>
  </v-container>
</template>
