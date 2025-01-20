import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios'

export async function httpFetch<T>({ url, method = 'GET', options }: UseRequestProps) {
  try {
    const axiosConfig: AxiosRequestConfig = { url, method, ...options }

    const response = await axios(axiosConfig)

    return response.data
  } catch (error) {
    const axiosError = error as AxiosError<T>

    console.info('Error Fetch:', axiosError)

    throw axiosError
  }
}

type UseRequestProps = {
  url: string
  method?: Uppercase<Method>
  options?: Options
}

type Options = {
  headers?: Record<string, string>
  params?: Record<string, any>
  data?: Record<string, any>
}
