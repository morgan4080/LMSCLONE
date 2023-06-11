<script setup lang="ts">
import { ref, onMounted } from "vue";
import axiosInstance from "@/services/api/axiosInstance";

const customer = {
  documentType: "Mpesa Statement",
  status: "Completed",
  generatedOn: "DD/MM/YYYY HH:MM",
  currency: "Kenyan Shilling",
  receivedOn: "DD/MM/YYYY HH:MM",
  age: "1",
  duration: "12",
};

interface CustomerInformation {
  customer_names: string;
  identity_number: string;
  email: string;
  phone_number: string;
  statement_period: string;
}

const customerInformation = ref<CustomerInformation>({
  customer_names: "",
  identity_number: "",
  email: "",
  phone_number: "",
  statement_period: "",
});

interface MobileScore {
  net_score: number;
  gross_score: number;
  risk_level: string;
  loanable: number;
}

const mobileScore = ref<MobileScore>({
  net_score: 0,
  gross_score: 0,
  risk_level: "",
  loanable: 0,
});

interface LongTermScore {
  net_score: number;
  gross_score: number;
  risk_level: string;
  net_loanable_highest: number;
  loanable_highest: number;
  loanable: number;
  highest: number;
}

const longTermScore = ref<LongTermScore>({
  net_score: 0,
  gross_score: 0,
  risk_level: "",
  net_loanable_highest: 0,
  loanable_highest: 0,
  loanable: 0,
  highest: 0,
});

// API Call: Get customer information
const loadCustomerInformation = async () => {
  await axiosInstance
    .get("/e_statement/customer_information")
    .then(response => (customerInformation.value = response.data[0]))
    .catch(error => console.error(error));
};

// API Call: Get mobile loan scrore
const loadMobileScore = async () => {
  await axiosInstance
    .get("/score/mobile_score?idNumber=8111111")
    .then(response => (mobileScore.value = response.data[0]))
    .catch(error => console.error(error));
};

// API Call: Get long-term loan scrore
const loadLongTermScore = async () => {
  await axiosInstance
    .get("/score/g_long_term?idNumber=8111111")
    .then(response => (longTermScore.value = response.data[0]))
    .catch(error => console.error(error));
};

onMounted(() => {
  loadCustomerInformation();
  loadMobileScore();
  loadLongTermScore();
});
</script>

<template>
  <v-responsive>
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
                  ><h3 class="text-body-2 py-1 text-blue">
                    {{ customerInformation.customer_names }}
                  </h3>
                  <h3 class="text-body-2 py-1">MPesa_statement.....</h3>
                  <h3 class="text-body-2 py-1">
                    {{ customerInformation.phone_number }}
                  </h3>
                  <h3 class="text-body-2 py-1">
                    {{ customerInformation.email }}
                  </h3></v-col
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
                  <h3 class="text-grey text-body-2 py-1">Document Type</h3>
                  <h3 class="text-grey text-body-2 py-1">Status</h3>
                  <h3 class="text-grey text-body-2 py-1">Generated On</h3>
                  <h3 class="text-grey text-body-2 py-1">Currency</h3>
                </v-col>
                <v-col
                  ><h3 class="text-body-2 py-1 text-blue">
                    {{ customer.documentType }}
                  </h3>
                  <h3 class="text-body-2 py-1">{{ customer.status }}</h3>
                  <h3 class="text-body-2 py-1">{{ customer.generatedOn }}</h3>
                  <h3 class="text-body-2 py-1">
                    {{ customer.currency }}
                  </h3></v-col
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
                  <h3 class="text-grey text-body-2 py-1">Received On</h3>
                  <h3 class="text-grey text-body-2 py-1">Submission Age</h3>
                  <h3 class="text-grey text-body-2 py-1">Period</h3>
                  <h3 class="text-grey text-body-2 py-1">Duration</h3>
                </v-col>
                <v-col
                  ><h3 class="text-body-2 py-1 text-blue">
                    {{ customer.receivedOn }}
                  </h3>
                  <h3 class="text-body-2 py-1">{{ customer.age }}</h3>
                  <h3 class="text-body-2 py-1">{{ customerInformation.statement_period }}</h3>
                  <h3 class="text-body-2 py-1">
                    {{ customer.duration }} Months
                  </h3></v-col
                >
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
                  <h1 class="text-h6 font-weight-regular">Mobile Loan Score</h1>
                  <h2
                    class="text-caption text-grey-darken-2 font-weight-regular"
                  >
                    Summary of Mobile Loan Score
                  </h2>
                </div>

                <div class="my-10">
                  <div class="d-flex justify-space-between mt-4">
                    <h1 class="text-caption font-weight-bold">Title</h1>
                    <h1 class="text-caption font-weight-bold">Description</h1>
                  </div>
                  <v-divider
                    class="my-2"
                    :thickness="3"
                  ></v-divider>
                  <div class="d-flex justify-space-between mt-4">
                    <h1 class="text-caption">Score</h1>
                    <h1 class="text-caption">
                      {{ mobileScore.net_score }} /
                      {{ mobileScore.gross_score }}
                    </h1>
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <div class="d-flex justify-space-between mt-4">
                    <h1 class="text-caption font-weight-medium">Risk Level</h1>
                    <h1 class="text-caption">{{ mobileScore.risk_level }}</h1>
                  </div>
                  <v-divider
                    class="my-2"
                    :thickness="3"
                  ></v-divider>
                  <div class="d-flex justify-space-between mt-4">
                    <h1 class="text-caption font-weight-medium">Highest</h1>
                    <h1 class="text-caption">KES {{ mobileScore.loanable }}</h1>
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <div class="d-flex justify-space-between mt-4">
                    <h1 class="text-caption font-weight-medium">
                      Loanable (R)
                    </h1>
                    <h1 class="text-caption">KES {{ mobileScore.loanable }}</h1>
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
                  <h1 class="text-h6 font-weight-regular">
                    Long Term Loan Score
                  </h1>
                  <h2
                    class="text-caption text-grey-darken-2 font-weight-regular"
                  >
                    Summary of Long Term Loan Score
                  </h2>
                </div>
                <div class="my-10">
                  <div class="d-flex justify-space-between mt-4">
                    <h1 class="text-caption font-weight-bold">Title</h1>
                    <h1 class="text-caption font-weight-bold">Description</h1>
                  </div>
                  <v-divider
                    class="my-2"
                    :thickness="3"
                  ></v-divider>
                  <div class="d-flex justify-space-between mt-4">
                    <h1 class="text-caption">Score</h1>
                    <h1 class="text-caption">
                      {{ longTermScore.net_score }} /
                      {{ longTermScore.gross_score }}
                    </h1>
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <div class="d-flex justify-space-between mt-4">
                    <h1 class="text-caption font-weight-medium">Risk Level</h1>
                    <h1 class="text-caption">{{ longTermScore.risk_level }}</h1>
                  </div>
                  <v-divider
                    class="my-2"
                    :thickness="3"
                  ></v-divider>
                  <div class="d-flex justify-space-between mt-4">
                    <h1 class="text-caption font-weight-medium">Highest</h1>
                    <h1 class="text-caption">
                      KES {{ longTermScore.highest }}
                    </h1>
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <div class="d-flex justify-space-between mt-4">
                    <h1 class="text-caption font-weight-medium">
                      Gross Loanable (R)
                    </h1>
                    <h1 class="text-caption">
                      KES {{ longTermScore.loanable }} -
                      {{ longTermScore.loanable_highest }}
                    </h1>
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <div class="d-flex justify-space-between mt-4">
                    <h1 class="text-caption font-weight-medium">
                      Net Loanable (R)
                    </h1>
                    <h1 class="text-caption">
                      KES {{ longTermScore.loanable }} -
                      {{ longTermScore.net_loanable_highest }}
                    </h1>
                  </div>
                  <v-divider class="my-2"></v-divider>
                </div>
              </v-container>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-responsive>
</template>
