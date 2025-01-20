import { MONGO_URL, MONGODB_DATABASE as dbName, NODE_ENV, version } from '@/constants/config'

import { createConnection } from 'mongoose'

export const connectDB = createConnection(MONGO_URL, { dbName, maxPoolSize: 10 })

connectDB.once('connected', () => {
  console.info('🐋 Database connected')

  if (NODE_ENV) console.info(`🌟 ${NODE_ENV}`)

  if (version) console.info(`🔖 v${version}`)
})

connectDB.on('error', error => {
  console.error(`🔥 ${error}`)
})
