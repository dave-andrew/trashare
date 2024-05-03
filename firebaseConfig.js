import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAH0TpzRyHyoj6zejqdDdbPtMKxYUiDKhI",
    authDomain: "trashare-3a2a9.firebaseapp.com",
    projectId: "trashare-3a2a9",
    storageBucket: "trashare-3a2a9.appspot.com",
    messagingSenderId: "480548327882",
    appId: "1:480548327882:web:e64adf2159aba76e787f33",
    measurementId: "G-VHV8B72WWG"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// const analytics = getAnalytics(app); Error karena tidak ada getAnalytics method