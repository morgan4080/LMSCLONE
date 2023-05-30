<script setup lang="ts">
import { ref } from "vue";
import {
  dateDiffInMonths,
  dateFromTimestamp,
  timeFromTimestamp,
} from "@/helpers";

const selected = ref([]);
const tableData = ref([]);
const loading = ref(false);
const totalItems = ref(30);
const headers = ref<
  { title: string; key: string; align: string; sortable: boolean }[]
>([
  {
    title: "#",
    align: "start",
    sortable: false,
    key: "id",
  },
  {
    title: "Statement Type",
    key: "statement",
    align: "end",
    sortable: false,
  },
  { title: "File Name", key: "file_name", align: "end", sortable: false },
  { title: "Status", key: "status", align: "end", sortable: false },
  { title: "Duration", key: "duration", align: "end", sortable: false },
  { title: "Upload Date", key: "upload", align: "end", sortable: false },
  { title: "Uploader", key: "uploader", align: "end", sortable: false },
]);

async function loadData() {
  loading.value = true;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  await fetch("http://localhost:5000/lms", {
    method: "GET",
    headers: myHeaders,
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error(res.statusText);
    })
    .then((data) => {
      tableData.value = data;
    })
    .finally(() => (loading.value = false));
}
</script>

<template>
  <v-data-table-server
    class="text-caption"
    v-model="selected"
    :headers="headers"
    :items-length="totalItems"
    :items="tableData"
    :loading="loading"
    loading-text="Loading...Please Wait"
    @update:options="loadData"
  >
    <template v-slot:item.statement="{ item }">
      <span
        class="text-caption text-white pa-1 rounded"
        :class="
          item.props.title.statement_type.toLowerCase() === 'mobile'
            ? 'bg-green-darken-2'
            : 'bg-blue-darken-4'
        "
      >
        {{ item.props.title.statement_type }}
      </span>
      <span class="border text-blue pa-1 ml-2 rounded">
        {{ item.props.title.provider }}
      </span>
    </template>
    <template v-slot:item.status="{ item }">
      <span
        class="py-1 px-3 rounded"
        :class="{
          'bg-red-lighten-5 text-red':
            item.props.title.status.toLowerCase() === 'failed',
          'bg-green-lighten-5 text-green':
            item.props.title.status.toLowerCase() === 'completed',
          'bg-blue-lighten-5 text-blue':
            item.props.title.status.toLowerCase() === 'processing',
          'bg-yellow-lighten-5 text-yellow-darken-3':
            item.props.title.status.toLowerCase() === 'waiting',
        }"
        >{{ item.props.title.status }}</span
      >
    </template>
    <template v-slot:item.duration="{ item }">
      {{
        dateDiffInMonths(
          item.props.title.statement_start_period,
          item.props.title.statement_end_period
        )
      }}
      Months
    </template>
    <template v-slot:item.upload="{ item }">
      <p>{{ dateFromTimestamp(item.props.title.upload_time) }}</p>
      <p>{{ timeFromTimestamp(item.props.title.upload_time) }}</p>
    </template>
    <template v-slot:item.uploader="{ item }">
      <p>{{ item.props.title.full_name }}</p>
      <p>{{ item.props.title.phone_number }}</p>
    </template>
  </v-data-table-server>
</template>
