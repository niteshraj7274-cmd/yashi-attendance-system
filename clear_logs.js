import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSyAsSncAso...", // Just load from .env.local if needed
  projectId: "quadratic-city-r09p9",
};

// We can just use the admin SDK or we can do it via a quick python script using requests, or just use the Firebase REST API.
