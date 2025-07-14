import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// --- IMPORTANT ---
// Replace the placeholder values below with your own Firebase project's configuration.
// You can find this in your Firebase project settings -> General -> Your apps -> Web app.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Recommended Firestore Security Rules:
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{collection}/{itemId} {
//       // Allow reads if user is authenticated
//       allow read: if request.auth != null;
//       // Allow creates if user is authenticated and the userId matches their own UID
//       allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
//       // Allow updates and deletes only if the user owns the document
//       allow update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
//     }
//   }
// }

// Recommended Firebase Storage Security Rules:
// rules_version = '2';
// service firebase.storage {
//   match /b/{bucket}/o {
//     // Allow reads if user is authenticated
//     // Allow writes (uploads) only if the user is authenticated and the path matches their UID
//     match /items/{userId}/{allPaths=**} {
//       allow read: if request.auth != null;
//       allow write: if request.auth != null && request.auth.uid == userId;
//     }
//   }
// }


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
