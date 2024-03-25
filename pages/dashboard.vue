<template>
    <div class="flex h-screen justify-center bg-chatbot-black">
        <!-- All content goes here -->
        <div>
            <div class="mt-10">
                <!-- First set of divs -->
                <div class="flex text-black">
                    <div class="mr-8 h-32 w-64 rounded border border-gray-300 bg-chatbot-white p-12">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                    </div>
                    <div class="mr-8 h-32 w-64 rounded border border-gray-300 bg-chatbot-white p-12">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                    </div>
                    <div class="mr-8 h-32 w-64 rounded border border-gray-300 bg-chatbot-white p-12">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                    </div>
                    <div class="mr-8 h-32 w-64 rounded border border-gray-300 bg-chatbot-white p-12">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                    </div>
                    <div class="mr-8 h-32 w-64 rounded border border-gray-300 bg-chatbot-white p-12">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                    </div>
                    <div class="h-32 w-64 rounded border border-gray-300 bg-chatbot-white p-12">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
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
    </div>
</template>
