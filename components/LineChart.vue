<template>
    <Line :data="data" :options="options" />
</template>

<script>
import { Line } from "vue-chartjs";
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
        Line,
    },
    data() {
        return LineChartConfig;
    },
};
</script>
