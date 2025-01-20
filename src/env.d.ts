export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // string(development | production), example: development
      NODE_ENV: 'development' | 'production'

      // string, example: 90d0b2f0-4b1a-4b1a-8b1a-4b1a4b1a4b1a
      JWT_SECRET: string
      // string, example 2 | 10 | 30 days
      JWT_EXPIRATION_TIME: number

      // string, example: smtp.gmail.com
      MAIL_HOST: string
      // string, example: 1231233412
      MAIL_PASSWORD: string
      // string, example: lorem@ipsum.gmail.com
      MAIL_USERNAME: string
      // number, example: 587
      MAIL_PORT: number

      // AWS S3 Configuration
      AWS_ACCESS_KEY: string
      AWS_SECRET_KEY: string
      AWS_REGION: string
      S3_BUCKET: string
    }
  }
}
