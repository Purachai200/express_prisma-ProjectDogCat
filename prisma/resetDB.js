const {PrismaClient} =require('@prisma/client')
const prisma = new PrismaClient()

async function run() {
  await prisma.$executeRawUnsafe('DROP Database pets_system_database')
  await prisma.$executeRawUnsafe('CREATE Database pets_system_database')
}
console.log('Reset DB')
run()