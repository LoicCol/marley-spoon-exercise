import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Recipe } from '../types'
import { Box, Button, Image, Text } from './common'

export type RecipeDetailsProps = {
  recipes: Recipe[]
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipes, ...props }) => {
  const history = useHistory()
  const { recipeId } = useParams<{ recipeId: string }>()

  const recipe = recipes.find(({ id }) => id === recipeId)

  const onBackButtonClick = () => {
    history.push('/recipes')
  }

  return (
    <Box
      width='100%'
      display='flex'
      flexDirection='column'
      alignItems='center'
      pt={10}
      pb={20}
    >
      <Box
        width='90vmin'
        alignItems='start'
        display='flex'
        flexDirection='column'
      >
        <BackButton onClick={onBackButtonClick} />
        <Image src={recipe?.image?.url} />
        <RecipeTitle title={recipe?.title || ''} />
        <RecipeTags tags={recipe?.tags} />
        <RecipeDescription description={recipe?.description} />
        <RecipeChefName chefName={recipe?.chefName} />
      </Box>
    </Box>
  )
}

const BackButton = ({ onClick }: { onClick: (event: MouseEvent) => void }) => (
  <Button mb='2vmin' p={2} onClick={onClick}>
    {`< Back to all recipes`}
  </Button>
)

const RecipeTitle = ({ title }: Pick<Recipe, 'title'>) => (
  <Text mt='2vmin' textAlign='start' as='h1' fontSize='4vmin'>
    {title}
  </Text>
)

const RecipeTags = ({ tags = [] }: Pick<Recipe, 'tags'>) => {
  return (
    <Box display='flex'>
      {tags.map((tag, index) => (
        <Box
          key={`${tag}${index}`}
          border='3px solid #47d7ac4f'
          display='inline-block'
          p={2}
          alignSelf='start'
          mr={20}
          mt='2vmin'
        >
          <Text
            fontSize='2.7vmin'
            fontWeight={500}
            textTransform='uppercase'
            color='#47d7ac'
          >
            {tag}
          </Text>
        </Box>
      ))}
    </Box>
  )
}

const RecipeDescription = ({ description }: Pick<Recipe, 'description'>) => (
  <Text textAlign='start' mt='5vmin' fontSize='2.6vmin'>
    {description}
  </Text>
)

const RecipeChefName = ({ chefName }: Pick<Recipe, 'chefName'>) => {
  if (!chefName) return null
  return (
    <Box display='flex'>
      <Text as='i' textAlign='start' mt='5vmin' fontSize='2.6vmin' pr='2vmin'>
        Made by
      </Text>
      <Text textAlign='start' mt='5vmin' fontSize='2.6vmin' fontWeight={450}>
        {chefName}
      </Text>
    </Box>
  )
}

export default RecipeDetails
