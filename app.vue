<template>
    <div class="flex h-screen flex-col">
        <AppHeader class="sticky top-0 z-50 w-full" />
        <div class="flex-1 overflow-auto">
            <NuxtPage />
        </div>
    </div>
    <!-- Notifications for the app -->
    <UNotifications />
</template>

<script setup>
// See https://github.com/sidebase/nuxt-auth/issues/732#issuecomment-2077425393
onMounted(() => {
    const { getSession, status } = useAuth();
    if (status.value !== "unauthenticated") {
        getSession({ force: true });
    }
});
</script>
