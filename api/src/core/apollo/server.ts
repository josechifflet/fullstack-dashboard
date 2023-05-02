import 'reflect-metadata';

import { ApolloServer, BaseContext } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { ExecutionArgs } from 'graphql';
import { PubSub, PubSubEngine } from 'graphql-subscriptions';
import { Context, SubscribeMessage } from 'graphql-ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import http from 'http';
import path from 'path';
import { buildSchema } from 'type-graphql';
import { WebSocketServer } from 'ws';

import { resolvers } from '../../resolvers';
import log from '../../util/tslog';

export const pubSub: PubSubEngine = new PubSub();

/**
 * Initializes the Apollo Server to a given express application
 */
export async function intializeApolloServer(
  httpServer: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >
): Promise<ApolloServer<BaseContext>> {
  const schema = await buildSchema({
    resolvers: resolvers as any,
    emitSchemaFile: path.resolve(__dirname, '../../../schema.gql'),
    pubSub,
  });

  // Creating the WebSocket subscription server
  const wsServer = new WebSocketServer({
    server: httpServer,
  });
  const getDynamicContext = async (
    ctx: Context,
    msg: SubscribeMessage,
    args: ExecutionArgs
  ) => {
    return { gs: { ctx, msg, args } };
  };
  const serverCleanup = useServer(
    {
      schema,
      context: (ctx, msg, args) => {
        return getDynamicContext(ctx, msg, args);
      },
    },
    wsServer
  );

  // Set up Apollo Server
  const server = new ApolloServer({
    schema,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
      ApolloServerPluginDrainHttpServer({ httpServer }),
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault({
            embed: true,
            graphRef: 'user@example.com',
          })
        : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    csrfPrevention: true,
    cache: 'bounded',
  });
  await server.start();
  log.info('Apollo Server is ready!');

  return server;
}
