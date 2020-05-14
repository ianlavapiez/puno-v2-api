const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

const makeDbConnection = async function () {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
  }
}

makeDbConnection()
