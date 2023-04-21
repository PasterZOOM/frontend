import { DEFAULT_CUT_TEXT } from 'constants/text/defaultCutText'

export const cutText: CutTextFnType = (str, length = DEFAULT_CUT_TEXT) =>
  str.length ? `${str.slice(0, length).replace(/([.,?!-]|\s\S*)$/, '')}...` : ''

type CutTextFnType = (str: string, length?: number) => string
