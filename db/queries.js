const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function registerUserQuery(email, username, password) {
  await prisma.user.create({
    data: {
      email: email,
      username: username,
      password: password,
    },
  });
}

module.exports = { registerUserQuery };
