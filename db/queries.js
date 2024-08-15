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

async function uploadFileQuery(filename, userId, folderId, cloudinaryId, url, size) {
  await prisma.file.create({
    data: {
      name: filename,
      userId: userId,
      folderId: folderId,
      cloudinaryId: cloudinaryId,
      url: url,
      size: size,
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

async function getFoldersQuery(userId) {
  const folders = await prisma.folder.findMany({
    where: {
      userId: userId,
    },
  });
  return folders;
}

async function createFolderQuery(foldername, userId) {
  await prisma.folder.create({
    data: {
      name: foldername,
      userId: userId,
    },
  });
}

async function getFilesFromFolderQuery(foldername, userId) {
  const files = await prisma.folder.findFirst({
    where: {
      name: foldername,
      userId: userId,
    },
    include: {
      files: true,
    },
  });
  return files;
}

async function getFolderIdQuery(foldername, userId) {
  const folderId = await prisma.folder.findFirst({
    where: {
      name: foldername,
      userId: userId,
    },
  });
  return folderId.id;
}

module.exports = {
  registerUserQuery,
  uploadFileQuery,
  getFilesQuery,
  getFileQuery,
  getFoldersQuery,
  createFolderQuery,
  getFilesFromFolderQuery,
  getFolderIdQuery,
};
