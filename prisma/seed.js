const bcrypt = require('bcryptjs')
const prisma = require('../src/config/prisma')
const { v4: uuidv4 } = require('uuid');

const admin_password = bcrypt.hashSync('admin123')

const adminData = [
  { first_name: 'ปุระชัย', last_name: 'เหมกุล', username: 'admin1', password: admin_password, email: '633120100117@gmail.com' },
  { first_name: 'ปุระชัย', last_name: 'สำรอง', username: 'admin2', password: admin_password, email: 'purashuyfiew20@gmail.com' }
]

const subdistrictData = [
  {name: 'อบต.กุดโดน', sub_district: 'ตำบลกุดโดน',district: 'ห้วยเม็ก',province: 'กาฬสินธุ์',zipcode: '46170'}
]

const locationData = [
  {location: 'บ้าน' , name_location: 'บ้านพักอาศัย'},
  {location: 'วัด' , name_location: 'วัดบ้านกุดโดน'},
  {location: 'ศาลากลางบ้าน' , name_location: 'ศาลากลางบ้านนาค้อ'}
]

const natureData = [
  {name_nature: 'เลี้ยงแบบปล่อย'},
  {name_nature: 'เลี้ยงแบบปิด(ภายในบ้าน)'}
]

const recorder_password = bcrypt.hashSync('recorder')
const recorderData = [
  {id: uuidv4(), first_name: 'ถนอม', last_name: 'กิตติ', username: 'recorder1', password: recorder_password, email: 'recorder1@gmail.com', subdistrictId: 1},
  {id: uuidv4(), first_name: 'นุ่มนวล', last_name: 'หมอนมุ้ง', username: 'recorder2', password: recorder_password, email: 'recorder2@gmail.com', subdistrictId: 1},
  {id: uuidv4(), first_name: 'พรศักดิ์', last_name: 'ส่องทาง', username: 'recorder3', password: recorder_password, email: 'recorder3@gmail.com', subdistrictId: 1}
]

const createData = async () => {
  await prisma.admin.createMany({
    data: adminData
  })
  await prisma.subdistrict.createMany({
    data: subdistrictData
  })
  await prisma.location.createMany({
    data: locationData
  })
  await prisma.nature.createMany({
    data: natureData
  })
  await prisma.recorder.createMany({
    data: recorderData
  })
}

createData()