import { IResolvers } from 'graphql-tools';
const resolverMap: IResolvers = {
  Query: {
    helloWorld(_: void, args: void): string {
  return `👋 InNiT SiMPlE! 👋`;
    },
  },
  Mutation: {
    addThisToQueue(_: void, args: any): any {
      console.log('addThisToQueue :: ', args);
      const number = args?.number || 0
      return {
        number,
        message: `precious ${number}`
      }
    }
  }
};
export default resolverMap;