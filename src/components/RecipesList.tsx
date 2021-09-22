import React from 'react'
import { useFetchRecipes } from '../hooks'

type RecipesListProps = {}

const RecipesList: React.FC<RecipesListProps> = ({ ...props }) => {
  const res = useFetchRecipes()

  return <div>RecipesList</div>
}

export default RecipesList
