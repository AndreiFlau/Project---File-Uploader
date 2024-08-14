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

async function uploadFileQuery(filename, userId) {
  await prisma.file.create({
    data: {
      name: filename,
      userId: userId,
    },
  });
}

async function getFilesQuery(userId) {
  const files = await prisma.file.findMany({
    where: {
      userId: userId,
    },
  });
  return files;
}

async function getFileQuery(userId, fileId) {
  const file = await prisma.file.findFirst({
    where: {
      userId: userId,
      id: fileId,
    },
  });
  return file;
}

module.exports = { registerUserQuery, uploadFileQuery, getFilesQuery, getFileQuery };
