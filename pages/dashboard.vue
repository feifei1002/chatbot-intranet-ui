<script></script>

<template>
    <div class="flex h-screen justify-center bg-chatbot-black">
        <!-- All content goes here -->
        <div>
            <div class="mt-10 flex text-black">
                <!-- First set of divs -->
                <div class="relative mr-8 flex h-32 w-72 flex-col rounded border border-gray-300 bg-chatbot-white p-12">
                    <div class="absolute left-2 top-2 flex flex-col uppercase">
                        <span class="font-sans font-bold">conversations</span>
                        <span>last minute</span>
                        <span class="font-sans font-bold">69</span>
                    </div>
                </div>
                <div class="relative mr-8 flex h-32 w-72 flex-col rounded border border-gray-300 bg-chatbot-white p-12">
                    <div class="absolute left-2 top-2 flex flex-col uppercase">
                        <span class="font-sans font-bold">conversations</span>
                        <span>average over last hour</span>
                        <span class="font-sans font-bold">69</span>
                    </div>
                </div>
                <div class="relative mr-8 flex h-32 w-72 flex-col rounded border border-gray-300 bg-chatbot-white p-12">
                    <div class="absolute left-2 top-2 flex flex-col uppercase">
                        <span class="font-sans font-bold">conversations</span>
                        <span>average over last 24h</span>
                        <span class="font-sans font-bold">69</span>
                    </div>
                </div>
                <div class="relative mr-8 flex h-32 w-72 flex-col rounded border border-gray-300 bg-chatbot-white p-12">
                    <div class="absolute left-2 top-2 flex flex-col uppercase">
                        <span class="font-sans font-bold">messages/conversations</span>
                        <span>average over last 24h</span>
                        <span class="font-sans font-bold">69</span>
                    </div>
                </div>
                <div class="relative mr-8 flex h-32 w-72 flex-col rounded border border-gray-300 bg-chatbot-white p-12">
                    <div class="absolute left-2 top-2 flex flex-col uppercase">
                        <span class="font-sans font-bold">conversation length</span>
                        <span>average over last 24h</span>
                        <span class="font-sans font-bold">69:69:69</span>
                    </div>
                </div>
                <div class="relative flex h-32 w-72 flex-col rounded border border-gray-300 bg-chatbot-white p-12">
                    <div class="absolute left-2 top-2 flex flex-col uppercase">
                        <span class="font-sans font-bold">message count</span>
                        <span>sent+received last 24h</span>
                        <span class="font-sans font-bold">69</span>
                    </div>
                </div>
            </div>

            <!-- Second set of divs -->
            <div class="mt-10">
                <div>
                    <h1 class="font-mono text-xl">ACTIVITY THIS HOUR</h1>
                    <div class="flex">
                        <div class="relative mr-8 size-64 grow rounded bg-chatbot-white p-12">
                            <span
                                class="absolute left-0 top-0 inline-block w-full rounded-t bg-gray-300 py-2 text-xs font-semibold uppercase text-black"
                                >Active conversations</span
                            >
                        </div>
                        <div class="relative mr-8 size-64 grow rounded bg-chatbot-white p-12">
                            <span
                                class="absolute left-0 top-0 inline-block w-full rounded-t bg-gray-300 py-2 text-xs font-semibold uppercase text-black"
                                >Message count</span
                            >
                        </div>
                        <div class="relative size-64 grow rounded bg-chatbot-white p-12">
                            <span
                                class="absolute left-0 top-0 inline-block w-full rounded-t bg-gray-300 py-2 text-xs font-semibold uppercase text-black"
                                >Message direction last hour</span
                            >
                        </div>
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
                            <!-- Graph 1 content goes here -->
                        </div>
                        <div class="relative h-80 w-64 grow rounded bg-chatbot-white p-12">
                            <span
                                class="absolute left-0 top-0 inline-block w-full rounded-t bg-gray-300 py-2 text-xs font-semibold uppercase text-black"
                                >Number of conversations (7d)</span
                            >
                            <!-- Graph 2 content goes here -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
