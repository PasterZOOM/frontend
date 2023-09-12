import { QueryParam } from 'shared/types/queryParam'

/**
 * axios parses the parameters incorrectly;
 * when passing an array of values instead of
 * '?bla=1&bla=2' the request ends up with '?bla[]=1&bla[]=2'
 * this function solves this problem
 * */
export const paramsSerializer = (params: Record<string, QueryParam>): string => {
  const res: string[] = []

  Object.entries(params).forEach(([key, value]) => {
    if (value instanceof Array) {
      value.forEach(val => res.push(`${key}=${val}`))
    } else if (typeof value === 'string') {
      res.push(`${key}=${value}`)
    }
  })

  if (res.length) {
    return `${res.join('&')}`
  }

  return ''
}
