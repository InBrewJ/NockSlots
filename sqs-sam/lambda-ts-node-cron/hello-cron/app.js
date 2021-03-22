const { Client } = require('pg');
const axios = require('axios');

const fromBase64 = (b64Msg) => Buffer.from(b64Msg, "base64").toString();
const prettyPrint = (ob) => JSON.stringify(ob, null, 2);

exports.handler = async (event, context) => {
  const response = "yep";

  console.log("Cron lambda triggered!");

  const client = new Client({
    user: "test",
    host: "db", // this is the 'service' name in the docker-compose.yaml
    database: "nockslots",
    password: "test",
    port: 5432,
  });

  console.log("connecting to db...");

  await client.connect();

  const query = `SELECT * FROM public.messages`;

  console.log("the query:");
  console.log(query);
  let result;

  try {
    console.log("Trying the query...");
    result = await client.query(query);
    console.log('The result :: ', result);
    await client.end();
  } catch (error) {
    console.log("Could not add row to postgres, soz");
    console.log(error);
  }

  const rows = result.rows;

  console.log('The rows:');
  rows.map(r => {
      console.log(`${r.id} ${fromBase64(r.encoded_message)}`);
  });

  try {
    const filmRes = await axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=GET_API_KEY_FROM_ENV');
    console.log('RESPONSE FROM FILM API:');
    console.log(Object.keys(filmRes.data));
    // We're going to add the rating to the Chuck Norris message in the 'processed_messages' table...
    console.log('RATING :: ', filmRes.data.Rated);
  } catch (error) {
    console.error(error);
  }

  return response;
};
