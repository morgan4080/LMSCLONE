<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import CustomTable from "@/components/Scoring/Upload/CustomTable.vue";
import ListingTableData from "@/components/Scoring/All/ListingTableData.vue";

const banks = ["NCBA", "KCB", "Equity", "Coop"];
const mobile = ["Mpesa", "Airtel Money"];
const params = ref("");
const statements = ref<{ id: number; name: string }[]>([
  {
    id: 1,
    name: "Bank",
  },
  {
    id: 2,
    name: "Mobile",
  },
]);
const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
const headers = ref<
  {
    title: string;
    key: string;
    align: string;
    sortable: boolean;
    visible: boolean;
  }[]
>([
  { title: "#", key: "id", align: "start", sortable: false, visible: true },
  {
    title: "Upload Date",
    key: "uploadDate",
    align: "start",
    sortable: false,
    visible: true,
  },
  {
    title: "Customer",
    key: "customername",
    align: "start",
    sortable: false,
    visible: true,
  },
  {
    title: "Statement Type",
    key: "statementtype",
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
    title: "Statement Period",
    key: "statementPeriod",
    align: "start",
    sortable: false,
    visible: true,
  },
  {
    title: "Password",
    key: "password",
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
    if (header.key === key) header.visible = !header.visible;
  });
}

watch(filters, () => {
  params.value = "";
  filters.type &&
    filters.type.toLowerCase() != "all" &&
    (params.value += `&type=${filters.type}`);

  filters.provider && (params.value += `&statementtype=${filters.provider}`);
  filters.status && (params.value += `&status=${filters.status}`);
});
</script>

<template>
  <v-container fluid>
    <v-responsive>
      <v-row class="bg-white rounded">
        <v-col>
          <v-container>
            <div>
              <h1 class="text-h6 font-weight-regular">Statement Listing</h1>
              <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                A List Of All Uploaded Statements
              </h2>
            </div>
            <v-row class="mt-12">
              <v-col>
                <!--                <v-menu transition="slide-y-transition">-->
                <!--                  <template v-slot:activator="{ props }">-->
                <!--                    <v-btn-->
                <!--                      variant="outlined"-->
                <!--                      append-icon="mdi:mdi-chevron-down"-->
                <!--                      v-bind="props"-->
                <!--                      class="text-none text-caption"-->
                <!--                      style="border: 1px solid rgba(128, 128, 128, 0.25)"-->
                <!--                    >-->
                <!--                      Select Customer-->
                <!--                    </v-btn>-->
                <!--                  </template>-->
                <!--                  <v-sheet-->
                <!--                    border-->
                <!--                    rounded-->
                <!--                  >-->
                <!--                    <v-list-->
                <!--                      nav-->
                <!--                      density="compact"-->
                <!--                      role="listbox"-->
                <!--                    >-->
                <!--                      <v-list-item-->
                <!--                        v-for="(item, idx) in options"-->
                <!--                        :key="idx"-->
                <!--                        :value="item"-->
                <!--                        >{{ item }}</v-list-item-->
                <!--                      >-->
                <!--                    </v-list>-->
                <!--                  </v-sheet>-->
                <!--                </v-menu>-->

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
                      class="text-none text-caption ml-4"
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
                      class="text-none text-caption ml-4"
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
                      class="text-none text-caption ml-4"
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
              <v-col class="d-flex justify-end">
                <v-menu transition="slide-y-transition">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      variant="outlined"
                      append-icon="mdi:mdi-chevron-down"
                      v-bind="props"
                      class="text-none text-caption mr-4"
                      style="border: 1px solid rgba(128, 128, 128, 0.25)"
                    >
                      Export
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
                        v-for="(item, idx) in options"
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
                      class="text-none text-caption mr-4"
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
                <v-menu transition="slide-y-transition">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      variant="outlined"
                      v-bind="props"
                      class="text-none text-caption"
                      style="border: 1px solid rgba(128, 128, 128, 0.25)"
                    >
                      <v-icon icon="mdi:mdi-dots-vertical"></v-icon>
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
                        v-for="(item, idx) in options"
                        :key="idx"
                        :value="item"
                        >{{ item }}</v-list-item
                      >
                    </v-list>
                  </v-sheet>
                </v-menu>
              </v-col>
            </v-row>
            <ListingTableData
              :headers="headers"
              :params="params"
            />
          </v-container>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>
