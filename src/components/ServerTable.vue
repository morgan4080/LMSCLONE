<template>
  <v-data-table-server
    v-model="selected"
    :headers="headers"
    :items-length="totalItems"
    :items="serverItems"
    :loading="loading"
    :search="search"
    item-value="name"
    show-select
    @update:options="loadItems"
  >
    <template v-slot:[`item.protein`]="{ item }">
      <v-chip :color="getColor(item.raw.calories)">
        {{ item.raw.protein }}
      </v-chip>
    </template>
  </v-data-table-server>
</template>

<script setup lang="ts">
import { ref } from "vue";

const data = ref<
  {
    name: string;
    calories: number;
    fat: number;
    carbs: number;
    protein: number;
    iron: string;
  }[]
>([
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: "1",
  },
  {
    name: "Jelly bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: "0",
  },
  {
    name: "KitKat",
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: "6",
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: "7",
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: "16",
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: "1",
  },
  {
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: "2",
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: "8",
  },
  {
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: "45",
  },
  {
    name: "Donut",
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: "22",
  },
]);

const headers = ref<
  { title: string; key: string; align: string; sortable: boolean }[]
>([
  {
    title: "Dessert (100g serving)",
    align: "start",
    sortable: false,
    key: "name",
  },
  { title: "Calories", key: "calories", align: "end", sortable: false },
  { title: "Fat (g)", key: "fat", align: "end", sortable: false },
  { title: "Carbs (g)", key: "carbs", align: "end", sortable: false },
  { title: "Protein (g)", key: "protein", align: "end", sortable: false },
  { title: "Iron (%)", key: "iron", align: "end", sortable: false },
]);

const itemsPerPage = ref(5);
const serverItems = ref([]);
const selected = ref([]);
const loading = ref(true);
const totalItems = ref(0);
const search = ref("");

const FakeAPI = {
  async fetch({
    page,
    itemsPerPage,
    sortBy,
  }: {
    page: number;
    itemsPerPage: number;
    sortBy: { key: any; order: any }[];
  }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const items = data.value.slice();

        if (sortBy.length) {
          const sortKey: number = sortBy[0].key;
          const sortOrder: string = sortBy[0].order;
          items.sort((a: any, b: any) => {
            const aValue = a[sortKey];
            const bValue = b[sortKey];
            return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
          });
        }

        const paginated = items.slice(start, end);

        resolve({ items: paginated, total: items.length });
      }, 500);
    });
  },
};

const loadItems = ({ page, itemsPerPage, sortBy }: any) => {
  loading.value = true;
  FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(
    ({ items, total }: any) => {
      serverItems.value = items;
      totalItems.value = total;
      loading.value = false;
    }
  );
};

const getColor = (calories: number) => {
  if (calories > 400) return "red";
  else if (calories > 200) return "orange";
  else return "green";
};
</script>

<style scoped></style>
