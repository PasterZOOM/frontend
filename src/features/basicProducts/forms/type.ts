import { ECost } from '@/enums/cost'
import { EPunchPitch } from '@/enums/materials'
import { EProductCategory } from '@/enums/product'
import { ECreateBasicProductParams } from '@/features/basicProducts/enums/paramsKeys'

export type CreateBasicProductFormType = Record<ECreateBasicProductParams, string> & {
  [ECreateBasicProductParams.CATEGORY]: EProductCategory
  [ECreateBasicProductParams.COST_CURRENCY]: ECost
  [ECreateBasicProductParams.PUNCH_PITCH]: EPunchPitch
}
