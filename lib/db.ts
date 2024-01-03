import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
return new PrismaClient()
}

// declare global {
//   var prisma: PrismaClient | undefined;
// }
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

// export const db = globalThis.prisma || new PrismaClient();
export const db = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

