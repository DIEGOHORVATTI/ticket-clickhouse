import { swagger } from '@elysiajs/swagger'

import { version } from '@/constants/config'

export const openApi = swagger({
  path: '/docs',
  exclude: ['/docs', '/docs/json'],
  scalarConfig: {
    favicon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq04hgf7_92WDg5-mP2553bvCBKcXJWpi8Gg&s'
  },
  documentation: {
    info: {
      version,
      title: 'Poc ClickHouse',
      description: `Veririfcando a viabilidade de uso do ClickHouse com NodeJS`
    }
  }
})
