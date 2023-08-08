import { ECreateBasicProductParams } from 'features/basicProducts/enums/paramsKeys'
import { EPunchPitch } from 'shared/enums/materials'
import { EProductAssignment, EProductCategory } from 'shared/enums/product'

export type CreateBasicProductFormType = {
  [ECreateBasicProductParams.LEATHER_ARTICLE]: string
  [ECreateBasicProductParams.DESCRIPTION]: string
  [ECreateBasicProductParams.TITLE]: string
  [ECreateBasicProductParams.SIZE]: string
  [ECreateBasicProductParams.COST]: number
  [ECreateBasicProductParams.CATEGORY]: EProductCategory
  [ECreateBasicProductParams.PUNCH_PITCH]: EPunchPitch
  [ECreateBasicProductParams.ASSIGNMENTS]: EProductAssignment[]
}
