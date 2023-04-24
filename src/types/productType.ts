export type ProductPhotoType = {
  _id: string
  url: string
}

export type PhotosType = Record<string, ProductPhotoType[]> // string - _id из LeatherColorType
