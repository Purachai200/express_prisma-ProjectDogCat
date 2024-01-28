const prisma = require("../config/prisma");

exports.getUserById = (role,id) => {
  return prisma[role].findFirst({
    where: {
      id,
    },
  });
};

exports.getUserByIdString = (role, id) => {
  return prisma[role].findMany({
    where: {
      id,
    },
  });
};

exports.getUserByEmail = (role,email) => {
  return prisma[role].findFirst({
    where: {
      email,
    }
  })
}

exports.getUserByUsername = (role,username) => {
  return prisma[role].findFirst({
    where: {
      username,
    }
  })
}

exports.createAdmin = (first_name, last_name, username, password, email) => {
  return prisma.admin.create({
    data: {
      first_name,
      last_name,
      username,
      password,
      email,
    },
  });
}
