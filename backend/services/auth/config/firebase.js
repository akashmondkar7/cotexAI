import * as admin from "firebase-admin";
import { cert } from "firebase-admin";
import serviceAccount from '../serviceAccountKey.json' with { type: "json" };

admin.initializeApp({
  credential:cert(serviceAccount),
});

export default admin;
