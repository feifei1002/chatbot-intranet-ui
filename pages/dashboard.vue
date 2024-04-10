<template>
    <div class="flex h-screen justify-center bg-chatbot-black">
        <!-- All content goes here -->
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
                    <h1 class="font-mono text-xl uppercase">{{ $t('dashboard.activityThisHour') }}</h1>
                    <div class="flex">
                        <MidStats :stat-title="$t('dashboard.activeConversations')">
                            <LineChart />
                        </MidStats>
                        <MidStats :stat-title="$t('dashboard.msgCount')">
                            <LineChart />
                        </MidStats>
                        <MidStats :stat-title="$t('dashboard.toolUsage')">
                            <PieChart />
                        </MidStats>
                    </div>
                </div>
            </div>

            <!-- Third set of divs -->
            <div class="mt-10">
                <div>
                    <h1 class="font-mono text-xl uppercase">{{ $t('dashboard.historicalStats') }}</h1>
                    <div class="flex">
                        <BottomStats :stat-title="$t('dashboard.numberOfConv24h')">
                            <LineChart />
                        </BottomStats>
                        <BottomStats :stat-title="$t('dashboard.numberOfConv7d')">
                            <LineChart />
                        </BottomStats>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
