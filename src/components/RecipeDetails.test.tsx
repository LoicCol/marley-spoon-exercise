import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import RecipeDetails, { RecipeDetailsProps } from './RecipeDetails'

const recipesMock = [
  {
    id: 'IDRECIPE1',
    title: 'Recipe 1',
    image: { url: 'https://picsum.photos/200/300' },
    tags: ['healthy', 'vegan'],
    description: 'Descriprion of the recipe',
    chefName: 'The best chef of the world',
  },
]

const mockedHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  useParams: () => ({
    recipeId: recipesMock[0].id,
  }),
  useHistory: () => ({
    push: mockedHistoryPush,
  }),
}))

const renderer = (props: RecipeDetailsProps) => {
  const utils = render(<RecipeDetails {...props} />)
  return { ...utils }
}

test('Render all elements of a recipe & on back button click', () => {
  renderer({ recipes: recipesMock })

  const recipe = recipesMock[0]

  const photo = screen.getByRole('img')
  const title = screen.getByText(recipe.title)
  const tags = recipe.tags.map((tag) => screen.getByText(tag))
  const description = screen.getByText(recipe.description)
  const chefName = screen.getByText(recipe.chefName)

  expect(photo).toBeInTheDocument()
  expect(title).toBeInTheDocument()
  tags.forEach((tag) => expect(tag).toBeInTheDocument())
  expect(description).toBeInTheDocument()
  expect(chefName).toBeInTheDocument()

  const button = screen.getByRole('button')
  userEvent.click(button)
  expect(mockedHistoryPush).toHaveBeenCalledWith('/recipes')
})

const recipesMocked2 = [
  {
    id: 'IDRECIPE1',
    title: 'Recipe 1',
  },
]

test('Renders elements without non required attributes', () => {
  renderer({
    recipes: recipesMocked2,
  })

  const recipe = recipesMock[0]

  const title = screen.getByText(recipe.title)
  expect(title).toBeInTheDocument()
})
