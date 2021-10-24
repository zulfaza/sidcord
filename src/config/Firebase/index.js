import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";
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

if (window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectStorageEmulator(storage, "localhost", 9199);
}

export default app;
