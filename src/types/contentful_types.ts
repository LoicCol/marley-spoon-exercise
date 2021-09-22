export type Includes = {
  Asset: Asset[]
  Entry: (ChiefEntry | TagEntry)[]
}

export type Asset = {
  sys: Sys
  fields: {
    file: File
  }
}

export type ChiefEntry = {
  sys: Sys
  fields: {
    name: string
  }
}

export type TagEntry = {
  sys: Sys
  fields: {
    name: string
  }
}

export type Link = {
  sys: Sys
}

export type Sys = {
  id: string
}
