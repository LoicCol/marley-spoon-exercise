import React from 'react'
import { Box, Text, Image } from './common'
import { Recipe } from '../types'
import { useHistory } from 'react-router-dom'

export type RecipesListProps = {
  recipes: Recipe[]
}

const RecipesList: React.FC<RecipesListProps> = ({ recipes, ...props }) => {
  const history = useHistory()

  const onClick = ({ id }: { id: string }) => {
    history.push(`/recipes/${id}`)
  }
  return (
    <Box display='flex' flexWrap='wrap' justifyContent='center'>
      {recipes.map(({ id, title, image }) => (
        <RecipeListElement
          key={id}
          id={id}
          title={title}
          image={image}
          onClick={onClick}
        />
      ))}
    </Box>
  )
}

type RecipeListElementProps = Recipe & {
  onClick: ({ id }: { id: string }) => void
}

const RecipeListElement = ({
  id,
  title,
  image,
  onClick,
  ...props
}: RecipeListElementProps) => {
  return (
    <Box
      width='50vmin'
      m={20}
      onClick={() => onClick({ id })}
      border='1px solid #47d7ac4f'
      borderRadius={4}
    >
      {image ? <Image src={image?.url} /> : null}
      <Text textAlign='start' p={3} fontSize='3vmin'>
        {title}
      </Text>
    </Box>
  )
}

export default RecipesList
