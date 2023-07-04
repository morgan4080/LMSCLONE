<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/services/api/axiosInstance";
import formatter from "@/helpers/currency";

interface CustomerInformation {
  customer_names: string;
  identity_number: string;
  email: string;
  phone_number: string;
  statement_period: string;
}

interface CustomerStatement {
  file_type: string;
  bank_name: string;
  account_number: string;
  duration: number;
  timestamp: string;
  state_name: string;
  documentName: string;
  status: string;
  date: string;
  email: string;
  phone: string;
}

interface CustomerAnalysis {
  submission_age_in_days: number;
  received_on: string;
  duration_in_months: string;
}

interface MobileScore {
  net_score: number;
  gross_score: number;
  risk_level: string;
  loanable: number;
}

interface LongTermScore {
  net_score: number;
  gross_score: number;
  risk_level: string;
  net_loanable_highest: number;
  loanable_highest: number;
  loanable: number;
  highest: number;
}

const route = useRoute();

const customerInformation = ref<CustomerInformation[]>([]);
const customerStatement = ref<CustomerStatement[]>([]);
const customerAnalysis = ref<CustomerAnalysis[]>([]);
const mobileScore = ref<MobileScore[]>([]);
const longTermScore = ref<LongTermScore[]>([]);

// API Call: Get customer information
const loadCustomerInformation = async () => {
  await axiosInstance
    .get(`/e_statement/customer_information?idNumber=${route.params.slug}`)
    .then(response => (customerInformation.value = response.data))
    .catch(error => console.error(error));
};

// API Call: Get customer statement
const loadCustomerStatement = async () => {
  await axiosInstance
    .get(`/e_statement/analysis_customer_details?idNumber=${route.params.slug}`)
    .then(response => (customerStatement.value = response.data.content))
    .catch(error => console.error(error));
};

// API Call: Get customer analysis
const loadCustomerAnalysis = async () => {
  await axiosInstance
    .get(
      `/e_statement/get_personal_info_boundaries?idNumber=${route.params.slug}`
    )
    .then(response => (customerAnalysis.value = response.data.content))
    .catch(error => console.error(error));
};

// API Call: Get mobile loan scrore
const loadMobileScore = async () => {
  await axiosInstance
    .get(`/score/mobile_score?idNumber=${route.params.slug}`)
    .then(response => (mobileScore.value = response.data.content))
    .catch(error => console.error(error));
};

// API Call: Get long-term loan scrore
const loadLongTermScore = async () => {
  await axiosInstance
    .get(`/score/g_long_term?idNumber=${route.params.slug}`)
    .then(response => (longTermScore.value = response.data.content))
    .catch(error => console.error(error));
};

onMounted(() => {
  loadCustomerInformation();
  loadCustomerStatement();
  loadCustomerAnalysis();
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
                  <h3 class="py-1 text-grey text-body-2">Customer</h3>
                  <h3 class="py-1 text-grey text-body-2">File Name</h3>
                  <h3 class="py-1 text-grey text-body-2">Phone</h3>
                  <h3 class="py-1 text-grey text-body-2">Email</h3>
                </v-col>
                <v-col
                  ><h3 class="py-1 text-body-2 text-blue">
                    {{ customerInformation[0]?.customer_names }}
                  </h3>
                  <h3 class="py-1 text-body-2">
                    {{ customerStatement[0]?.file_type }}
                  </h3>
                  <h3 class="py-1 text-body-2">
                    {{ customerInformation[0]?.phone_number }}
                  </h3>
                  <h3 class="py-1 text-body-2">
                    {{ customerInformation[0]?.email }}
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
                  <h3 class="py-1 text-grey text-body-2">Document Type</h3>
                  <h3 class="py-1 text-grey text-body-2">Status</h3>
                  <h3 class="py-1 text-grey text-body-2">Generated On</h3>
                  <h3 class="py-1 text-grey text-body-2">Currency</h3>
                </v-col>
                <v-col
                  ><h3 class="py-1 text-body-2 text-blue">
                    {{ customerStatement[0]?.documentName }}
                  </h3>
                  <h3 class="py-1 text-body-2">
                    {{ customerStatement[0]?.status }}
                  </h3>
                  <h3 class="py-1 text-body-2">
                    {{ customerStatement[0]?.date }}
                  </h3>
                  <h3 class="py-1 text-body-2"></h3
                ></v-col>
              </v-row>
            </v-container> </v-card
        ></v-col>
        <v-col
          ><v-card
            variant="flat"
            color="white"
            class="rounded"
          >
            <v-container>
              <v-row class="mx-2">
                <v-col cols="auto">
                  <h3 class="py-1 text-grey text-body-2">Received On</h3>
                  <h3 class="py-1 text-grey text-body-2">Submission Age</h3>
                  <h3 class="py-1 text-grey text-body-2">Period</h3>
                  <h3 class="py-1 text-grey text-body-2">Duration</h3>
                </v-col>
                <v-col
                  ><h3 class="py-1 text-body-2 text-blue">
                    {{ customerAnalysis[0]?.received_on }}
                  </h3>
                  <h3 class="py-1 text-body-2"></h3>
                  <h3 class="py-1 text-body-2">
                    {{ customerInformation[0]?.statement_period }}
                  </h3>
                  <h3 class="py-1 text-body-2">
                    {{ customerAnalysis[0]?.duration_in_months }} Months
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
                  <div class="mt-4 d-flex justify-space-between">
                    <h1 class="text-caption font-weight-bold">Title</h1>
                    <h1 class="text-caption font-weight-bold">Description</h1>
                  </div>
                  <v-divider
                    class="my-2"
                    :thickness="3"
                  ></v-divider>
                  <div class="mt-4 d-flex justify-space-between">
                    <h1 class="text-caption">Score</h1>
                    <h1 class="text-caption">
                      {{ mobileScore[0]?.net_score }} /
                      {{ mobileScore[0]?.gross_score }}
                    </h1>
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <div class="mt-4 d-flex justify-space-between">
                    <h1 class="text-caption font-weight-medium">Risk Level</h1>
                    <h1 class="text-caption">
                      {{ mobileScore[0]?.risk_level }}
                    </h1>
                  </div>
                  <v-divider
                    class="my-2"
                    :thickness="3"
                  ></v-divider>
                  <div class="mt-4 d-flex justify-space-between">
                    <h1 class="text-caption font-weight-medium">Highest</h1>
                    <h1 class="text-caption">KES</h1>
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <div class="mt-4 d-flex justify-space-between">
                    <h1 class="text-caption font-weight-medium">
                      Loanable (R)
                    </h1>
                    <h1 class="text-caption">
                      KES {{ formatter(mobileScore[0]?.loanable) }}
                    </h1>
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
                  <div class="mt-4 d-flex justify-space-between">
                    <h1 class="text-caption font-weight-bold">Title</h1>
                    <h1 class="text-caption font-weight-bold">Description</h1>
                  </div>
                  <v-divider
                    class="my-2"
                    :thickness="3"
                  ></v-divider>
                  <div class="mt-4 d-flex justify-space-between">
                    <h1 class="text-caption">Score</h1>
                    <h1 class="text-caption">
                      {{ longTermScore[0]?.net_score }} /
                      {{ longTermScore[0]?.gross_score }}
                    </h1>
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <div class="mt-4 d-flex justify-space-between">
                    <h1 class="text-caption font-weight-medium">Risk Level</h1>
                    <h1 class="text-caption">
                      {{ longTermScore[0]?.risk_level }}
                    </h1>
                  </div>
                  <v-divider
                    class="my-2"
                    :thickness="3"
                  ></v-divider>
                  <div class="mt-4 d-flex justify-space-between">
                    <h1 class="text-caption font-weight-medium">Highest</h1>
                    <h1 class="text-caption">
                      KES {{ formatter(longTermScore[0]?.highest) }}
                    </h1>
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <div class="mt-4 d-flex justify-space-between">
                    <h1 class="text-caption font-weight-medium">
                      Gross Loanable (R)
                    </h1>
                    <h1 class="text-caption">
                      KES {{ formatter(longTermScore[0]?.loanable_highest) }}
                    </h1>
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <div class="mt-4 d-flex justify-space-between">
                    <h1 class="text-caption font-weight-medium">
                      Net Loanable (R)
                    </h1>
                    <h1 class="text-caption">
                      KES
                      {{ formatter(longTermScore[0]?.net_loanable_highest) }}
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
