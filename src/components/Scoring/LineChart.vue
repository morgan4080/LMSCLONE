<script setup lang="ts">
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  LineElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { onBeforeMount, ref } from "vue";
ChartJS.register(
  Title,
  PointElement,
  LineElement,
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
    datasets: [{ label: "Flow Data", data: data, borderColor: randomColors() }],
  };
  chartOptions.value = {
    plugins: {
      legend: {
        position: "right",
        display: false,
      },
    },
  };
});
</script>

<template>
  <Line
    :data="chartData"
    :options="chartOptions"
  />
</template>
