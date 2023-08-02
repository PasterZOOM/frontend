/**
 * Хук для под грузки переводов при изменении локали
 * @param refetch {function} функция пере запроса данных
 */
// export const useRefetchAfterChangeLocale = (refetch: () => void): void => {
//   const locale = useLocale()
//   const isFirstRender = useIsFirstRender()
//
//   useEffect(() => {
//     ;(async () => !isFirstRender && refetch())()
//   }, [isFirstRender, locale, refetch])
// }
