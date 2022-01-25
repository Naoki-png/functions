import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as dateFns from "date-fns";
import * as dateFnsTz from "date-fns-tz";
admin.initializeApp();

const TIME_ZONE_TOKYO = "Asia/Tokyo";
const FORMAT_YMDHMS = "yyyy-MM-dd HH:mm:ss";

export const createUser = functions.auth.user().onCreate(async (user) => {
  const dateAtTokyo = dateFnsTz.utcToZonedTime(new Date(), TIME_ZONE_TOKYO);
  const formattedDate = dateFns.format(dateAtTokyo, FORMAT_YMDHMS);

  await admin.firestore().collection("users").doc(user.uid).set({
    userId: user.uid,
    userName: user.displayName,
    userIcon: user.photoURL,
    userIsLogin: true,
    created: formattedDate,
    updated: formattedDate,
  });
});
