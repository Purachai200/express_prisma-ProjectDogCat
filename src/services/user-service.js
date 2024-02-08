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

exports.getIdentityNumber = (identity_number) => {
  return prisma.pet_owner.findFirst({
    where: {
      identity_number,
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

// Get Data

exports.getAdminAllData = (dataTable) => {
  return prisma[dataTable].findMany();
}

exports.getAdminOneData = (dataTable, findFrom, refFind, typeRef) => {
  return prisma[dataTable].findUnique({
    where: {
      [findFrom]: typeRef(refFind)
    }
  })
}

exports.getAllData = (dataTable) => {
  return prisma[dataTable].findMany();
}

exports.getOneData = (dataTable, findFrom, refFind, typeRef) => {
  return prisma[dataTable].findUnique({
    where: {
      [findFrom]: typeRef(refFind)
    }
  })
}

exports.getByData = (dataTable, findFrom, refFind) => {
  return prisma[dataTable].findMany({
    where: {
      [findFrom]: { in: [refFind] }
    }
  })
}