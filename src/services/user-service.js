const prisma = require("../config/prisma");

exports.getUserById = (id) => {
  return prisma.admin.findFirst({
    where: {
      id,
    },
  });
};

exports.getUserByEmail = (email) => {
  return prisma.admin.findFirst({
    where: {
      email,
    }
  })
}

exports.getUserByUsername = (username) => {
  return prisma.admin.findFirst({
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
