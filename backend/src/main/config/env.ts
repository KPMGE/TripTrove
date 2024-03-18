import dotenv from 'dotenv'
dotenv.config()

export const env = {
  port: process.env.PORT || 3333,
  postgresUser: process.env.POSTGRES_USER,
  postgresHost: process.env.POSTGRES_HOST,
  postgresDatabase: process.env.POSTGRES_DATABASE,
  postgresPassword: process.env.POSTGRES_PASSWORD,
  postgresPort: process.env.POSTGRES_PORT
}
