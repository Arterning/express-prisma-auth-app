const express = require("express");
const router = express.Router();
const prisma = require('../lib/prisma')
router.use(express.json())

router.get("/feed", async (req, res) => {
  const { searchString, skip, take, orderBy } = req.query;

  const or = searchString
    ? {
        OR: [
          { title: { contains: searchString } },
          { content: { contains: searchString } },
        ],
      }
    : {};

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      ...or,
    },
    include: { author: true },
    take: Number(take) || undefined,
    skip: Number(skip) || undefined,
    orderBy: {
      updatedAt: orderBy || undefined,
    },
  });

  res.json(posts);
});

module.exports = router;
