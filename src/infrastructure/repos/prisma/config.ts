import type { IConfigRepository } from "../../../application/contracts/repos/config";
import { prisma } from "../../services/prisma";

export class PrismaConfigRepository implements IConfigRepository {
  async getLeadPrice() {
    const config = await prisma.config.findFirst()

    return config?.lead_price as number
  }
}