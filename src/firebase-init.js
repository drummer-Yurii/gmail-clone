import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCkc3ekioGe8E32-ECVJKuBrvOxPIIIvdk",
    authDomain: "clone-b9609.firebaseapp.com",
    projectId: "clone-b9609",
    storageBucket: "clone-b9609.appspot.com",
    messagingSenderId: "1080690130286",
    appId: "1:1080690130286:web:d6497fa600ebb6acd4157f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };