<template>
    <div class="flex h-screen justify-center bg-chatbot-black">
        <!-- All content goes here -->
        <div>
            <div class="mt-10 flex text-black">
                <TopStats statTitle="Conversations" statTimerange="Last Minute" statValue="69"></TopStats>
                <TopStats statTitle="Conversations" statTimerange="Average over last hour" statValue="69"></TopStats>
                <TopStats
                    statTitle="Authenicated User Messages"
                    statTimerange="Average over last 24h"
                    statValue="69"
                ></TopStats>
                <TopStats
                    statTitle="Unauthenicated User Messages"
                    statTimerange="Average over last 24h"
                    statValue="69"
                ></TopStats>
                <TopStats statTitle="Message count" statTimerange="Sent+Received last 24h" statValue="69"></TopStats>
            </div>

            <!-- Second set of divs -->
            <div class="mt-10">
                <div>
                    <h1 class="font-mono text-xl">ACTIVITY THIS HOUR</h1>
                    <div class="flex">
                        <MidStats statTitle="Active Conversations">
                            <LineChart />
                        </MidStats>
                        <MidStats statTitle="Message Count">
                            <LineChart />
                        </MidStats>
                        <MidStats statTitle="Tool Usage">
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
                        <div class="relative mr-8 h-80 w-64 grow rounded bg-chatbot-white p-12">
                            <span
                                class="absolute left-0 top-0 inline-block w-full rounded-t bg-gray-300 py-2 text-xs font-semibold uppercase text-black"
                                >Number of conversations (24h)</span
                            >
                            <LineChart />
                        </div>
                        <div class="relative h-80 w-64 grow rounded bg-chatbot-white p-12">
                            <span
                                class="absolute left-0 top-0 inline-block w-full rounded-t bg-gray-300 py-2 text-xs font-semibold uppercase text-black"
                                >Number of conversations (7d)</span
                            >
                            <LineChart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TopStats from "@/components/TopStats.vue";
import MidStats from "@/components/MidStats.vue";
import PieChart from "~/components/PieChart.vue";
</script>
