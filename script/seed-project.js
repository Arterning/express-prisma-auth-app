const { PrismaClient } = require('@prisma/client')
const lodash = require('lodash')
const {getRandomProject} = require('./random')

const prisma = new PrismaClient()

const seedData = lodash.range(3).map(() => getRandomProject(1));

async function main() {
  console.log(`Start seeding ...`)
  for (const seed of seedData) {
    console.log(seed)
    const res = await prisma.project.create({
      data: seed
    })
    console.log(`Created res with id: ${res.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
