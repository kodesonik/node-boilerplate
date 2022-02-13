import { PrismaClient } from "@prisma/client";

export default class DbConnection{
    static prisma
    static async connect(): Promise<PrismaClient> {
         this.prisma = new PrismaClient()
        await this.prisma.$connect()
        return this.prisma
    }

    static async disconnect() {
        await this.prisma.$disconnect()
    }
}