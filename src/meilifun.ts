import * as functions from "firebase-functions";
import {MeiliSearch} from "meilisearch";

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
