import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const prismaClientSingleton = () => {
    const url = process.env.DATABASE_URL;

    if (!url) {
        throw new Error("❌ КРИТИЧНА ПОМИЛКА: Змінна DATABASE_URL не знайдена у файлі .env");
    }

    const pool = new Pool({ connectionString: url });
    const adapter = new PrismaPg(pool);

    return new PrismaClient({ adapter });
};

declare global {

    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;