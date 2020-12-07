import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import { gql, useMutation } from "@apollo/client";

const GRAPHQL_URL = "http://localhost:3001/graphql";

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});

const ADD_TO_QUEUE = gql`
  mutation AddThisToQueue($number: Int!) {
    addThisToQueue(number: $number) {
      number
      message
    }
  }
`;

const HEY = gql`
  query {
    helloWorld
  }
`;

function AddToQueue() {
  let input: any;
  const [addThisToQueue, { data }] = useMutation(ADD_TO_QUEUE);

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const queueRes = await addThisToQueue({
            variables: { number: Number(input.value) },
          });
          console.log("queueRes :: ", queueRes);
        }}
      >
        <input
          type="number"
          ref={(node) => {
            input = node;
          }}
        />
        <button type="submit">Send to Queue</button>
        <p>{JSON.stringify(data)}</p>
      </form>
    </div>
  );
}

function Hey() {
  const { loading, error, data } = useQuery(HEY);

  if (loading) return <span>Loading...</span>;
  if (error) return <span>Error :(</span>;

  return data.helloWorld;
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <span>
          <a href="https://iconscout.com/icons/poker-chip" target="_blank">
            Poker Chip Icon
          </a>{" "}
          by{" "}
          <a
            href="https://iconscout.com/contributors/LuizCarvalho"
            target="_blank"
          >
            Luiz Carvalho
          </a>
        </span>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <a
            className="App-link"
            href="https://github.com/InBrewJ/NockSlots"
            target="_blank"
            rel="noopener noreferrer"
          >
            NockSlots
          </a>
          <p>
            <Hey />
          </p>
          <AddToQueue />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
