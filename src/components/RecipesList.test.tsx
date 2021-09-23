import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import RecipesList, { RecipesListProps } from './RecipesList'

const renderer = (props: RecipesListProps) => {
  const utils = render(<RecipesList {...props} />)
  return { ...utils }
}

const mockedHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockedHistoryPush,
  }),
}))

test('Render elements & click on element', () => {
  const recipesMock = [
    {
      id: 'IDRECIPE1',
      title: 'Recipe 1',
      image: { url: 'https://picsum.photos/200/300' },
    },
    {
      id: 'IDRECIPE2',
      title: 'Recipe 2',
      image: { url: 'https://picsum.photos/200/300' },
    },
  ]

  renderer({ recipes: recipesMock })

  const title1 = screen.getByText(recipesMock[0].title)
  const title2 = screen.getByText(recipesMock[1].title)
  const photos = screen.getAllByRole('img')

  /** Ensure that elements are rendered */
  expect(title1).toBeInTheDocument()
  expect(title2).toBeInTheDocument()
  photos.forEach((photo) => expect(photo).toBeInTheDocument())

  /**
   * Ensure that click on element push to the history with the good id
   */
  userEvent.click(photos[0])
  expect(mockedHistoryPush).toHaveBeenCalledWith(
    `/recipes/${recipesMock[0].id}`
  )

  userEvent.click(title1)
  expect(mockedHistoryPush).toHaveBeenNthCalledWith(
    2,
    `/recipes/${recipesMock[0].id}`
  )
})
