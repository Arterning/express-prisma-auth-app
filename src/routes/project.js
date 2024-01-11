const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");
router.use(express.json())

router.post(`/project`, async (req, res) => {
    const { name, description, authorId } = req.body;
    const result = await prisma.project.create({
        data: {
            name,
            description,
            author: { connect: { id: authorId } },
        },
    })
    res.json(result);
})

router.put(`/project/:id`, async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const result = await prisma.project.update({
        where: { id: Number(id) },
        data: {
            name,
            description
        },
    })
    res.json(result);
})

router.get(`/project/:id`, async (req, res) => {
    const { id } = req.params;
    const post = await prisma.project.findUnique({
        where: { id },
    })
    res.json(post);
})

router.delete(`/project/:id`, async (req, res) => {
    const { id } = req.params;
    try {
        const post = await prisma.project.delete({
            where: { id},
        })
        res.json(post);
    } catch (error) {
        res.json({ error: `Project with ID ${id} does not exist in the database !` });
    }
})

router.get(`/project`, async (req, res) => {
    const { name, description } = req.query;
    console.log(name, description);
    //query like by name or description
    const posts = await prisma.project.findMany({
        where: {
            name: {
                contains: name
            },
            description: {
                contains: description
            }
        }
    })
    // const posts = await prisma.project.findMany();
    res.json(posts);
})

module.exports = router;