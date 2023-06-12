<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import CustomTable from "@/components/Scoring/Upload/CustomTable.vue";
import stores from "@/store";
const scoringStore = stores.scoringStore;
const banks = ["NCBA Bank", "KCB Bank", "Equity Bank", "Coop Bank"];
const statements = ref<{ id: number; name: string }[]>([
  {
    id: 1,
    name: "Bank Statement",
  },
  {
    id: 2,
    name: "Mobile Statement",
  },
]);
const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
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

const filters = reactive({
  type: "Bank Statement",
  provider: null,
  status: null,
});

const selectedStatement = ref<{ id: number; name: string }>(
  statements.value[0]
);

watch(selectedStatement, () => {
  console.log(selectedStatement.value, "selectedStatement");
});
</script>

<template>
  <v-container fluid>
    <v-responsive>
      <v-row class="bg-white rounded">
        <v-col>
          <v-container>
            <div>
              <h1 class="text-h6 font-weight-regular">
                Recently Uploaded Statement
              </h1>
              <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                Summary Of Recently Uploaded Statements
              </h2>
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
                      {{ selectedStatement.name }}
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
                        @click="selectedStatement = item"
                        v-for="(item, idx) in statements"
                        :key="idx"
                        :value="item"
                        >{{ item.name }}</v-list-item
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
                        v-for="(item, idx) in banks"
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
                        v-for="(item, idx) in status"
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
            <CustomTable />
          </v-container>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>
