import { ECost } from 'enums/cost'

export type GetRateResponseType = {
  Cur_ID: number
  Date: Date
  Cur_Abbreviation: ECost
  Cur_Scale: number
  Cur_Name: string
  Cur_OfficialRate: number
}
