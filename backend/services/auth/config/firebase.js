import admin from "firebase-admin";

const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

if (!firebaseConfig.projectId || !firebaseConfig.clientEmail || !firebaseConfig.privateKey) {
  throw new Error("Missing Firebase environment variables. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.");
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
  });
}

export default admin;
