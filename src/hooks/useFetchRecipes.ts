import { useFetch } from './useFetch'
import { DB_URL, DB_CREDENTIALS } from '../constants'
import { Recipe, Includes, Sys, Link } from '../types'

export const useFetchRecipes = () => {
  const { data, isLoading, error } = useFetch({
    url: `${DB_URL}${DB_CREDENTIALS.spaceID}/environments/${DB_CREDENTIALS.environmentID}/entries?access_token=${DB_CREDENTIALS.accessToken}&include=1&content_type=recipe`,
  })

  if (!data || isLoading || error) {
    return { recipes: [], isLoading, error }
  }

  const recipes = formatRecipes({ data })

  return { recipes, isLoading, error }
}

const formatRecipes = ({ data }: { data: any }): Recipe[] => {
  const { items, includes } = data

  return items.map(({ fields, sys }: { fields: any; sys: Sys }) => ({
    id: sys.id,
    title: fields.title,
    image: findImage({ includes, photo: fields.photo }),
    tags: findTags({ includes, tags: fields.tags }),
    description: fields.description || '',
    chefName: findChefName({ includes, chef: fields.chef }),
  }))
}

const findImage = ({
  includes,
  photo,
}: {
  includes: Includes
  photo: Link
}): File | undefined =>
  includes.Asset.find(({ sys: assetSys }) => assetSys.id === photo.sys.id)
    ?.fields.file

const findTags = ({
  includes,
  tags,
}: {
  includes: Includes
  tags: Link[]
}): string[] => {
  return (
    tags
      ?.map(
        (tag) =>
          includes.Entry.find(({ sys: entrySys }) => entrySys.id === tag.sys.id)
            ?.fields.name || ''
      )
      .filter((obj) => !!obj) || []
  )
}

const findChefName = ({
  includes,
  chef,
}: {
  includes: Includes
  chef: Link
}): string | undefined =>
  includes.Entry.find(({ sys: assetSys }) => assetSys.id === chef?.sys.id)
    ?.fields.name
