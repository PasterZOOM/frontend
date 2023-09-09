import { ECost } from 'features/currancy/lib/enum/eCost'

export type GetRateResponseType = {
  Cur_Abbreviation: ECost
  Cur_ID: number
  Cur_Name: string
  Cur_OfficialRate: number
  Cur_Scale: number
  Date: Date
}
