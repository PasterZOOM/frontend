export type ProductPhotoType = {
  _id: string
  path: string
}

export type PhotosType = Record<string, ProductPhotoType[]> // string - _id из LeatherColorType
