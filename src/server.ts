import http from "http";
import cors from "cors";
import express from "express";
import "./config/logging";
import { loggingHandler } from "./middleware/loggingHandler";
import { routeNotFound } from "./middleware/routeNotFound";
import { ENV } from "./config/envs";
import { routers } from "./routers";

export const app = express();
export let httpServer: ReturnType<typeof http.createServer>;

export function main() {
  const allowList = ["https://example.com", "https://anotherdomain.com"];

  const corsOptions = {
    origin: function (origin: any, callback: any) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Check if the origin is from localhost (any port) or in the allowlist
      if (origin.includes("localhost") || allowList.indexOf(origin) !== -1) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS")); // Block the request
      }
    },
  };

  logging.log("----------------------------------------");
  logging.log("Initializing API");
  logging.log("----------------------------------------");
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  logging.log("----------------------------------------");
  logging.log("Logging & Configuration");
  logging.log("----------------------------------------");
  app.use(loggingHandler);
  app.use(cors(corsOptions));

  logging.log("----------------------------------------");
  logging.log("Define Controller Routing");
  logging.log("----------------------------------------");

  app.use("/hello", routers.hello); // for health check
  app.use("/api", routers.api);

  logging.log("----------------------------------------");
  logging.log("Define Routing Error");
  logging.log("----------------------------------------");
  app.use(routeNotFound);

  logging.log("----------------------------------------");
  logging.log("Starting Server");
  logging.log("----------------------------------------");
  httpServer = http.createServer(app);
  httpServer.listen(ENV.SERVER_PORT, () => {
    const protocol = ENV.SERVER_HOSTNAME === "localhost" ? "http" : "https"; // Use https for non-local environments

    logging.log("----------------------------------------");
    logging.log(
      `Server started on ${protocol}://${ENV.SERVER_HOSTNAME}:${ENV.SERVER_PORT}`
    );
    logging.log("----------------------------------------");
  });
}

export const shutdown = (callback: any) =>
  httpServer && httpServer.close(callback);

main();
