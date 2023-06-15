<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/services/api/axiosInstance";

interface BankDataItem {
  count: number;
  highest: string;
  total: string;
  last: string;
  last_amount: string;
  transactiontype: string;
}

const route = useRoute();

const banks = {
  count: {
    received: 182,
    paid: 76,
  },
  highest: {
    received: 182,
    paid: 76,
  },
  lowest: {
    received: 182,
    paid: 76,
  },
  last: {
    received: 182,
    paid: 76,
  },
  total: {
    received: 182,
    paid: 76,
  },
};
const open = ref(true);
const tableData = ref([]);
const loading = ref(false);
const totalItems = ref(30);
const headers = ref<
  { title: string; key: string; align: string; sortable: boolean }[]
>([
  {
    title: "#",
    align: "start",
    sortable: false,
    key: "id",
  },
  {
    title: "Statement Type",
    key: "statement",
    align: "end",
    sortable: false,
  },
  { title: "File Name", key: "file_name", align: "end", sortable: false },
  { title: "Status", key: "status", align: "end", sortable: false },
  { title: "Duration", key: "duration", align: "end", sortable: false },
  { title: "Upload Date", key: "upload", align: "end", sortable: false },
  { title: "Uploader", key: "uploader", align: "end", sortable: false },
]);

const bankTransData = ref([])

// API Call: Get Bank Transactions Data
const loadBankTransData = async () => {
  await axiosInstance
    .get(
      `/e_statement/pay_bill_classifications_received?idNumber=${route.params.slug}&pageSize=100&sortBy=id`
    )
    .then(response => (bankTransData.value = response.data.content))
    .catch(error => console.error(error));
};

onMounted(() => {
  loadBankTransData();
});
</script>

<template>
  {{ bankTransData }}
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
                  <v-col class="font-weight-medium">Count</v-col>
                  <v-col>{{ banks.count.received }}</v-col>
                  <v-col>{{ banks.count.paid }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Highest</v-col>
                  <v-col>{{ banks.highest.received }}</v-col>
                  <v-col>{{ banks.highest.paid }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Lowest</v-col>
                  <v-col>{{ banks.lowest.received }}</v-col>
                  <v-col>{{ banks.lowest.paid }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Last</v-col>
                  <v-col>{{ banks.last.received }}</v-col>
                  <v-col>{{ banks.last.paid }}</v-col>
                </v-row>
                <v-divider
                  class="my-3"
                  :thickness="3"
                />
                <v-row class="font-weight-bold justify-space-between d-flex">
                  <v-col>Total</v-col>
                  <v-col>{{ banks.total.received }}</v-col>
                  <v-col>{{ banks.total.paid }}</v-col>
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
                <v-divider
                  class="my-3"
                  :thickness="3"
                />

                <div class="d-flex justify-space-between mx-4">
                  <h1 class="text-caption font-weight-medium">Stanbic Bank</h1>
                  <h2 class="text-caption">MOJA_KCC170R</h2>
                </div>
                <v-divider class="my-3" />
                <div class="d-flex justify-space-between mx-4">
                  <h1 class="text-caption font-weight-medium">
                    Family Bank Pesa Pap
                  </h1>
                  <h2 class="text-caption">1725229825069070803154525154117</h2>
                </div>
                <v-divider class="my-3" />
                <div class="d-flex justify-space-between mx-4">
                  <h1 class="text-caption font-weight-medium">CBA Loop</h1>
                  <h2 class="text-caption">2547294724210729472421</h2>
                </div>
                <v-divider class="my-3" />
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
