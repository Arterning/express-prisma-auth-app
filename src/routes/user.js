const express = require("express");
const router = express.Router();
const prisma = require('../lib/prisma')
router.use(express.json())

router.post(`/signup`, async (req, res) => {
  const { name, email, posts } = req.body;

  const postData = posts
    ? posts.map((post) => {
        return { title: post.title, content: post.content || undefined };
      })
    : [];

  const result = await prisma.user.create({
    data: {
      name,
      email,
      posts: {
        create: postData,
      },
    },
  });
  res.json(result);
});

router.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.get("/user/:id/drafts", async (req, res) => {
  const { id } = req.params;

  const drafts = await prisma.user
    .findUnique({
      where: {
        id: Number(id),
      },
    })
    .posts({
      where: { published: false },
    });

  res.json(drafts);
});

module.exports = router;