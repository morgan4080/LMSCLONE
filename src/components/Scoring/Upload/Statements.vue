<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import axiosInstance from "@/services/api/axiosInstance";

import CustomTable from "@/components/Scoring/Upload/CustomTable.vue";
// import stores from "@/store";
// import { fi } from "vuetify/locale";

interface Bank {
  bankName: string;
  bankCode: string;
}

// const banks = ["NCBA", "KCB", "Equity", "Coop"];
const banks = ref<string[]>([])
const mobile = ["MPESA", "Airtel Money"];
const searchUploadedStatement = ref("");
const headers = ref<
  {
    title: string;
    key: string;
    align: string;
    sortable: boolean;
    visible: boolean;
  }[]
>([
  {
    title: "#",
    align: "start",
    sortable: false,
    key: "id",
    visible: true,
  },
  {
    title: "Statement Type",
    key: "statement",
    align: "start",
    sortable: false,
    visible: true,
  },
  {
    title: "File Name",
    key: "fileName",
    align: "start",
    sortable: false,
    visible: true,
  },
  {
    title: "Status",
    key: "status",
    align: "start",
    sortable: false,
    visible: true,
  },
  {
    title: "Duration",
    key: "duration",
    align: "start",
    sortable: false,
    visible: true,
  },
  {
    title: "Upload Date",
    key: "uploadDate",
    align: "start",
    sortable: false,
    visible: true,
  },
  {
    title: "Uploader",
    key: "customer",
    align: "start",
    sortable: false,
    visible: true,
  },
  {
    title: "Actions",
    key: "actions",
    align: "end",
    sortable: false,
    visible: true,
  },
]);
const statements = ref<{ id: number; name: string }[]>([
  {
    id: 1,
    name: "BANK",
  },
  {
    id: 2,
    name: "MOBILE",
  },
]);
const status = [
  {
    text: "Failed",
    color: "red",
    bg_color: "red-lighten-1",
  },
  {
    text: "Completed",
    color: "green-darken-3",
    bg_color: "green-lighten-1",
  },
  {
    text: "Processing",
    color: "blue-darken-4",
    bg_color: "bg-lighten-1",
  },
  {
    text: "Waiting",
    color: "yellow",
    bg_color: "yellow-lighten-1",
  },
];

const filters = reactive<{
  type: string | null;
  provider: string | null;
  status: string | null;
}>({
  type: "All",
  provider: null,
  status: null,
});

function changeVisibility(key: string) {
  headers.value.forEach(header => {
    if (header.key === key) {
      header.visible = !header.visible;
      header.align = header.align === " d-none" ? " start" : " d-none";
    }
  });
}

// API Call: Get list of banks
const loadBanks = async () => {
  await axiosInstance
    .get("/banks/list")
    .then(response => {
      banks.value = response.data.map((bank: Bank) => bank.bankCode);
    })
    .catch(error => console.error(error));
};

const params = ref("");

watch(filters, () => {
  params.value = "";
  filters.type &&
    filters.type.toLowerCase() != "all" &&
    (params.value += `&docType=${filters.type}`);

  filters.provider && (params.value += `&bankCode=${filters.provider}`);
  filters.status && (params.value += `&status=${filters.status}`);
});

onMounted(()=>{
  loadBanks()
})
</script>

<template>
  <v-container fluid>
    <v-responsive>
      <v-row class="bg-white rounded">
        <v-col>
          <v-container>
            <div class="d-flex justify-space-between">
              <div>
                <h1 class="text-h6 font-weight-regular">
                  Recently Uploaded Statement
                </h1>
                <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                  Summary Of Recently Uploaded Statements
                </h2>
              </div>
              <div class="align-center d-flex">
                <v-input
                  v-model="searchUploadedStatement"
                  hide-details
                  class="font-weight-light"
                  density="compact"
                >
                  <template v-slot:default>
                    <input
                      class="px-2 border rounded rounded-e-0 text-caption w-100 searchField"
                      type="text"
                      placeholder="Search Here"
                    />
                    <v-btn
                      variant="tonal"
                      size="small"
                      class="rounded-s-0"
                    >
                      <span>GO</span>
                    </v-btn>
                  </template>
                </v-input>
              </div>
            </div>
            <v-row class="mt-12">
              <v-col>
                <v-menu transition="slide-y-transition">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      variant="outlined"
                      append-icon="mdi:mdi-chevron-down"
                      v-bind="props"
                      class="text-none text-caption"
                      style="border: 1px solid rgba(128, 128, 128, 0.25)"
                    >
                      {{ filters.type || "All" }} Statements
                    </v-btn>
                  </template>
                  <v-sheet
                    border
                    rounded
                  >
                    <v-list
                      nav
                      density="compact"
                      role="listbox"
                    >
                      <v-list-item
                        @click="
                          (filters.type = 'All') && (filters.provider = null)
                        "
                        value="All"
                        >All</v-list-item
                      >
                      <v-list-item
                        @click="filters.type = item.name"
                        v-for="(item, idx) in statements"
                        :key="idx"
                        :value="item"
                        >{{ item.name }}</v-list-item
                      >
                    </v-list>
                  </v-sheet>
                </v-menu>

                <v-menu
                  transition="slide-y-transition"
                  v-if="filters.type.toLowerCase() === 'bank'"
                >
                  <template v-slot:activator="{ props }">
                    <v-btn
                      variant="outlined"
                      append-icon="mdi:mdi-chevron-down"
                      v-bind="props"
                      class="ml-4 text-none text-caption"
                      style="border: 1px solid rgba(128, 128, 128, 0.25)"
                    >
                      {{
                        filters.provider === null
                          ? "Select Bank"
                          : filters.provider
                      }}
                    </v-btn>
                  </template>
                  <v-sheet
                    border
                    rounded
                  >
                    <v-list
                      nav
                      density="compact"
                      role="listbox"
                    >
                      <v-list-item
                        @click="filters.provider = null"
                        value="null"
                        >View All</v-list-item
                      >
                      <v-list-item
                        v-for="(item, idx) in banks"
                        @click="filters.provider = item"
                        :key="idx"
                        :value="item"
                        >{{ item }}</v-list-item
                      >
                    </v-list>
                  </v-sheet>
                </v-menu>
                <v-menu
                  transition="slide-y-transition"
                  v-if="filters.type.toLowerCase() === 'mobile'"
                >
                  <template v-slot:activator="{ props }">
                    <v-btn
                      variant="outlined"
                      append-icon="mdi:mdi-chevron-down"
                      v-bind="props"
                      class="ml-4 text-none text-caption"
                      style="border: 1px solid rgba(128, 128, 128, 0.25)"
                    >
                      {{
                        filters.provider === null
                          ? "Select Mobile"
                          : filters.provider
                      }}
                    </v-btn>
                  </template>
                  <v-sheet
                    border
                    rounded
                  >
                    <v-list
                      nav
                      density="compact"
                      role="listbox"
                    >
                      <v-list-item
                        @click="filters.provider = null"
                        value="null"
                        >View All</v-list-item
                      >
                      <v-list-item
                        v-for="(item, idx) in mobile"
                        @click="filters.provider = item"
                        :key="idx"
                        :value="item"
                        >{{ item }}</v-list-item
                      >
                    </v-list>
                  </v-sheet>
                </v-menu>

                <v-menu transition="slide-y-transition">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      variant="outlined"
                      append-icon="mdi:mdi-chevron-down"
                      v-bind="props"
                      class="ml-4 text-none text-caption"
                      style="border: 1px solid rgba(128, 128, 128, 0.25)"
                    >
                      {{
                        filters.status === null
                          ? "Select Status"
                          : filters.status
                      }}
                    </v-btn>
                  </template>
                  <v-sheet
                    border
                    rounded
                  >
                    <v-list
                      nav
                      density="compact"
                      role="listbox"
                    >
                      <v-list-item
                        @click="filters.status = null"
                        value="null"
                        >View All</v-list-item
                      >
                      <v-list-item
                        v-for="(item, idx) in status"
                        @click="filters.status = item.text"
                        :key="idx"
                        :value="item.text"
                        >{{ item.text }}</v-list-item
                      >
                    </v-list>
                  </v-sheet>
                </v-menu>
              </v-col>
              <v-col class="justify-end d-flex">
                <v-menu transition="slide-y-transition">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      variant="outlined"
                      append-icon="mdi:mdi-chevron-down"
                      v-bind="props"
                      class="mr-4 text-none text-caption"
                      style="border: 1px solid rgba(128, 128, 128, 0.25)"
                    >
                      Show / Hide
                    </v-btn>
                  </template>
                  <v-sheet
                    border
                    rounded
                  >
                    <v-list
                      nav
                      density="compact"
                      role="listbox"
                    >
                      <v-list-item
                        v-for="(item, idx) in headers"
                        @click="changeVisibility(item.key)"
                        :key="idx"
                        :value="item"
                      >
                        <v-icon
                          v-if="item.visible"
                          icon="mdi:mdi-check"
                        />
                        {{ item.title }}</v-list-item
                      >
                    </v-list>
                  </v-sheet>
                </v-menu>
              </v-col>
            </v-row>
            <CustomTable
              :params="params"
              :headers="headers"
            />
          </v-container>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>
