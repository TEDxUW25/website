import { PrismaClient } from "../src/generated/prisma";

// Declare a global variable for the Prisma client
declare global {
    var prisma: PrismaClient | undefined;
}

// Use the existing global Prisma client if it exists, or create a new one
export const db = globalThis.prisma || new PrismaClient(); 

// In development, store the Prisma client in the global scope
// so it doesn't create a new instance on everyreload
if (process.env.NODE_ENV !== "production") globalThis.prisma = db; 
