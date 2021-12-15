import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {MeiliSearch} from "meilisearch";
admin.initializeApp();

export const addMessage = functions.https.onRequest(async (req, res) => {
  const original = (req.query.text !== null) ? req.query.text : "No Data";
  const writeResult = await admin.firestore()
      .collection("messages").add({original: original});
  res.json({result: `Message with ID: ${writeResult.id} added.`});
});

export const makeUppercase = functions.firestore
    .document("/messages/{documentId}")
    .onCreate((snap, context) => {
      const original = snap.data().original;
      functions.logger.log("Uppercasing", context.params.documentId, original);
      const uppercase = original.toUpperCase();
      return snap.ref.set({uppercase}, {merge: true});
    });

export const addToMeili = functions.https.onRequest(async () => {
  const client = new MeiliSearch({host: "http://127.0.0.1:7700", apiKey: "HMBa7DAcx025w5rPi2SRDrxVQPXJKGHk"});
  const index = client.index("movies");
  const documents = [
    {id: 1, title: "Carol", genres: ["Romance", "Drama"]},
    {id: 2, title: "Wonder Woman", genres: ["Action", "Adventure"]},
    {id: 3, title: "Life of Pi", genres: ["Adventure", "Drama"]},
    {id: 4, title: "Moana", genres: ["Fantasy", "Action"]},
    {id: 5, title: "Philadelphia", genres: ["Drama"]},
  ];
  const response = await index.addDocuments(documents);
  console.log(response);
});

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
