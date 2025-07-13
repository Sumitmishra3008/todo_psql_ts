import express from "express";
const app = express();

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

async function main() {
  const user = await prisma.user.create({
    data: {
      username: "submit.mishra2002@gmail.com",
      password: "password",
      firstName: "Sumit",
      lastName: "Mishra",
    },
  });
  console.log(user);
}

main().catch((e: any) => {
  console.log(e);
});
