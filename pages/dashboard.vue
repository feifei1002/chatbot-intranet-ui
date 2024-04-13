<template>
    <div class="flex justify-center bg-chatbot-black">
        <!-- All content goes here -->

        <button @click="getChartData()">Click to test request</button>

        <div>
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
const { data } = useAuth();
const config = useRuntimeConfig();

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

const getChartData = async () => {
    try {
        // sets 'conversations' to values from get request
        const json = await $fetch(`${config.public.apiURL}/admin/chat_analytics`, {
            method: "POST",
        });
        console.log("returned json is: ", json);
    } catch (error) {
        console.error("Error fetching analytics: ", error);
    }
};
</script>
