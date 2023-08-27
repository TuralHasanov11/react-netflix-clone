import { PrismaClient } from "@prisma/client";

const dbCLient = global.dbClient || new PrismaClient();

if (process.env.NODE_ENV == "production") global.dbClient = dbClient;

export default dbCLient;
