<script setup lang="ts">
import { ref, onMounted } from "vue";
import axiosInstance from "@/services/api/axiosInstance";

const fuliza = {
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
const mshwari = {
  count: {
    loanDisburse: 182,
    loanPaid: 76,
    savingsDeposit: 76,
    savingsWithdrawal: 76,
  },
  highest: {
    loanDisburse: 182,
    loanPaid: 76,
    savingsDeposit: 76,
    savingsWithdrawal: 76,
  },
  lastOn: {
    loanDisburse: 182,
    loanPaid: 76,
    savingsDeposit: 76,
    savingsWithdrawal: 76,
  },
  lastAmount: {
    loanDisburse: 182,
    loanPaid: 76,
    savingsDeposit: 76,
    savingsWithdrawal: 76,
  },
  total: {
    loanDisburse: 182,
    loanPaid: 76,
    savingsDeposit: 76,
    savingsWithdrawal: 76,
  },
};
const kcb = {
  count: {
    loanDisburse: 182,
    loanPaid: 76,
    savingsDeposit: 76,
    savingsWithdrawal: 76,
  },
  highest: {
    loanDisburse: 182,
    loanPaid: 76,
    savingsDeposit: 76,
    savingsWithdrawal: 76,
  },
  lastOn: {
    loanDisburse: 182,
    loanPaid: 76,
    savingsDeposit: 76,
    savingsWithdrawal: 76,
  },
  lastAmount: {
    loanDisburse: 182,
    loanPaid: 76,
    savingsDeposit: 76,
    savingsWithdrawal: 76,
  },
  total: {
    loanDisburse: 182,
    loanPaid: 76,
    savingsDeposit: 76,
    savingsWithdrawal: 76,
  },
};
const open = ref(true);

interface SafaricomDataItem {
  count: number;
  highest: string;
  total: string;
  last: string;
  last_amount: string;
  transactiontype: string;
}

const mshwariData = ref<SafaricomDataItem[]>([])
const kcbMpesaData = ref<SafaricomDataItem[]>([])
const fulizaData = ref<SafaricomDataItem[]>([])

// API Call: Get Safaricom Mshwari Data
const loadMshariData = async () => {
  await axiosInstance
    .get("/e_statement/mshwari_summary")
    .then(response => (mshwariData.value = response.data))
    .catch(error => console.error(error));
};

// API Call: Get Safaricom Mshwari Data
const loadKcbMpesaData = async () => {
  await axiosInstance
    .get("/e_statement/kcb_mpesa_summary")
    .then(response => (kcbMpesaData.value = response.data))
    .catch(error => console.error(error));
};

// API Call: Get Safaricom Mshwari Data
const loadFulizaData = async () => {
  await axiosInstance
    .get("/e_statement/fuliza_summary")
    .then(response => (fulizaData.value = response.data))
    .catch(error => console.error(error));
};

onMounted(() => {
  loadMshariData() 
  loadKcbMpesaData()
  loadFulizaData()
})

</script>

<template>
  <v-container fluid>
    <div
      @click="open = !open"
      class="bg-blue-darken-2 px-6 py-2 rounded d-flex justify-space-between hover-cursor-pointer"
    >
      <p>Safaricom</p>
      <v-icon
        icon="mdi:mdi-arrow-down-thin-circle-outline"
        :class="open ? 'fa-rotate-180' : ''"
      ></v-icon>
    </div>
    <v-row v-if="open">
      <v-col class="my-2">
        <v-card
          class="rounded text-caption"
          variant="flat"
          color="white"
        >
          <v-container fluid>
            <div class="mx-4">
              <h1 class="text-h6 font-weight-regular">Mshwari</h1>
              <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                Summary of Mshwari
              </h2>
            </div>
            <div class="my-8 mx-4">
              <v-row class="justify-space-between d-flex font-weight-bold">
                <v-col>Title</v-col>
                <v-col>Loan Disburse</v-col>
                <v-col>Loan Paid</v-col>
                <v-col>Savings Deposit</v-col>
                <v-col>Savings Withdrawal</v-col>
              </v-row>
              <v-divider
                class="my-3"
                :thickness="3"
              />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Count</v-col>
                <v-col>{{ mshwari.count.loanDisburse }}</v-col>
                <v-col>{{ mshwari.count.loanPaid }}</v-col>
                <v-col>{{ mshwari.count.savingsDeposit }}</v-col>
                <v-col>{{ mshwari.count.savingsWithdrawal }}</v-col>
              </v-row>
              <v-divider class="my-2" />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Highest</v-col>
                <v-col>{{ mshwari.highest.loanDisburse }}</v-col>
                <v-col>{{ mshwari.highest.loanPaid }}</v-col>
                <v-col>{{ mshwari.highest.savingsDeposit }}</v-col>
                <v-col>{{ mshwari.highest.savingsWithdrawal }}</v-col>
              </v-row>
              <v-divider class="my-2" />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Last On</v-col>
                <v-col>{{ mshwari.lastOn.loanDisburse }}</v-col>
                <v-col>{{ mshwari.lastOn.loanPaid }}</v-col>
                <v-col>{{ mshwari.lastOn.savingsDeposit }}</v-col>
                <v-col>{{ mshwari.lastOn.savingsWithdrawal }}</v-col>
              </v-row>
              <v-divider class="my-2" />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Last Amount</v-col>
                <v-col>{{ mshwari.lastAmount.loanDisburse }}</v-col>
                <v-col>{{ mshwari.lastAmount.loanPaid }}</v-col>
                <v-col>{{ mshwari.lastAmount.savingsDeposit }}</v-col>
                <v-col>{{ mshwari.lastAmount.savingsWithdrawal }}</v-col>
              </v-row>
              <v-divider
                class="my-3"
                :thickness="3"
              />
              <v-row class="font-weight-bold justify-space-between d-flex">
                <v-col>Total</v-col>
                <v-col>{{ mshwari.total.loanDisburse }}</v-col>
                <v-col>{{ mshwari.total.loanPaid }}</v-col>
                <v-col>{{ mshwari.total.savingsDeposit }}</v-col>
                <v-col>{{ mshwari.total.savingsWithdrawal }}</v-col>
              </v-row>
            </div>
          </v-container>
        </v-card>
      </v-col>
      <v-col class="my-2">
        <v-card
          class="rounded text-caption"
          variant="flat"
          color="white"
        >
          <v-container fluid>
            <div class="mx-4">
              <h1 class="text-h6 font-weight-regular">KCB Mpesa</h1>
              <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                Summary of KCB MPesa
              </h2>
            </div>
            <div class="my-8 mx-4">
              <v-row class="justify-space-between d-flex font-weight-bold">
                <v-col>Title</v-col>
                <v-col>Loan Disburse</v-col>
                <v-col>Loan Paid</v-col>
                <v-col>Savings Deposit</v-col>
                <v-col>Savings Withdrawal</v-col>
              </v-row>
              <v-divider
                class="my-3"
                :thickness="3"
              />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Count</v-col>
                <v-col>{{ kcb.count.loanDisburse }}</v-col>
                <v-col>{{ kcb.count.loanPaid }}</v-col>
                <v-col>{{ kcb.count.savingsDeposit }}</v-col>
                <v-col>{{ kcb.count.savingsWithdrawal }}</v-col>
              </v-row>
              <v-divider class="my-2" />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Highest</v-col>
                <v-col>{{ kcb.highest.loanDisburse }}</v-col>
                <v-col>{{ kcb.highest.loanPaid }}</v-col>
                <v-col>{{ kcb.highest.savingsDeposit }}</v-col>
                <v-col>{{ kcb.highest.savingsWithdrawal }}</v-col>
              </v-row>
              <v-divider class="my-2" />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Last On</v-col>
                <v-col>{{ kcb.lastOn.loanDisburse }}</v-col>
                <v-col>{{ kcb.lastOn.loanPaid }}</v-col>
                <v-col>{{ kcb.lastOn.savingsDeposit }}</v-col>
                <v-col>{{ kcb.lastOn.savingsWithdrawal }}</v-col>
              </v-row>
              <v-divider class="my-2" />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Last Amount</v-col>
                <v-col>{{ kcb.lastAmount.loanDisburse }}</v-col>
                <v-col>{{ kcb.lastAmount.loanPaid }}</v-col>
                <v-col>{{ kcb.lastAmount.savingsDeposit }}</v-col>
                <v-col>{{ kcb.lastAmount.savingsWithdrawal }}</v-col>
              </v-row>
              <v-divider
                class="my-3"
                :thickness="3"
              />
              <v-row class="font-weight-bold justify-space-between d-flex">
                <v-col>Total</v-col>
                <v-col>{{ kcb.total.loanDisburse }}</v-col>
                <v-col>{{ kcb.total.loanPaid }}</v-col>
                <v-col>{{ kcb.total.savingsDeposit }}</v-col>
                <v-col>{{ kcb.total.savingsWithdrawal }}</v-col>
              </v-row>
            </div>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="open">
      <v-col class="my-2">
        <v-card
          class="rounded text-caption"
          variant="flat"
          color="white"
        >
          <v-container fluid>
            <div class="mx-4">
              <h1 class="text-h6 font-weight-regular">Fuliza</h1>
              <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                Summary of Fuliza
              </h2>
            </div>
            <div class="my-8 mx-4">
              <v-row class="justify-space-between d-flex font-weight-bold">
                <v-col>Title</v-col>
                <v-col>Received</v-col>
                <v-col>Paid</v-col>
              </v-row>
              <v-divider
                class="my-3"
                :thickness="3"
              />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Count</v-col>
                <v-col>{{ fuliza.count.received }}</v-col>
                <v-col>{{ fuliza.count.paid }}</v-col>
              </v-row>
              <v-divider class="my-2" />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Highest</v-col>
                <v-col>{{ fuliza.highest.received }}</v-col>
                <v-col>{{ fuliza.highest.paid }}</v-col>
              </v-row>
              <v-divider class="my-2" />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Lowest</v-col>
                <v-col>{{ fuliza.lowest.received }}</v-col>
                <v-col>{{ fuliza.lowest.paid }}</v-col>
              </v-row>
              <v-divider class="my-2" />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Last</v-col>
                <v-col>{{ fuliza.last.received }}</v-col>
                <v-col>{{ fuliza.last.paid }}</v-col>
              </v-row>
              <v-divider
                class="my-3"
                :thickness="3"
              />
              <v-row class="font-weight-bold justify-space-between d-flex">
                <v-col>Total</v-col>
                <v-col>{{ fuliza.total.received }}</v-col>
                <v-col>{{ fuliza.total.paid }}</v-col>
              </v-row>
            </div>
          </v-container>
        </v-card>
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>
