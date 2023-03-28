<template>
    <div id="UserComponent">
        <img 
            @click="openMenu = !openMenu"
            data-tooltip-target="tooltip-no-arrow-user"
            data-tooltip-placement="bottom"
            :src="userStore.picture"
            class="rounded-full w-8 cursor-pointer"
        >
        <div
            v-show="!openMenu"
            id="tooltip-no-arrow-user"
            role="tooltip"
            class="inline-block absolute invisible text-xs z-10 py-1 px-2 font-medium text-black 
            rounded-sm shadow-sm opacity-0 tooltip dark:bg-gray-600 delay-150"
        >
            <div>Google Account</div>
            <div class="text-gray-500">
                {{ userStore.firstName }} {{ userStore.lastName }}
            </div>
            <div class="text-gray-500">{{ userStore.email }}</div>
        </div>
        <div 
            v-show="openMenu"
            class="absolute z-10 w-80 right-2 bg-white top-14 rounded-lg"
        >
            <div class="w-full flex justify-center">
                <img 
                    :src="userStore.picture"
                    class="rounded-full w-20 mt-4"
                >
            </div>
            <div class="text-gray-700 w-full flex justify-center mt-2 text-lg">
                {{ userStore.firstName }} {{ userStore.lastName }}
            </div>
            <div class="text-gray-700 w-full flex justify-center mt-2 text-sm pb-4 border-b">
                {{ userStore.email }}
            </div>
            <div class="flex justify-center my-5">
                <button
                    class="bg-transparent text-xs hover:bg-gray-100 text-gray-600 font-semibold py-2 px-4
                    border border-gray-300 rounded"
                >
                    Sign out of Gmail
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/store/user-store";

const userStore = useUserStore();

let openMenu = ref(false);
</script>