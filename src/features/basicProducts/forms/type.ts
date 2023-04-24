import { ECost } from 'enums/cost'
import { EPunchPitch } from 'enums/materials'
import { EProductAssignment, EProductCategory } from 'enums/product'
import { ECreateBasicProductParams } from 'features/basicProducts/enums/paramsKeys'

export type CreateBasicProductFormType = {
  [ECreateBasicProductParams.LEATHER_ARTICLE]: string
  [ECreateBasicProductParams.DESCRIPTION_EN]: string
  [ECreateBasicProductParams.DESCRIPTION_RU]: string
  [ECreateBasicProductParams.TITLE_RU]: string
  [ECreateBasicProductParams.TITLE_EN]: string
  [ECreateBasicProductParams.COST]: number
  [ECreateBasicProductParams.SIZE_EN]: string
  [ECreateBasicProductParams.SIZE_RU]: string
  [ECreateBasicProductParams.CATEGORY]: EProductCategory
  [ECreateBasicProductParams.COST_CURRENCY]: ECost
  [ECreateBasicProductParams.PUNCH_PITCH]: EPunchPitch
  [ECreateBasicProductParams.ASSIGNMENTS]: EProductAssignment[]
}
