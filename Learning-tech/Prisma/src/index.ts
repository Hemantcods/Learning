import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const client = new PrismaClient({ adapter });

async function main() {
  const user = await client.user.findFirst({
    where: {
      id: 4,
    },
    include: {
     todos:true
    }
  });
  console.log(user)
}
main()