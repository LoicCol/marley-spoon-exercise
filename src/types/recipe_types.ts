export type Recipe = {
  id: string
  title: string
  image?: {
    url: string
  }
  tags: string[]
  description?: string
  chefName?: string
}
