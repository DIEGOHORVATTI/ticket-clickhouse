import { error } from 'elysia'

import { CallEvent } from '@/modules/specialties/domain'

import { convertObjectToQuery, paginationSettings } from '@/shared'

export const getAllSpecialtiesService = async ({
  page = 0,
  limit = 10,
  ...filters
}: typeof CallEvent.filters.static) => {
  const queryFilters = convertObjectToQuery(filters)

  const options = paginationSettings({ page, limit })

  const { data: specialties, ...pagination } = await CallEvent.model.paginate(queryFilters, options).catch(() => {
    throw error('Internal Server Error', { error: 'Falha ao buscar especialidades' })
  })

  return { specialties, pagination }
}
