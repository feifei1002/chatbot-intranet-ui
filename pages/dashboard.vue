<template>
    <div class="flex h-screen justify-center bg-chatbot-black">
        <!-- All content goes here -->
        <div>
            <div class="mt-10 flex text-black">
                <TopStats stat-title="Conversations" stat-timerange="Last Minute" stat-value="69"> </TopStats>
                <TopStats stat-title="Conversations" stat-timerange="Average over last hour" stat-value="69"></TopStats>
                <TopStats
                    stat-title="Authenicated User Messages"
                    stat-timerange="Average over last 24h"
                    stat-value="69"
                ></TopStats>
                <TopStats
                    stat-title="Unauthenicated User Messages"
                    stat-timerange="Average over last 24h"
                    stat-value="69"
                ></TopStats>
                <TopStats stat-title="Message count" stat-timerange="Sent+Received last 24h" stat-value="69"></TopStats>
            </div>

            <!-- Second set of divs -->
            <div class="mt-10">
                <div>
                    <h1 class="font-mono text-xl">ACTIVITY THIS HOUR</h1>
                    <div class="flex">
                        <MidStats stat-title="Active Conversations">
                            <LineChart />
                        </MidStats>
                        <MidStats stat-title="Message Count">
                            <LineChart />
                        </MidStats>
                        <MidStats stat-title="Tool Usage">
                            <PieChart />
                        </MidStats>
                    </div>
                </div>
            </div>

            <!-- Third set of divs -->
            <div class="mt-10">
                <div>
                    <h1 class="font-mono text-xl">HISTORICAL STATS</h1>
                    <div class="flex">
                        <BottomStats stat-title="Number of conversations (24hr)">
                            <LineChart />
                        </BottomStats>
                        <BottomStats stat-title="Number of conversations (7d)">
                            <LineChart />
                        </BottomStats>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Utilise the useAuth hook to retrieve the authentication data.
const { data } = useAuth();

// Check if the 'admin' property exists and has a truthy value in the 'data.value' object.
if (!data.value?.admin) {
    // If the 'admin' property is missing, undefined, or false, redirect the user to the homepage.
    navigateTo("/");
}
</script>
