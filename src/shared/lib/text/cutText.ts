import { DEFAULT_CUT_TEXT } from 'shared/constants/text/defaultCutText'

export const cutText: CutTextFnType = (str = '', length = DEFAULT_CUT_TEXT) => {
  const cut = str.slice(0, length)

  if (cut.length < DEFAULT_CUT_TEXT) {
    return cut
  }

  return `${cut.replace(/([.,?!-]|\s\S*)$/, '')}...`
}
type CutTextFnType = (str: string, length?: number) => string
