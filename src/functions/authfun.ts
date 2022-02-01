import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as dateFns from "date-fns";
import * as dateFnsTz from "date-fns-tz";
admin.initializeApp();

const TIME_ZONE_TOKYO = "Asia/Tokyo";
const FORMAT_YMDHMS = "yyyy-MM-dd HH:mm:ss";
const BUCKET_NAME = "pien-e74c4.appspot.com";

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

export const deleteUser = functions.auth.user().onDelete(async (user) => {
  // usersテーブルからの削除
  await admin.firestore().collection("users").doc(user.uid).delete();

  // postsテーブルからの削除
  const postSnapshot = await admin.firestore().collection("posts")
      .where("userId", "==", user.uid).get();
  postSnapshot.forEach((doc) => {
    doc.ref.delete();
  });

  // favoritesテーブルからの削除
  const favoriteSnapshot = await admin.firestore().collection("favorites")
      .where("favoriteUserId", "==", user.uid).get();
  favoriteSnapshot.forEach((doc) => {
    doc.ref.delete();
  });

  // storageの削除
  await admin.storage().bucket(BUCKET_NAME)
      .deleteFiles({prefix: `${user.uid}`});
});
