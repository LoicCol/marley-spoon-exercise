import { renderHook } from '@testing-library/react-hooks'
import { useFetchRecipes } from './useFetchRecipes'
import * as mockedUseFetch from './useFetch'

test('Results when is Loading is true', () => {
  jest.spyOn(mockedUseFetch, 'useFetch').mockImplementation(() => ({
    data: undefined,
    isLoading: true,
    error: '',
  }))

  const { result } = renderHook(() => useFetchRecipes())

  expect(mockedUseFetch.useFetch).toHaveBeenCalled()

  expect(result.current.recipes).toEqual([])
  expect(result.current.isLoading).toBe(true)
  expect(result.current.error).toBe('')
})

test('Results when there is an Error', () => {
  const errorMessage = 'An error occured.'
  jest.spyOn(mockedUseFetch, 'useFetch').mockImplementation(() => ({
    data: undefined,
    isLoading: false,
    error: errorMessage,
  }))

  const { result } = renderHook(() => useFetchRecipes())

  expect(mockedUseFetch.useFetch).toHaveBeenCalled()

  expect(result.current.recipes).toEqual([])
  expect(result.current.isLoading).toBe(false)
  expect(result.current.error).toBe(errorMessage)
})

const minimalContentfulData = {
  items: [
    {
      sys: {
        id: 'IDRECIPE1',
      },
      fields: {
        title: 'First recipe',
        photo: {
          sys: {
            id: 'IDPHOTO1',
          },
        },
        description: 'Description of the first recipe',
        tags: [
          {
            sys: {
              id: 'IDTAG',
            },
          },
        ],
        chef: {
          sys: {
            id: 'IDCHEF',
          },
        },
      },
    },
    {
      sys: {
        id: 'IDRECIPE2',
      },
      fields: {
        title: 'Second recipe',
        photo: {
          sys: {
            id: 'IDPHOTO2',
          },
        },
        description:
          'Description of the second recipe - No tags & no photo recipe',
      },
    },
  ],
  includes: {
    Entry: [
      {
        sys: {
          id: 'IDTAG',
        },
        fields: { name: 'vegan' },
      },
      {
        sys: {
          id: 'IDCHEF',
        },
        fields: { name: 'Mocked Chef Name' },
      },
    ],
    Asset: [
      {
        sys: {
          id: 'IDPHOTO1',
        },
        fields: {
          file: {
            url: '/',
            details: {},
            fileName: 'image1.jpg',
            contentType: 'image/jpeg',
          },
        },
      },
      {
        sys: {
          id: 'IDPHOTO2',
        },
        fields: {
          file: {
            url: '/',
            details: {},
            fileName: 'image2.jpg',
            contentType: 'image/jpeg',
          },
        },
      },
    ],
  },
}

const formatedRecipes = [
  {
    id: 'IDRECIPE1',
    title: 'First recipe',
    description: 'Description of the first recipe',
    chefName: 'Mocked Chef Name',
    image: {
      contentType: 'image/jpeg',
      details: {},
      fileName: 'image1.jpg',
      url: '/',
    },
    tags: ['vegan'],
  },
  {
    id: 'IDRECIPE2',
    title: 'Second recipe',
    description: 'Description of the second recipe - No tags & no photo recipe',
    chefName: undefined,
    image: {
      contentType: 'image/jpeg',
      details: {},
      fileName: 'image2.jpg',
      url: '/',
    },
    tags: [],
  },
]

test('Format data with a minimal data passed', () => {
  jest.spyOn(mockedUseFetch, 'useFetch').mockImplementation(() => ({
    data: minimalContentfulData,
    isLoading: false,
    error: '',
  }))

  const { result } = renderHook(() => useFetchRecipes())

  expect(mockedUseFetch.useFetch).toHaveBeenCalled()

  expect(result.current.recipes).toEqual(formatedRecipes)
  expect(result.current.isLoading).toBe(false)
  expect(result.current.error).toBe('')
})
