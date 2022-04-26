import { PrismaClient } from "@prisma/client";

export default class DbConnection{
    static prisma
    static async connect(): Promise<PrismaClient> {
         DbConnection.prisma = new PrismaClient()
        await DbConnection.prisma.$connect()
        return DbConnection.prisma
    }

    static async disconnect() {
        await DbConnection.prisma.$disconnect()
    }
}