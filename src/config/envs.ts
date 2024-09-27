import dotenv from "dotenv";

dotenv.config();

export const DEVELOPMENT = process.env.NODE_ENV === "development";
export const TEST = process.env.NODE_ENV === "test";

export const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
export const SERVER_PORT = process.env.PORT
  ? Number(process.env.PORT)
  : 4000;

export const ENV = {
  SERVER_HOSTNAME,
  SERVER_PORT,
};
