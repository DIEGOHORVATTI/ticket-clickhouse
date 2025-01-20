import { t } from 'elysia'
import { jwt } from '@elysiajs/jwt'

import { JWT_SECRET as secret } from '@/constants/config'

const schema = t.Object({
  id: t.String(),
  email: t.Optional(t.String({ format: 'email' }))
})

export const jwtSettings = jwt({ name: 'jwt', exp: '7d', secret, schema })
