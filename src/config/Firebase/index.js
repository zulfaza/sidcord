import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA66AzaZWQNT4ADVwjGm0BivTKVfrAFbag",
  authDomain: "sidcord-15021.firebaseapp.com",
  projectId: "sidcord-15021",
  storageBucket: "sidcord-15021.appspot.com",
  messagingSenderId: "967549859306",
  appId: "1:967549859306:web:4e7fb178de2b551179ae93",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export default app;
