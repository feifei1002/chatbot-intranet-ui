<template>
    <LineChart :data="data" :options="options" />
</template>

<script setup>
import { Line as LineChart } from "vue-chartjs";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import * as LineChartConfig from "../config/LineChartConfig";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const { data, options } = LineChartConfig;
</script>
