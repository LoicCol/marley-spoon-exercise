import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Recipe } from '../types'
import { Box, Button, Image, Text } from './common'

type RecipeDetailsProps = {
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
        <Button mb='2vmin' p={2} onClick={onBackButtonClick}>
          {`< Back to all recipes`}
        </Button>
        <Image src={recipe?.image?.url} />
        <Text mt='2vmin' textAlign='start' as='h1' fontSize='4vmin'>
          {recipe?.title}
        </Text>
        <Box display='flex'>
          {recipe?.tags.map((tag) => (
            <Box
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
        <Text textAlign='start' mt='5vmin' fontSize='2.6vmin'>
          {recipe?.description}
        </Text>
        {recipe?.chefName && (
          <Box display='flex'>
            <Text
              as='i'
              textAlign='start'
              mt='5vmin'
              fontSize='2.6vmin'
              pr='2vmin'
            >
              Made by
            </Text>
            <Text
              textAlign='start'
              mt='5vmin'
              fontSize='2.6vmin'
              fontWeight={450}
            >
              {recipe?.chefName}
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default RecipeDetails
