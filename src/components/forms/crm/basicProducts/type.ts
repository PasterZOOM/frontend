import { ECost } from '@/enums/cost'
import { ECreateBasicProductParams } from '@/enums/crm/basicProduct'
import { EPunchPitch } from '@/enums/materials'
import { EProductCategory } from '@/enums/product'

export type CreateBasicProductFormType = Record<ECreateBasicProductParams, string> & {
  [ECreateBasicProductParams.CATEGORY]: EProductCategory
  [ECreateBasicProductParams.COST_CURRENCY]: ECost
  [ECreateBasicProductParams.PUNCH_PITCH]: EPunchPitch
}
