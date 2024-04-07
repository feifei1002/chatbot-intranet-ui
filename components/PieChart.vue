<template>
    <Doughnut :data="data" :options="options" />
</template>

<script>
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import * as PieChartConfig from "../config/PieChartConfig";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
    name: "App",
    components: {
        Doughnut,
    },
    data() {
        return PieChartConfig;
    },
};
</script>
