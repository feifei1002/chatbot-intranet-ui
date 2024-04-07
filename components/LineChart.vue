<template>
    <LineChart :data="data" :options="options" />
</template>

<script>
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

export default {
    name: "LineChart",
    components: {
        LineChart,
    },
    data() {
        return LineChartConfig;
    },
};
</script>
