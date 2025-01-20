import { Elysia } from 'elysia'

import { openApi } from '@/middlewares/open-api'
import { rateLimit } from '@/middlewares/rate-limit'
import cors from '@elysiajs/cors'

import { PORT, version } from '@/constants/config'

import { router } from './router'
import { User } from './modules/users/domain'

async function removeEmailIndexes() {
  try {
    const indexes = await User.model.collection.indexes()

    const emailIndexes = indexes.filter(index => index.key.email)

    for (const index of emailIndexes) {
      if (index.name) {
        await User.model.collection.dropIndex(index.name)
        console.log(`Índice removido: ${index.name}`)
      }
    }

    console.log('Todos os índices relacionados ao campo "email" foram removidos.')
  } catch (error) {
    console.error('Erro ao remover índices:', error)
  }
}

new Elysia()
  .use(
    cors({
      preflight: true,
      //origin: Bun.env.URL,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    })
  )
  .use(rateLimit)
  .onStart(removeEmailIndexes)
  .onError(({ code, error }) => {
    if (code === 'NOT_FOUND') return 'Route not found 😭'

    if (code === 'VALIDATION') {
      const { summary, ...primaryError } = error.all[0]

      if ('path' in primaryError) return { error: `${primaryError.path.slice('/'.length)}: ${summary}` }

      return { error: summary }
    }

    return error
  })
  .use(openApi)
  .use(router(__dirname)) // Usar o roteador customizado
  .get('/', () => `API is running 🚀: v${version}`) // Rota principal
  .listen(PORT, ({ url }) => console.info(`🦊 Elysia is running at ${url}`))
