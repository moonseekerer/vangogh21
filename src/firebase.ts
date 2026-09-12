import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBu8OmPSnw0TPysdtMmwwTL0BrIWRpeVWg",
  authDomain: "vangogh-21.firebaseapp.com",
  projectId: "vangogh-21",
  storageBucket: "vangogh-21.firebasestorage.app",
  messagingSenderId: "554500833008",
  appId: "1:554500833008:web:aa7afc76fd1f049eb98c35",
  measurementId: "G-S2H37PZHK4"
};

export const app = initializeApp(firebaseConfig);

// Initialize analytics safely if supported in browser environment
export let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    // ignore analytics initialization errors
  });
}
