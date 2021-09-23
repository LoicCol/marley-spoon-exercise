/**
 * Recipe type, considering that the ID & the Title are required
 */
export type Recipe = {
  id: string
  title: string
  image?: {
    url: string
  }
  tags?: string[]
  description?: string
  chefName?: string
}
