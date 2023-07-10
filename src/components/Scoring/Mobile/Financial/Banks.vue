<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/services/api/axiosInstance";
import formatter from "@/helpers/currency";

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
const itemsPerPage = ref(5);
const totalItems = computed(() => bankTopTransData.value.length);
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

const bankTransReceivedData = ref<BankDataItem[]>([]);
const bankTransSentData = ref<BankDataItem[]>([]);
const bankTopAccountsData = ref<{ name: string; account: string }[]>([]);
const bankTopTransData = ref<BankTopTransData[]>([]);

// API Call: Get Bank Transactions Data
const loadBankTransReceivedData = async () => {
  await axiosInstance
    .get(
      `/e_statement/pay_bill_classifications_received?refId=${route.params.slug}&pageSize=100&sortBy=id`
    )
    .then(
      response =>
        (bankTransReceivedData.value = response.data.content.filter(
          (item: BankDataItem) => item.classification === "Banks"
        ))
    )
    .catch(error => console.error(error));
};

const loadBankTransSentData = async () => {
  await axiosInstance
    .get(
      `/e_statement/pay_bill_classifications_sent?refId=${route.params.slug}&pageSize=100&sortBy=id`
    )
    .then(
      response =>
        (bankTransSentData.value = response.data.content.filter(
          (item: BankDataItem) => item.classification === "Banks"
        ))
    )
    .catch(error => console.error(error));
};

// API Call: Get Top Bank Accounts Data
const loadBankTopAccountsData = async () => {
  await axiosInstance
    .get(
      `/e_statement/top_bank_accounts?refId=${route.params.slug}&pageSize=100&sortBy=id`
    )
    .then(response => (bankTopAccountsData.value = response.data.content))
    .catch(error => console.error(error));
};

// TODO CHANGE TO BANK APIS

// API Call: Get Top Bank Trans Data
const loadBankTopTransData = async () => {
  await axiosInstance
    // https://staging-lending.presta.co.ke/scoring/api/v1/e_statement/top_paybill_classifications?classification=Banks&pageSize=15&sortBy=id
    .get(
      `/e_statement/top_paybill_classifications?refId=${route.params.slug}&classification=Banks&pageSize=${itemsPerPage.value}&sortBy=id`
    )
    .then(response => (bankTopTransData.value = response.data.content))
    .catch(error => console.error(error));
};

onMounted(() => {
  loadBankTransReceivedData();
  loadBankTransSentData();
  loadBankTopAccountsData();
});
</script>

<template>
  <v-container fluid>
    <div
      @click="open = !open"
      class="px-6 py-2 rounded bg-blue-darken-2 d-flex justify-space-between hover-cursor-pointer"
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
                  <v-col>{{
                    formatter(bankTransReceivedData[0]?.highest)
                  }}</v-col>
                  <v-col>{{ formatter(bankTransSentData[0]?.highest) }}</v-col>
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
                  <v-col>{{
                    formatter(bankTransReceivedData[0]?.lowest)
                  }}</v-col>
                  <v-col>{{ formatter(bankTransSentData[0]?.lowest) }}</v-col>
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
                  <v-col>{{
                    formatter(bankTransReceivedData[0]?.total)
                  }}</v-col>
                  <v-col>{{ formatter(bankTransSentData[0]?.total) }}</v-col>
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
                <div class="mx-4 d-flex justify-space-between">
                  <h1 class="text-caption font-weight-bold">Account Name</h1>
                  <h2 class="text-caption font-weight-bold">Account Number</h2>
                </div>
                <v-divider
                  class="my-3"
                  :thickness="3"
                />
                <div
                  v-for="(topAccount, i) in bankTopAccountsData"
                  :key="i"
                >
                  <div class="mx-4 d-flex justify-space-between">
                    <h1 class="text-caption font-weight-medium">
                      {{ topAccount.name }}
                    </h1>
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
      <!--      <v-row>
        <v-container fluid>
          <v-card
            variant="flat"
            class="py-4 rounded"
            color="white"
          >
            <div class="px-8">
              <h1 class="text-h6 font-weight-regular">Top Bank Transactions</h1>
              <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                Summary of Bank Transactions
              </h2>
            </div>
            <v-data-table-server
              class="px-4 text-caption"
              v-model:items-per-page="itemsPerPage"
              :headers="headers"
              :items-length="totalItems"
              :items="bankTopTransData"
              :loading="loading"
              loading-text="Loading...Please Wait"
              item-value="name"
              @update:options="loadBankTopTransData()"
            >
              <template v-slot:[`item.highest`]="{ item }"
                ><span>{{ formatter(item.columns.highest) }}</span></template
              >
              <template v-slot:[`item.last`]="{ item }"
                ><span>{{ formatter(item.columns.last) }}</span></template
              >
            </v-data-table-server>
          </v-card>
        </v-container>
      </v-row>-->
    </div>
  </v-container>
</template>
