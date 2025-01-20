import Elysia from 'elysia'

import { readdirSync } from 'fs'
import { join } from 'path'

/**
 * Carrega rotas de cada submódulo em uma estrutura fixa.
 * @param dirname - Diretório base onde os módulos estão localizados.
 */
export const router = async (dirname: string) => {
  const app = new Elysia({ prefix: '' })
  const modulesDir = join(dirname, 'modules')

  // Itera por todos os subdiretórios em 'modules'
  for (const module of readdirSync(modulesDir)) {
    const routesPath = join(modulesDir, module, 'routes.ts')

    // Importa diretamente o arquivo 'routes.ts' de cada submódulo
    const routeModule = (await import(routesPath)).default

    app.use(routeModule)
  }

  return app
}
