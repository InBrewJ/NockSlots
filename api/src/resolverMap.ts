import { IResolvers } from "graphql-tools";
import axios, { AxiosRequestConfig } from "axios";
require("dotenv").config();

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
  url: "https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random",
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
      console.log(`num: ${number} >> message : ${message}`);
      return {
        number,
        message,
      };
    },
  },
};
export default resolverMap;
