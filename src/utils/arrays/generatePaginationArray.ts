import { v1 } from 'uuid'

type PageButtonType = {
  value: number
  id: string
  title: string
}
const LEFT_DOP_BUTTONS = 2
const RIGHT_DOP_BUTTONS = 2

export const generatePaginationArray = (
  currentPage: number,
  pagesCount: number,
  nextButtonsCount: number
): PageButtonType[] => {
  const pages: Array<PageButtonType> = Array(pagesCount)
    .fill(1)
    .map((_, i) => ({ value: i + 1, id: v1(), title: `${i + 1}` }))

  const emptyButton: Omit<PageButtonType, 'id'> = { value: 0, title: '...' }

  const first: PageButtonType = pages[0]
  const last: PageButtonType = pages[pagesCount - 1]

  const PREV_NEXT_PAGES = nextButtonsCount
  const VISIBLE_PAGES = PREV_NEXT_PAGES + PREV_NEXT_PAGES + 1

  if (pagesCount <= VISIBLE_PAGES + LEFT_DOP_BUTTONS + RIGHT_DOP_BUTTONS) {
    return pages
  }

  if (currentPage <= PREV_NEXT_PAGES + LEFT_DOP_BUTTONS) {
    return [...pages.slice(0, VISIBLE_PAGES + LEFT_DOP_BUTTONS), { ...emptyButton, id: v1() }, last]
  }
  if (currentPage === PREV_NEXT_PAGES + LEFT_DOP_BUTTONS + 1) {
    return [...pages.slice(0, currentPage + PREV_NEXT_PAGES), { ...emptyButton, id: v1() }, last]
  }

  if (currentPage >= pagesCount - PREV_NEXT_PAGES - RIGHT_DOP_BUTTONS) {
    return [
      pages[0],
      { ...emptyButton, id: v1() },
      ...pages.slice(pagesCount - VISIBLE_PAGES - RIGHT_DOP_BUTTONS),
    ]
  }

  return [
    first,
    { ...emptyButton, id: v1() },
    ...pages.slice(currentPage - (PREV_NEXT_PAGES + 1), currentPage + PREV_NEXT_PAGES),
    { ...emptyButton, id: v1() },
    last,
  ]
}
