<script setup lang="ts"></script>

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
                  ><h3 class="text-body-2 py-1 text-blue">Tom Kimani</h3>
                  <h3 class="text-body-2 py-1">MPesa_statement</h3>
                  <h3 class="text-body-2 py-1">254712345678</h3>
                  <h3 class="text-body-2 py-1">tomkim@presta.co.ke</h3></v-col
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
                  ><h3 class="text-body-2 py-1 text-blue">Mpesa Statement</h3>
                  <h3 class="text-body-2 py-1">Completed</h3>
                  <h3 class="text-body-2 py-1">DD/MM/YYYY HH:MM</h3>
                  <h3 class="text-body-2 py-1">Kenyan Shilling</h3></v-col
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
                  ><h3 class="text-body-2 py-1 text-blue">DD/MM/YYYY HH:MM</h3>
                  <h3 class="text-body-2 py-1">1</h3>
                  <h3 class="text-body-2 py-1">DD/MM/YYYY - DD/MM/YYYY</h3>
                  <h3 class="text-body-2 py-1">12 Months</h3></v-col
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
                    <h1 class="text-caption">760 / 900</h1>
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <div class="d-flex justify-space-between mt-4">
                    <h1 class="text-caption font-weight-medium">Risk Level</h1>
                    <h1 class="text-caption">Insignificant</h1>
                  </div>
                  <v-divider
                    class="my-2"
                    :thickness="3"
                  ></v-divider>
                  <div class="d-flex justify-space-between mt-4">
                    <h1 class="text-caption font-weight-medium">Highest</h1>
                    <h1 class="text-caption">KES 19,400.00</h1>
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <div class="d-flex justify-space-between mt-4">
                    <h1 class="text-caption font-weight-medium">
                      Loanable (R)
                    </h1>
                    <h1 class="text-caption">KES 17,400.00</h1>
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
                    <h1 class="text-caption">860 / 900</h1>
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <div class="d-flex justify-space-between mt-4">
                    <h1 class="text-caption font-weight-medium">Risk Level</h1>
                    <h1 class="text-caption">Insignificant</h1>
                  </div>
                  <v-divider
                    class="my-2"
                    :thickness="3"
                  ></v-divider>
                  <div class="d-flex justify-space-between mt-4">
                    <h1 class="text-caption font-weight-medium">Highest</h1>
                    <h1 class="text-caption">KES 0.00</h1>
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <div class="d-flex justify-space-between mt-4">
                    <h1 class="text-caption font-weight-medium">
                      Gross Loanable (R)
                    </h1>
                    <h1 class="text-caption">KES 79,400.00 - 91,400.00</h1>
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <div class="d-flex justify-space-between mt-4">
                    <h1 class="text-caption font-weight-medium">
                      Net Loanable (R)
                    </h1>
                    <h1 class="text-caption">KES 79,400.00 - 91,400.00</h1>
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
