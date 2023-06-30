<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from 'axios';
import formatter from "@/helpers/currency";

interface AccountInfo {
  accountType: string;
  statementDate: string;
  statementStartDate: string;
  statementEndDate: string;
  branch: string;
  accountNo: string;
  account: string;
  currency: string;
  accountOwner: string;
  opening: number;
  closing: number;
  postalAddress: string;
  accountEmail: string;
  customerPhoneNumber: string;
}

interface PersonalInfo {
  file_unique_id: string;
  file_type: string;
  phone: string;
  bank_name: string;
  account_number: string;
  duration: number;
  json_data: null | any;
  timestamp: string;
  state_name: string;
}

interface CustomerInformation {
  accountInfo: AccountInfo[];
  personalInfo: PersonalInfo[];
}

interface AnalysisInformation {
  gross_monthly_income: number;
  monthly_net_income: number;
  monthly_loanable: number;
}

interface BalanceInformation {
  opening: string;
  closing: string;
  uncleared: string;
}

const route = useRoute();

const customerInformation = ref<CustomerInformation>({
  accountInfo: [ ],
  personalInfo: []
});
const analysisInformation = ref<AnalysisInformation[]>([]);
const balanceInformation = ref<BalanceInformation[]>([]);

const baseUrl: string = "https://staging-lending.presta.co.ke/bank_scoring/api/v1"

// API Call: Get customer information
const loadCustomerInformation = async () => {
  await axios
    .get(`${baseUrl}/bank_analysis/get_customer_info?idNumber=${route.params.slug}`)
    .then(response => (customerInformation.value = response.data))
    .catch(error => console.error(error));
};

// API Call: Get analysis information
const loadAnalysisInformation = async () => {
  await axios
    .get(`${baseUrl}/bank_analysis/bank_scores?idNumber=${route.params.slug}`)
    .then(response => (analysisInformation.value = response.data))
    .catch(error => console.error(error));
};

// API Call: Get balance information
const loadBalanceInformation = async () => {
  await axios
    .get(`${baseUrl}/bank_analysis/bank_balances?idNumber=${route.params.slug}`)
    .then(response => (balanceInformation.value = response.data))
    .catch(error => console.error(error));
};

onMounted(() => {
  loadCustomerInformation() 
  loadAnalysisInformation()
  loadBalanceInformation()
})
</script>

<template>
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
                <h3 class="py-1 text-grey text-body-2">Customer</h3>
                <h3 class="py-1 text-grey text-body-2">File Name</h3>
                <h3 class="py-1 text-grey text-body-2">Phone</h3>
                <h3 class="py-1 text-grey text-body-2">Email</h3>
              </v-col>
              <v-col
                ><h3 class="py-1 text-body-2 text-blue">{{ customerInformation.accountInfo[0]?.accountOwner }}</h3>
                <h3 class="py-1 text-body-2"> - </h3>
                <h3 class="py-1 text-body-2">{{ customerInformation.accountInfo[0]?.customerPhoneNumber }}</h3>
                <h3 class="py-1 text-body-2">{{ customerInformation.accountInfo[0]?.accountEmail }}</h3></v-col
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
                <h3 class="py-1 text-grey text-body-2">Bank</h3>
                <h3 class="py-1 text-grey text-body-2">Acc Type</h3>
                <h3 class="py-1 text-grey text-body-2">Acc No</h3>
                <h3 class="py-1 text-grey text-body-2">Currency</h3>
              </v-col>
              <v-col
                ><h3 class="py-1 text-body-2 text-blue">{{ customerInformation.personalInfo[0]?.bank_name }}</h3>
                <h3 class="py-1 text-body-2">{{ customerInformation.accountInfo[0]?.accountType }}</h3>
                <h3 class="py-1 text-body-2">{{ customerInformation.accountInfo[0]?.accountNo }}</h3>
                <h3 class="py-1 text-body-2">{{ customerInformation.accountInfo[0]?.currency }}</h3></v-col
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
                <h3 class="py-1 text-grey text-body-2">Period</h3>
                <h3 class="py-1 text-grey text-body-2">Duration</h3>
                <h3 class="py-1 text-grey text-body-2">Received On</h3>
                <h3 class="py-1 text-grey text-body-2">Submission Age</h3>
              </v-col>
              <v-col
                ><h3 class="py-1 text-body-2">{{ customerInformation.accountInfo[0]?.statementDate }}</h3>
                <h3 class="py-1 text-body-2">{{ customerInformation.personalInfo[0]?.duration }} Months</h3>
                <h3 class="py-1 text-body-2 text-blue">
                  {{ customerInformation.personalInfo[0]?.timestamp }}
                </h3>
                <h3 class="py-1 text-body-2"> - </h3>
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
                <div class="mt-4 d-flex justify-space-between">
                  <h1 class="text-caption font-weight-bold">Title</h1>
                  <h1 class="text-caption font-weight-bold">Amount</h1>
                </div>
                <v-divider
                  class="my-2"
                  :thickness="3"
                ></v-divider>
                <div class="mt-4 d-flex justify-space-between">
                  <h1 class="text-caption font-weight-bold">
                    Gross Monthly Income
                  </h1>
                  <h1 class="text-caption">{{ formatter(analysisInformation[0]?.gross_monthly_income) }}</h1>
                </div>
                <v-divider class="my-2"></v-divider>
                <div class="mt-4 d-flex justify-space-between">
                  <h1 class="text-caption font-weight-bold">
                    Net Monthly Income
                  </h1>
                  <h1 class="text-caption">{{ formatter(analysisInformation[0]?.monthly_net_income) }}</h1>
                </div>
                <v-divider class="my-2"></v-divider>
                <div class="mt-4 d-flex justify-space-between">
                  <h1 class="text-caption font-weight-bold">
                    Max Loanable (R) P.M.
                  </h1>
                  <h1 class="text-caption">{{ formatter(analysisInformation[0]?.monthly_loanable) }}</h1>
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
                <div class="mt-4 d-flex justify-space-between">
                  <h1 class="text-caption font-weight-bold">Title</h1>
                  <h1 class="text-caption font-weight-bold">Amount</h1>
                </div>
                <v-divider
                  class="my-2"
                  :thickness="3"
                ></v-divider>
                <div class="mt-4 d-flex justify-space-between">
                  <h1 class="text-caption font-weight-bold">Opening</h1>
                  <h1 class="text-caption">{{ formatter(balanceInformation[0]?.opening) }}</h1>
                </div>
                <v-divider class="my-2"></v-divider>
                <div class="mt-4 d-flex justify-space-between">
                  <h1 class="text-caption font-weight-bold">Closing</h1>
                  <h1 class="text-caption">{{ formatter(balanceInformation[0]?.closing) }}</h1>
                </div>
                <v-divider class="my-2"></v-divider>
                <div class="mt-4 d-flex justify-space-between">
                  <h1 class="text-caption font-weight-bold">Uncleared</h1>
                  <h1 class="text-caption">{{ formatter(balanceInformation[0]?.uncleared) }}</h1>
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
