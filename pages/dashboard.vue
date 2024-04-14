<template>
    <div class="flex justify-center bg-chatbot-black">
        <!-- All content goes here -->
        <div>
            <div class="mt-10 flex text-black">
                <TopStats
                    :stat-title="$t('dashboard.conversations')"
                    :stat-timerange="$t('dashboard.lastMinute')"
                    :stat-value="jsonData?.conversation_1m"
                >
                </TopStats>
                <TopStats
                    :stat-title="$t('dashboard.conversations')"
                    :stat-timerange="$t('dashboard.avgLasthour')"
                    :stat-value="jsonData?.conversation_1h"
                ></TopStats>
                <TopStats
                    :stat-title="$t('dashboard.authUserMessage')"
                    :stat-timerange="$t('dashboard.avg24hr')"
                    :stat-value="jsonData?.authenticated_24h"
                ></TopStats>
                <TopStats
                    :stat-title="$t('dashboard.unauthUserMessage')"
                    :stat-timerange="$t('dashboard.avg24hr')"
                    :stat-value="jsonData?.unauthenticated_24h"
                ></TopStats>
                <TopStats
                    :stat-title="$t('dashboard.msgCount')"
                    :stat-timerange="$t('dashboard.sentReceived24h')"
                    :stat-value="jsonData?.messages_24h"
                ></TopStats>
            </div>

            <!-- Second set of divs -->
            <div class="mt-10">
                <div>
                    <h1 class="font-mono text-xl uppercase">{{ $t("dashboard.activityThisHour") }}</h1>
                    <div class="flex">
                        <MidStats :stat-title="$t('dashboard.activeConversations')">
                            <LineChart :data="conversationsDataLine" :options="tsOptions" />
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
definePageMeta({ middleware: "auth" });

const { data: authData } = useAuth();

// Check if the 'admin' property exists and has a truthy value in the 'data.value' object.
if (!authData.value?.admin) {
    // If the 'admin' property is missing, undefined, or false, redirect the user to the homepage.
    navigateTo("/");
}

const config = useRuntimeConfig();
const { token } = useAuth();

const { data: jsonData } = await useFetch(`${config.public.apiURL}/admin/query`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: token.value,
    },
});

const tsOptions = {
    maintainAspectRatio: false,
    scales: {
        x: {
            responsive: true,
            title: {
                display: true,
                text: "Time",
            },
            type: "time",
            time: {
                unit: "day",
            },
            backgroundColor: "#f87979",
        },
    },
};

const conversationsDataLine = {
    datasets: [
        {
            label: "Conversations",
            data: jsonData.conversations_7d_chart,
        },
    ],
};

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

// // test chart
// const renderChart = data => {
//     const ctx = refs.chart.getContext("2d");
//     chart = new Chart(ctx, {
//         type: "bar",
//         data: {
//             labels: data.labels,
//             datasets: [
//                 {
//                     label: "Data",
//                     data: data.values,
//                     backgroundColor: "rgba(75, 192, 192, 0.2)",
//                     borderColor: "rgba(75, 192, 192, 1)",
//                     borderWidth: 1,
//                 },
//             ],
//         },
//         options: {},
//     });
// };
</script>
