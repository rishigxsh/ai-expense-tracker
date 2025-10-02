import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDseZmtJXuyNPrHXs-0_76W8HVPuJDysdI",
  authDomain: "ai-expense-tracker-874fe.firebaseapp.com",
  projectId: "ai-expense-tracker-874fe",
  storageBucket: "ai-expense-tracker-874fe.firebasestorage.app",
  messagingSenderId: "909297729161",
  appId: "1:909297729161:web:1ee6024e45770f2e9b5058",
  measurementId: "G-55GEGK695B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with long-polling to avoid blocked streaming channels in some networks/ad-blockers
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false
});

// Initialize Auth
export const auth = getAuth(app);

// Export the app instance
export default app;
