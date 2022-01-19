import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as dateFns from "date-fns";
admin.initializeApp();

export const createUser = functions.auth.user().onCreate(async (user) => {
  // await admin.firestore().collection("users").add({
  //   userId: user.uid,
  //   userName: user.displayName,
  //   userIcon: user.photoURL,
  // });

  await admin.firestore().collection("users").doc(user.uid).set({
    userId: user.uid,
    userName: user.displayName,
    userIcon: user.photoURL,
    userIsLogin: true,
    created: dateFns.format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    updated: dateFns.format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  });
});
