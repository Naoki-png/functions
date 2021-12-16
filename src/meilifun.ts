import * as functions from "firebase-functions";
import {MeiliSearch} from "meilisearch";

const url = "http://127.0.0.1:7700";
const privateKey =
"07b80b9da74a67e5e02200e5bb95ab342ec0bc1ba57ae03ca22265fc51fa4c8c";

export const addToMeili = functions.https.onRequest(async () => {
  const client = new MeiliSearch({host: url, apiKey: privateKey});
  client.index("movies");
  const index = client.index("movies");
  const documents = [
    {id: 1, title: "Carol", genres: ["Romance", "Drama"]},
    {id: 2, title: "Wonder Woman", genres: ["Action", "Adventure"]},
    {id: 3, title: "Life of Pi", genres: ["Adventure", "Drama"]},
    {id: 4, title: "Moana", genres: ["Fantasy", "Action"]},
    {id: 5, title: "Philadelphia", genres: ["Drama"]},
  ];

  const response = await index.addDocuments(documents);
  console.log(response.updateId);
});