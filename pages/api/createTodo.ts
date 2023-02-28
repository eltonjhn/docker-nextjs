import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const todo = await prisma.todo.create({
    data: {
      note: req.body.note,
    },
  });

  res.status(200).send(todo);
}
