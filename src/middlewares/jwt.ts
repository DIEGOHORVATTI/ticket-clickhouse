import { Elysia, error, t } from 'elysia'

import { IUser, User } from '@/modules/users/domain'

import { jwtSettings } from '@/shared/jwt-settings'

import type { Document } from 'mongoose'

export const jwt = (app: Elysia) =>
  app
    .use(jwtSettings)
    .guard({ cookie: t.Cookie({ token: t.String() }) })
    .derive(async ({ cookie: { token }, jwt }) => {
      if (!token.value) {
        throw error('Unauthorized', { error: 'Nenhum token encontrado nos cookies' })
      }

      const decoded = await jwt.verify(token.value)
      if (!decoded) {
        throw error('Unauthorized', { error: 'Token inválido' })
      }

      const user = await User.model.findById(decoded.id).select('-password -resetPassword').lean<IUser & Document>()
      if (!user) {
        throw error('Unauthorized', { error: 'Usuário não encontrado', reLogin: true })
      }

      return { user, token }
    })
