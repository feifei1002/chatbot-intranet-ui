<script setup>
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import * as PieChartConfig from "../config/PieChartConfig";

ChartJS.register(ArcElement, Tooltip, Legend);

const { data, options } = PieChartConfig;

</script>

<template>
  <Doughnut :data="data" :options="options" />
</template>
