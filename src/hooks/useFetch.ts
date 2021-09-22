import { useEffect, useReducer } from 'react'

type State = {
  data?: any
  isLoading: boolean
  error?: string
}

type Action =
  | { type: 'request' }
  | { type: 'success'; data: any }
  | { type: 'failure'; error: string }

const initialState: State = {
  data: null,
  isLoading: false,
  error: '',
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'request':
      return { isLoading: true }
    case 'success':
      return { isLoading: false, data: action.data }
    case 'failure':
      return { isLoading: false, error: action.error }
  }
}

export const useFetch = ({ url }: { url: string }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: 'request' })
    const fetchAPI = async () => {
      try {
        const response = await window.fetch(url, {
          method: 'GET',
        })
        const data = await response.json()
        return dispatch({ type: 'success', data: data })
      } catch (err) {
        /* Log error to the logger system */
        return dispatch({ type: 'failure', error: 'An error occurred.' })
      }
    }

    fetchAPI()
  }, [url])

  return state
}
