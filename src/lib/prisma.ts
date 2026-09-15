import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const configuredDatabaseUrl =
  process.env.NEON_POSTGRES_PRISMA_URL ?? process.env.DATABASE_URL;

function getPrismaUrl() {
  if (!configuredDatabaseUrl) return undefined;

  const url = new URL(configuredDatabaseUrl);
  url.searchParams.set("pool_timeout", "30");
  return url.toString();
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: getPrismaUrl()
      }
    }
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
