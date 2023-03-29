<template>
  <div 
    id="SingleMessageSection"
    class="w-full bg-white ml-2 rounded-t-xl h-full shadow-sm"
  >
    <div class="border-b">
      <div class="flex items-center justify-between px-1.5 py-0.5">
        <div class="flex">
          <router-link to="/email">
            <IconComponent
              iconString="back"
              iconColor="#636363"
              :iconSize="19"
              hoverColor="hover:bg-gray-200"
              text="Back to inbox"
            />
          </router-link>
          <IconComponent
            @click="deleteEmail(email.id)"
            iconString="trash"
            iconColor="#636363"
            :iconSize="19"
            hoverColor="hover:bg-gray-200"
            text="Delete"
            class="ml-3"
          />
        </div>
        <div class="text-xs text-gray-500">1-53 of 153</div>
      </div>
    </div>

    <div class="w-full text-xl ml-20 font-light pt-5">
      {{ email.subject }}
    </div>

    <div class="w-full flex">
      <img 
        class="rounded-full mt-8 mx-5 custom-img"
        src="https://via.placeholder.com/45" 
      />
      <div class="w-full my-4 mx-0.5">
        <div class="font-semibold text-sm mt-4 mb-4">
          <div class="w-full flex justify-between items-center">
            <div>{{ email.fromEmail }}</div>
            <div class="mr-5 text-xs font-normal">{{ email.createdAt }}</div>
          </div>
          <span class="text-xs text-gray-500 font-normal">to me</span>
        </div>
        <div>{{ email.body }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconComponent from '@/components/IconComponent.vue';
import { useUserStore } from '@/store/user-store';
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

let email = ref({});

onMounted(async () => {
  const res = await userStore.getEmailById(route.params.id)

  email.value = {
    id: res.id,
    body: res.body,
    createdAt: res.createdAt,
    firstName: res.firstName,
    lastName: res.lastName,
    fromEmail: res.fromEmail,
    subject: res.subject,
    hasViewed: res.hasViewed,
    toEmail: res.toEmail,
  }
})

const deleteEmail = async (id) => {
  let res = confirm("Are you sure you want to delete this?")
  if (res) {
    await userStore.deleteEmail(id)
    setTimeout(() => { router.push('/email') }, 200)
  }
}
</script>

<style lang="scss">
#SingleMessageSection {
  .custom-img {
    width: 40px;
    height: 40px;
  }
}
</style>

