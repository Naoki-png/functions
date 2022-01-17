import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

export const createUser = functions.auth.user().onCreate(async (user) => {
  await admin.firestore().collection("users").add({
    userId: user.uid,
    userName: user.displayName,
    userIcon: user.photoURL?.toString,
  });
});
