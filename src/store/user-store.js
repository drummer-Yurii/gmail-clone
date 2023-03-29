import { defineStore } from 'pinia'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import { collection, query, where, onSnapshot, doc, setDoc } from "firebase/firestore";
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
        getEmailsByEmailAddress() {
            const q = query(collection(db, "emails"), where("toEmail", "==", this.$state.email));
                onSnapshot(q, (querySnapshot) => {
                const resultArray = [];
                querySnapshot.forEach((doc) => {
                    resultArray.push({
                        id: doc.id,
                        firstName: doc.data().firstName,
                        lastName: doc.data().lastName,
                        fromEmail: doc.data().fromEmail,
                        toEmail: doc.data().toEmail,
                        subject: doc.data().subject,
                        body: doc.data().body,
                        hasViewed: doc.data().hasViewed,
                        createdAt: doc.data().createdAt,
                    });
                });
                this.$state.emails = resultArray
            }
            ,(error) => {
                console.log(error);
            });
        },

        async sendEmail(data) {
            try {
                await setDoc(doc(db, "emails/" + uuid()), {
                    firstName: this.$state.firstName,
                    lastName: this.$state.lastName,
                    fromEmail: this.$state.email,
                    toEmail: data.toEmail,
                    subject: data.subject,
                    body: data.body,
                    hasViewed: false,
                    createdAt: Date.now()
                });
            } catch (error) {
                console.log(error);
            }
        },

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