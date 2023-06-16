<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/services/api/axiosInstance";

interface BankDataItem {
  total: number;
  highest: string;
  highest_who: string;
  lowest: string;  
  lowest_who: string;
  classification: string;
}

interface BankTopTransData {
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
const totalItems = computed(()=>bankTopTransData.value.length);
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
  { title: "Bank Name", key: "name", align: "start", sortable: false },
  { title: "Highest", key: "highest", align: "end", sortable: false },
  { title: "Last Draw", key: "last_draw", align: "end", sortable: false },
  { title: "Last Amount", key: "last", align: "end", sortable: false },
]);

const bankTransReceivedData = ref<BankDataItem[]>([])
const bankTransSentData = ref<BankDataItem[]>([])
const bankTopAccountsData = ref<{name: string; account: string; }[]>([])
const bankTopTransData = ref<BankTopTransData[]>([])

// API Call: Get Bank Transactions Data
const loadBankTransReceivedData = async () => {
  await axiosInstance
    .get(`/e_statement/pay_bill_classifications_received?idNumber=${route.params.slug}&pageSize=100&sortBy=id`)
    .then(response => (bankTransReceivedData.value = response.data.content.filter((item: BankDataItem) => item.classification === "Banks")))
    .catch(error => console.error(error));
};

const loadBankTransSentData = async () => {
  await axiosInstance
    .get(`/e_statement/pay_bill_classifications_sent?idNumber=${route.params.slug}&pageSize=100&sortBy=id`)
    .then(response => (bankTransSentData.value = response.data.content.filter((item: BankDataItem) => item.classification === "Banks")))
    .catch(error => console.error(error));
};

// API Call: Get Top Bank Accounts Data
const loadBankTopAccountsData = async () => {
  await axiosInstance
    .get(`/e_statement/top_bank_accounts?idNumber=${route.params.slug}&pageSize=100&sortBy=id`)
    .then(response => (bankTopAccountsData.value = response.data.content))
    .catch(error => console.error(error));
};

// API Call: Get Top Bank Trans Data
const loadBankTopTransData = async () => {
  await axiosInstance
    .get(`/e_statement/top_paybill_classifications?idNumber=${route.params.slug}&pageSize=100&sortBy=id`)
    .then(response => (bankTopTransData.value = response.data.content.filter((item: BankTopTransData) => item.classification === "Banks")))
    .catch(error => console.error(error));
};

onMounted(() => {
  loadBankTransReceivedData();
  loadBankTransSentData()
  loadBankTopAccountsData()
});
</script>

<template>
  <v-container fluid>
    <div
      @click="open = !open"
      class="bg-blue-darken-2 px-6 py-2 rounded d-flex justify-space-between hover-cursor-pointer"
    >
      <p>Bank Transactions</p>
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
                <h1 class="text-h6 font-weight-regular">Bank Transactions</h1>
                <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                  Summary of Bank Transactions
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
                  <v-col>{{ bankTransReceivedData[0]?.highest }}</v-col>
                  <v-col>{{ bankTransSentData[0]?.highest }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Highest To</v-col>
                  <v-col>{{ bankTransReceivedData[0]?.highest_who }}</v-col>
                  <v-col>{{ bankTransSentData[0]?.highest_who }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Lowest</v-col>
                  <v-col>{{ bankTransReceivedData[0]?.lowest }}</v-col>
                  <v-col>{{ bankTransSentData[0]?.lowest }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Lowest To</v-col>
                  <v-col>{{ bankTransReceivedData[0]?.lowest_who }}</v-col>
                  <v-col>{{ bankTransSentData[0]?.lowest_who }}</v-col>
                </v-row>
                <v-divider
                  class="my-3"
                  :thickness="3"
                />
                <v-row class="font-weight-bold justify-space-between d-flex">
                  <v-col>Total</v-col>
                  <v-col>{{ bankTransReceivedData[0]?.total }}</v-col>
                  <v-col>{{ bankTransSentData[0]?.total }}</v-col>
                </v-row>
              </div>
            </v-container>
          </v-card>
        </v-col>
        <v-col></v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card
            class="rounded text-caption"
            variant="flat"
            color="white"
          >
            <v-container fluid>
              <div class="mx-4 my-4">
                <h1 class="text-h6 font-weight-regular">Bank Accounts</h1>
                <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                  Summary of Bank Transactions
                </h2>
              </div>
              <div>
                <div class="d-flex justify-space-between mx-4">
                  <h1 class="text-caption font-weight-bold">Account Name</h1>
                  <h2 class="text-caption font-weight-bold">Account Number</h2>
                </div>
                <v-divider class="my-3" :thickness="3"/>
                <div v-for="(topAccount, i) in bankTopAccountsData" :key="i">
                  <div class="d-flex justify-space-between mx-4">
                    <h1 class="text-caption font-weight-medium">{{ topAccount.name }}</h1>
                    <h2 class="text-caption">{{ topAccount.account }}</h2>
                  </div>
                  <v-divider class="my-3" />
                </div>
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
            class="rounded py-4"
            color="white"
          >
            <div class="px-8">
              <h1 class="text-h6 font-weight-regular">Top Bank Transactions</h1>
              <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                Summary of Bank Transactions
              </h2>
            </div>
            <v-data-table-server
              class="text-caption px-4"
              :headers="headers"
              :items-length="totalItems"
              :items="bankTopTransData"
              :loading="loading"
              loading-text="Loading...Please Wait"
              item-value="name"
              @update:options="loadBankTopTransData()"
            ></v-data-table-server>
          </v-card>
        </v-container>
      </v-row>
    </div>
  </v-container>
</template>
