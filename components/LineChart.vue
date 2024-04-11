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
// import * as LineChartConfig from "../config/LineChartConfig";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "Data One",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            data: [65, 59, 80, 81, 56, 55, 40],
        },
    ],
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
};
</script>
