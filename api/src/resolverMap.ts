import { IResolvers } from "graphql-tools";
import axios, { AxiosRequestConfig } from "axios";
import nock from "nock";

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const QUEUE_URL="http://localhost:9324/queue/nockslots-norris";

const SQS_ENDPOINT="http://localhost:9324";

const CHUCK_NORRIS_URL =
  "https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com";

const CHUCK_NORRIS_PATH = "/jokes/random";

const USE_NOCKS = process.env.NOCK === "true";

if (USE_NOCKS) {
  nock(CHUCK_NORRIS_URL)
    .persist()
    .get(CHUCK_NORRIS_PATH)
    .reply(200, {
      categories: [1, 2, 3],
      created_at: new Date(),
      icon_url: "http://hey.com",
      id: 5,
      updated_at: new Date(),
      url: "http://example.com",
      value: "Chuck Norris loves NockSlots (lie)",
    });
}

interface ChuckNorrisResponse {
  categories: any;
  created_at: any;
  icon_url: any;
  id: any;
  updated_at: any;
  url: any;
  value: string;
}

const options: AxiosRequestConfig = {
  method: "GET",
  url: `${CHUCK_NORRIS_URL}${CHUCK_NORRIS_PATH}`,
  headers: {
    accept: "application/json",
    "x-rapidapi-key": process.env.CN_API_KEY,
    "x-rapidapi-host": "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
  },
};

const resolverMap: IResolvers = {
  Query: {
    helloWorld(_: void, args: void): string {
      return `👋 InNiT SiMPlE! 👋`;
    },
  },
  Mutation: {
    addThisToQueue: async (_: void, args: any): Promise<any> => {
      console.log("addThisToQueue :: ", args);
      const number = args?.number || 0;
      const { data }: { data: ChuckNorrisResponse } = await axios.request(
        options
      );
      const message = `The number was: ${number} -> Chuck says: ${data.value}`;

      var AWS = require("aws-sdk");
      // Create an SQS service object to the local elasticmq endpoint
      var config = {
        endpoint: new AWS.Endpoint(SQS_ENDPOINT),
        accessKeyId: 'na',
        secretAccessKey: 'na',
        region: 'REGION'
      }
      var sqs = new AWS.SQS(config);

      const params = {
        MessageBody: JSON.stringify(message),
        QueueUrl: QUEUE_URL
      };
      // send the message

      sqs.sendMessage(params, function(err: any , data: any) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
      });

      return {
        number,
        message,
      };
    },
  },
};
export default resolverMap;
