import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import Express from "express";
import { buildSchema } from "type-graphql";
import { DataSource } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";

import { RegisterResolver } from "./modules/user/Register";
import { redis } from "./redis";
import { LoginResolver } from "./modules/user/Login";
import { MeResolver } from "./modules/user/Me";
import { ConfirmUserResolver } from "./modules/user/ConfirmUser";
import { ForgotPasswordResolver } from "./modules/user/ForgotPassword";
import { ChangePasswordResolver } from "./modules/user/ChangePassword";
import { LogoutResolver } from "./modules/user/Logout";
import {
  CreateProductResolver,
  CreateUserResolver,
} from "./modules/user/CreateUser";

declare module "express-session" {
  interface Session {
    userId: number;
  }
}

const main = async () => {
  const MyDataSource = new DataSource(require("../ormconfig.json"));
  MyDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });

  const schema = await buildSchema({
    resolvers: [
      RegisterResolver,
      LoginResolver,
      MeResolver,
      ConfirmUserResolver,
      ForgotPasswordResolver,
      ChangePasswordResolver,
      LogoutResolver,
      CreateUserResolver,
      CreateProductResolver,
    ],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
  });
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  const app = Express();

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  const sessionOption: session.SessionOptions = {
    store: new RedisStore({
      client: redis as any,
    }),
    name: "qid",
    secret: "asdfas3f23413",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
    },
  };

  app.use(session(sessionOption));

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started on http://localhost:4000");
  });
};

main();
