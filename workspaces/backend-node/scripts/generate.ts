import prisma from "../src/loaders/prisma"
import { build } from "./ipsum"
import { faker } from "@faker-js/faker"
import bcrypt from "bcrypt"

async function generateUsers() {
  const users = []
  for (let i = 0; i < 500; i++) {
    const password = faker.internet.password()
    const user = {
      email: faker.internet.email().toLowerCase(),
      password: bcrypt.hashSync(password, 10),
      name: faker.person.firstName(),
    }
    users.push(user)
  }
  await prisma.user.createMany({ data: users })
  console.log("user generation done")
}

async function generateFollows() {
  const users = await prisma.user.findMany()

  for (const user of users) {
    const following = users
      .sort(() => Math.random() - Math.random())
      .slice(0, 50)
      .map((u) => ({
        follower_id: user.id,
        following_id: u.id,
      }))
    await prisma.follow.createMany({ data: following, skipDuplicates: true })
  }

  console.log("follow generation done")
}

function getRandomDateInPast() {
  const daysAgo = faker.datatype.number({ min: 0, max: 365 })
  return new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000)
}

function maybeGetDate() {
  return faker.datatype.boolean() ? getRandomDateInPast() : null
}

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

async function generatePosts() {
  const users = await prisma.user.findMany()
  const posts = []

  for (let i = 0; i < 100000; i++) {
    const user = getRandomElement(users)
    const post = {
      body: build(),
      author_id: user.id,
      published_at: maybeGetDate(),
      deleted_at: maybeGetDate(),
      visibility: getRandomElement(["public", "private", "unlisted"]),
    }

    posts.push(post)
  }

  await prisma.post.createMany({ data: posts, skipDuplicates: true })
  console.log("Post generation done.")
}

async function main() {
  console.log("Generating data...")

  // await generateUsers()
  // await generateFollows()
  await generatePosts()
}

prisma
  .$connect()
  .then(() => main())
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
