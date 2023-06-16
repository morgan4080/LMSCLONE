<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from 'axios';

interface CustomerInformation {
  name: string;
  fileName: string;
  phone: string;
  email: string;
  bank: string;
  accType: string;
  accNo: string;
  currency: string;
  receivedOn: string;
  age: string;
  period: string;
  duration: string;
}

const customer = {
  name: "Tom Kimani",
  fileName: "NCBA_statement",
  phone: "254712345678",
  email: "customer@gmail.co.ke",
  bank: "NCBA",
  accType: "Business Pay As You Go",
  accNo: "8394992910021",
  currency: "Kenyan Shilling",
  receivedOn: "DD/MM/YYYY HH:MM",
  age: "1",
  period: "DD/MM/YYYY - DD/MM/YYYY",
  duration: "12",
};

const analysis = {
  grossIncome: 2000,
  netIncome: 1500,
  maxLoanable: 2000,
};

const balances = {
  opening: 2000,
  closing: 1500,
  uncleared: 2000,
};

const route = useRoute();

const customerInformation = ref([])

// API Call: Get customer information
const loadCustomerInformation = async () => {
  await axios
    .get(`https://staging-lending.presta.co.ke/bank_scoring/api/v1/bank_analysis/get_customer_info?idNumber=1345455667`)
    // .get(`/bank_analysis/get_customer_info?idnum=${route.params.slug}`)
    .then(response => (customerInformation.value = response.data))
    .catch(error => console.error(error));
};

onMounted(() => {
  loadCustomerInformation() 
})
</script>

<template>
  {{ customerInformation }}
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card
          variant="flat"
          color="white"
          class="rounded"
        >
          <v-container>
            <v-row class="mx-2">
              <v-col cols="auto">
                <h3 class="text-grey text-body-2 py-1">Customer</h3>
                <h3 class="text-grey text-body-2 py-1">File Name</h3>
                <h3 class="text-grey text-body-2 py-1">Phone</h3>
                <h3 class="text-grey text-body-2 py-1">Email</h3>
              </v-col>
              <v-col
                ><h3 class="text-body-2 py-1 text-blue">{{ customer.name }}</h3>
                <h3 class="text-body-2 py-1">{{ customer.fileName }}</h3>
                <h3 class="text-body-2 py-1">{{ customer.phone }}</h3>
                <h3 class="text-body-2 py-1">{{ customer.email }}</h3></v-col
              >
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col
        ><v-card
          variant="flat"
          color="white"
          class="rounded"
        >
          <v-container>
            <v-row class="mx-2">
              <v-col cols="auto">
                <h3 class="text-grey text-body-2 py-1">Bank</h3>
                <h3 class="text-grey text-body-2 py-1">Acc Type</h3>
                <h3 class="text-grey text-body-2 py-1">Acc No</h3>
                <h3 class="text-grey text-body-2 py-1">Currency</h3>
              </v-col>
              <v-col
                ><h3 class="text-body-2 py-1 text-blue">{{ customer.bank }}</h3>
                <h3 class="text-body-2 py-1">{{ customer.accType }}</h3>
                <h3 class="text-body-2 py-1">{{ customer.accNo }}</h3>
                <h3 class="text-body-2 py-1">{{ customer.currency }}</h3></v-col
              >
            </v-row>
          </v-container>
        </v-card></v-col
      >
      <v-col
        ><v-card
          variant="flat"
          color="white"
          class="rounded"
        >
          <v-container>
            <v-row class="mx-2">
              <v-col cols="auto">
                <h3 class="text-grey text-body-2 py-1">Period</h3>
                <h3 class="text-grey text-body-2 py-1">Duration</h3>
                <h3 class="text-grey text-body-2 py-1">Received On</h3>
                <h3 class="text-grey text-body-2 py-1">Submission Age</h3>
              </v-col>
              <v-col
                ><h3 class="text-body-2 py-1">{{ customer.period }}</h3>
                <h3 class="text-body-2 py-1">{{ customer.duration }} Months</h3>
                <h3 class="text-body-2 py-1 text-blue">
                  {{ customer.receivedOn }}
                </h3>
                <h3 class="text-body-2 py-1">{{ customer.age }}</h3>
              </v-col>
            </v-row>
          </v-container>
        </v-card></v-col
      >
    </v-row>

    <v-row>
      <v-col>
        <v-card
          variant="flat"
          color="white"
          class="rounded h-100"
        >
          <div class="mx-4">
            <v-container
              fluid
              class="mx-auto"
            >
              <div>
                <h1 class="text-h6 font-weight-regular">Analysis</h1>
                <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                  Summary of Upcoming Collections
                </h2>
              </div>

              <div class="my-10">
                <div class="d-flex justify-space-between mt-4">
                  <h1 class="text-caption font-weight-bold">Title</h1>
                  <h1 class="text-caption font-weight-bold">Amount</h1>
                </div>
                <v-divider
                  class="my-2"
                  :thickness="3"
                ></v-divider>
                <div class="d-flex justify-space-between mt-4">
                  <h1 class="text-caption font-weight-bold">
                    Gross Monthly Income
                  </h1>
                  <h1 class="text-caption">{{ analysis.grossIncome }}</h1>
                </div>
                <v-divider class="my-2"></v-divider>
                <div class="d-flex justify-space-between mt-4">
                  <h1 class="text-caption font-weight-bold">
                    Net Monthly Income
                  </h1>
                  <h1 class="text-caption">{{ analysis.netIncome }}</h1>
                </div>
                <v-divider class="my-2"></v-divider>
                <div class="d-flex justify-space-between mt-4">
                  <h1 class="text-caption font-weight-bold">
                    Max Loanable (R) P.M.
                  </h1>
                  <h1 class="text-caption">{{ analysis.maxLoanable }}</h1>
                </div>
                <v-divider class="my-2"></v-divider>
              </div>
            </v-container>
          </div>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          variant="flat"
          color="white"
          class="rounded h-100"
        >
          <div class="mx-4">
            <v-container
              fluid
              class="mx-auto"
            >
              <div>
                <h1 class="text-h6 font-weight-regular">Balances</h1>
                <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                  Summary of Upcoming Collections
                </h2>
              </div>

              <div class="my-10">
                <div class="d-flex justify-space-between mt-4">
                  <h1 class="text-caption font-weight-bold">Title</h1>
                  <h1 class="text-caption font-weight-bold">Amount</h1>
                </div>
                <v-divider
                  class="my-2"
                  :thickness="3"
                ></v-divider>
                <div class="d-flex justify-space-between mt-4">
                  <h1 class="text-caption font-weight-bold">Opening</h1>
                  <h1 class="text-caption">{{ balances.opening }}</h1>
                </div>
                <v-divider class="my-2"></v-divider>
                <div class="d-flex justify-space-between mt-4">
                  <h1 class="text-caption font-weight-bold">Closing</h1>
                  <h1 class="text-caption">{{ balances.closing }}</h1>
                </div>
                <v-divider class="my-2"></v-divider>
                <div class="d-flex justify-space-between mt-4">
                  <h1 class="text-caption font-weight-bold">Uncleared</h1>
                  <h1 class="text-caption">{{ balances.uncleared }}</h1>
                </div>
                <v-divider class="my-2"></v-divider>
              </div>
            </v-container>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
