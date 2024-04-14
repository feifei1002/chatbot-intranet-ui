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
                    <h1 class="font-mono text-xl uppercase">{{ $t("dashboard.recentActivity") }}</h1>
                    <div class="flex">
                        <MidStats :stat-title="$t('dashboard.numberOfConv24h')">
                            <LineChart :data="convDayDataLine" :options="tsOptionsHour" />
                        </MidStats>
                        <MidStats :stat-title="$t('dashboard.numberOfConv1h')">
                            <LineChart :data="convHourDataLine" :options="tsOptionsMinute" />
                        </MidStats>
                        <MidStats :stat-title="$t('dashboard.toolUsage')">
                            <PieChart :data="toolsPieChart" />
                        </MidStats>
                    </div>
                </div>
            </div>

<!--            <p>{{ jsonData.conversations_1h_chart }}</p>-->
            <!-- Third set of divs -->
            <div class="mt-10">
                <div>
                    <h1 class="font-mono text-xl uppercase">{{ $t("dashboard.historicalStats") }}</h1>
                    <div class="flex">
                        <BottomStats :stat-title="$t('dashboard.numberOfMessages7d')">
                            <LineChart :data="messages7DataLine" :options="tsOptionsDay" />
                        </BottomStats>
                        <BottomStats :stat-title="$t('dashboard.numberOfConv7d')">
                            <LineChart :data="conversations7DataLine" :options="tsOptionsDay" />
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

const tsOptionsDay = {
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
        },
    },
};

const tsOptionsHour = {
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
                unit: "hour",
            },
            ticks: {
                stepSize: 2, // set the step size to 2 hours
                maxRotation: 45,
                minRotation: 30,
            },
        },
    },
};

const tsOptionsMinute = {
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
                unit: "minute",
            },
            ticks: {
                stepSize: 5, // set the step size to 5 minutes
                maxRotation: 45,
                minRotation: 30,
            },
        },
    },
};

const conversationsSevenData = jsonData.value?.conversations_7d_chart || [];
const messagesSevenData = jsonData.value?.messages_7d_chart || [];
const conversationsDayData = jsonData.value?.conversations_1d_chart || [];
const conversationsHourData = jsonData.value?.conversations_1h_chart || [];


const conversations7DataLine = {
    datasets: [
        {
            label: "Conversations",
            data: conversationsSevenData.map(item => ({
                x: new Date(item.x),
                y: item.y,
            })),
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
        },
    ],
};

const messages7DataLine = {
    datasets: [
        {
            label: "Messages",
            data: messagesSevenData.map(item => ({
                x: new Date(item.x),
                y: item.y,
            })),
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
        },
    ],
};

const convDayDataLine = {
    datasets: [
        {
            label: "Conversations",
            data: conversationsDayData.map(item => ({
                x: new Date(item.x),
                y: item.y,
            })),
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
        },
    ],
};

const convHourDataLine = {
    datasets: [
        {
            label: "Conversations",
            data: conversationsHourData.map(item => ({
                x: new Date(item.x),
                y: item.y,
            })),
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
        },
    ],
};

const toolsData = jsonData.value?.tools;

const toolsPieChart = {
    labels: Object.keys(toolsData),
    datasets: [
        {
            backgroundColor: ["#41B883", "#E46651"],
            data: Object.values(toolsData),
        },
    ],
};
</script>
