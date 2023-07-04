<script setup lang="ts">
import { Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { onBeforeMount, ref } from "vue";
ChartJS.register(
  Title,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const props = defineProps<{
  propData: {
    labels: string[];
    data: string[];
  };
}>();

const bgColors = ref<string[]>([]);
const data = ref();
const labels = ref<string[]>();
const chartData = ref();
const chartOptions = ref();

function populateColors(arr: string[]) {
  arr.forEach(i => bgColors.value.push(randomColors()));
}
function randomColors() {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
}

onBeforeMount(() => {
  labels.value = props.propData.labels;
  data.value = props.propData.data;
  populateColors(data.value);
  chartData.value = {
    labels: labels,
    datasets: [{ data: data, backgroundColor: bgColors }],
  };
  chartOptions.value = {
    plugins: {
      legend: {
        position: "right",
      },
    },
  };
});
</script>

<template>
  <Doughnut
    style="display: inline !important"
    :data="chartData"
    :options="chartOptions"
  />
</template>
