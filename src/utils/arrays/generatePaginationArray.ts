import { v1 } from 'uuid'

type PageButtonType = {
  value: number
  id: string
  title: string
}
const TWO = 2

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
  const VISIBLE_PAGES = PREV_NEXT_PAGES * TWO + 1

  let core: PageButtonType[] = [
    first,
    { ...emptyButton, id: v1() },
    ...pages.slice(currentPage - (PREV_NEXT_PAGES + 1), currentPage + PREV_NEXT_PAGES),
    { ...emptyButton, id: v1() },
    last,
  ]

  if (pagesCount <= VISIBLE_PAGES) {
    core = pages
  }

  if (currentPage <= PREV_NEXT_PAGES + TWO) {
    core = [...pages.slice(0, VISIBLE_PAGES + TWO), { ...emptyButton, id: v1() }, last]
  }
  if (currentPage === PREV_NEXT_PAGES + TWO + 1) {
    core = [...pages.slice(0, currentPage + PREV_NEXT_PAGES), { ...emptyButton, id: v1() }, last]
  }

  if (currentPage >= pagesCount - PREV_NEXT_PAGES - TWO) {
    core = [
      pages[0],
      { ...emptyButton, id: v1() },
      ...pages.slice(pagesCount - VISIBLE_PAGES - TWO),
    ]
  }

  return core
}
