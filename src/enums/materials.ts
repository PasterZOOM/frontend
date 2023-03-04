export enum EPunchPitch {
  LITTLE = '3.00',
  MEDIUM = '3.35',
  LARGE = '3.85',
}
export enum ELeather {
  BUTTERO = 'BUTTERO',
  WAX = 'WAX',
  PUEBLO = 'PUEBLO',
}

export enum ELeatherColor {
  BLACK = 'BLACK',
  RED = 'RED',
  GREEN = 'GREEN',
  YELLOW = 'YELLOW',
}
export enum EButteroCode {
  RED = '1',
  BLACK = '2',
  GREEN = '3',
}
export enum EWaxCode {
  GREEN = '1',
  YELLOW = '2',
}
export type TButteroCode = keyof typeof EButteroCode
export type TWaxCode = keyof typeof EWaxCode
export type TLeather = keyof typeof ELeather
export type TLeatherColor = keyof typeof ELeatherColor
