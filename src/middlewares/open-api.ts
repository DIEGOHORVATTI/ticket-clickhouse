import { swagger } from '@elysiajs/swagger'

import { version } from '@/constants/config'

export const openApi = swagger({
  path: '/docs',
  exclude: ['/docs', '/docs/json'],
  scalarConfig: {
    favicon: 'https://www.icamaissaude.com.br/img/favicon.svg'
  },
  documentation: {
    info: {
      version,
      title: 'ICA Bank | +Saúde API',
      description: `API Ica Mais Saúde | Protegendo sua saúde e a de quem você ama.`
    }
  }
})
