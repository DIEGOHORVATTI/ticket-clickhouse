export const collectionsData = {
  CallEvent: {
    name: 'CallEvent',
    collection: 'call-events'
  }
}

const apiIntegrations = {
  nominatim: 'https://nominatim.openstreetmap.org',
  countries: 'https://countriesnow.space/api/v0.1'
}

// Environment variables
export const NODE_ENV = process.env.NODE_ENV
export const PORT = process.env.PORT || 3000
export { version } from '../../package.json'

// Database configuration
export const MONGODB_DATABASE = process.env.MONGODB_DATABASE || ''
export const MONGO_URL = process.env.MONGO_URI || ''

// AWS S3 Configuration
export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY || ''
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY || ''
export const AWS_REGION = process.env.AWS_REGION || ''
export const S3_BUCKET = process.env.S3_BUCKET || ''
