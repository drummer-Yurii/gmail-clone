import { defineStore } from 'pinia'
import axios from 'axios'
import { db } from '@/firebase-init'

axios.defaults.baseURL = 'http://localhost:4001/'

export const useUserStore = defineStore('user', {
    state: () => ({ 
        sub: '',
        email: '',
        picture: '',
        firstName: '',
        lastName: '',
        emails: []
    }),
    actions: {
       async getUserDetailsFromGoogle(data) {
            let res = await axios.post('api/google-login', {
                token: data.credential
            })

            this.$state.sub = res.data.sub
            this.$state.email = res.data.email
            this.$state.picture = res.data.picture
            this.$state.firstName = res.data.given_name
            this.$state.lastName = res.data.family_name
       },
       clearUser() {
           this.$state.sub = null
           this.$state.email = null
           this.$state.picture = null
           this.$state.firstName = null
           this.$state.lastName = null
       }
    },
    persist: true
})