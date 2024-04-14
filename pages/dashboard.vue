<template>
    <div class="flex justify-center bg-chatbot-black">
        <!-- All content goes here -->
        <div>
            <div class="mt-10">
                <button @click="getChartData()">Click to test request</button>
            </div>

            <div v-if="chart" class="mt-10">
                <canvas ref="chart" width="400" height="400"></canvas>
            </div>

            <div class="mt-10 flex text-black">
                <TopStats
                    :stat-title="$t('dashboard.conversations')"
                    :stat-timerange="$t('dashboard.lastMinute')"
                    stat-value="69"
                >
                </TopStats>
                <TopStats
                    :stat-title="$t('dashboard.conversations')"
                    :stat-timerange="$t('dashboard.avgLasthour')"
                    stat-value="69"
                ></TopStats>
                <TopStats
                    :stat-title="$t('dashboard.authUserMessage')"
                    :stat-timerange="$t('dashboard.avg24hr')"
                    stat-value="69"
                ></TopStats>
                <TopStats
                    :stat-title="$t('dashboard.unauthUserMessage')"
                    :stat-timerange="$t('dashboard.avg24hr')"
                    stat-value="69"
                ></TopStats>
                <TopStats
                    :stat-title="$t('dashboard.msgCount')"
                    :stat-timerange="$t('dashboard.sentReceived24h')"
                    stat-value="69"
                ></TopStats>
            </div>

            <!-- Second set of divs -->
            <div class="mt-10">
                <div>
                    <h1 class="font-mono text-xl uppercase">{{ $t("dashboard.activityThisHour") }}</h1>
                    <div class="flex">
                        <MidStats :stat-title="$t('dashboard.activeConversations')">
                            <LineChart :data="DummyDataLine" />
                        </MidStats>
                        <MidStats :stat-title="$t('dashboard.msgCount')">
                            <LineChart :data="DummyDataLine" />
                        </MidStats>
                        <MidStats :stat-title="$t('dashboard.toolUsage')">
                            <PieChart :data="DummyDataPie" />
                        </MidStats>
                    </div>
                </div>
            </div>

            <!-- Third set of divs -->
            <div class="mt-10">
                <div>
                    <h1 class="font-mono text-xl uppercase">{{ $t("dashboard.historicalStats") }}</h1>
                    <div class="flex">
                        <BottomStats :stat-title="$t('dashboard.numberOfConv24h')">
                            <LineChart :data="DummyDataLine" />
                        </BottomStats>
                        <BottomStats :stat-title="$t('dashboard.numberOfConv7d')">
                            <LineChart :data="DummyDataLine" />
                        </BottomStats>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
//Utilise the useAuth hook to retrieve the authentication data.
import { Chart } from "chart.js";

const { data } = useAuth();
const config = useRuntimeConfig();

let chart = null;
const refs = {};

// Check if the 'admin' property exists and has a truthy value in the 'data.value' object.
if (!data.value?.admin) {
    // If the 'admin' property is missing, undefined, or false, redirect the user to the homepage.
    navigateTo("/");
    console.log(data.value.admin);
}

const DummyDataLine = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [40, 39, 10, 40, 39, 80, 40],
        },
    ],
};

const DummyDataPie = {
    labels: ["Dylan", "Ayman", "Fei", "Jashan", "Kavin", "Alex"],
    datasets: [
        {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
            data: [40, 20, 80, 10, 50, 60],
        },
    ],
};

// test chart
const renderChart = data => {
    const ctx = refs.chart.getContext("2d");
    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: "Data",
                    data: data.values,
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {},
    });
};

const getChartData = async () => {
    try {
        // gets response with query id for request
        const jsonWithQueryID = await $fetch(`${config.public.apiURL}/admin/chat_analytics`, {
            method: "POST",
        });
        console.log("returned json including query ID is: ", jsonWithQueryID);

        // get query id from json response
        const queryId = jsonWithQueryID.id;

        // get request with query id
        const jsonResponse = await $fetch(`${config.public.apiURL}/admin/get_analytics/${queryId}`, {
            method: "GET",
        });
        console.log("response for that ID is ", jsonResponse);

        renderChart(jsonResponse);
    } catch (error) {
        console.error("Error fetching analytics: ", error);
    }
};
</script>
