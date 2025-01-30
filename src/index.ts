import { Elysia } from 'elysia'

import { openApi } from '@/middlewares/open-api'
import { rateLimit } from '@/middlewares/rate-limit'
import { sentry } from 'elysiajs-sentry'
import cors from '@elysiajs/cors'

import { PORT, version } from '@/constants/config'

import { router } from './router'

new Elysia()
  .use(
    cors({
      preflight: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    })
  )
  .use(rateLimit)
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
  .use(router(__dirname))
  .use(sentry())
  .get('/', () => `API is running 🚀: v${version}`) // Rota principal
  .listen(PORT, ({ url }) => console.info(`🦊 Elysia is running at ${url}`))
