# NockSlots api

- The simplest GraphQL server you've ever seen

## POIs for the near future

- Think about mocking out with the GraphQL layer with things like:

### Adding a mockSchema Link in the Apollo Link chain

```
export function createIsomorphLink(
  context: ResolverContext = {},
  opts: { headers: { [key: string]: string | undefined } }
) {
  if (typeof window === "undefined") {
    const { SchemaLink } = require("@apollo/client/link/schema");
    const { schema } = require("../../../schema");
    return new SchemaLink({ schema, context });
  } else {
    const { HttpLink } = require("@apollo/client");
    return new HttpLink({
      uri: "/api/graphql",
      credentials: "include",
      ...opts,
    });
  }
}
```

### json-graphql-server

- https://blog.logrocket.com/mocking-graphql-api-server-using-json-graphql-server/

### graphql-faker

- https://github.com/APIs-guru/graphql-faker

## Useful links

- https://medium.com/@th.guibert/basic-apollo-express-graphql-api-with-typescript-2ee021dea2c
- https://medium.com/@jdeflaux/graphql-integration-tests-with-apollo-server-testing-jest-mongodb-and-nock-af5a82e95954
  - https://github.com/jdeflaux/medium-graphql-integration-test

