<script setup>
const colorMode = useColorMode();
const isDark = computed({
    get() {
        return colorMode.value === "dark";
    },
    set() {
        colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
    },
});
</script>

<template>
    <UButton
        :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
        :color="isDark ? 'blue' : 'yellow'"
        variant="link"
        :title="isDark ? 'Light mode' : 'Dark mode'"
        @click="isDark = !isDark"
    />
</template>
