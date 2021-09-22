import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { useFetchRecipes } from '../hooks'

import RecipesList from './RecipesList'
import RecipeDetails from './RecipeDetails'
import { Box, Text } from './common'

function Home() {
  const { recipes, isLoading, error } = useFetchRecipes()

  if (isLoading) {
    return (
      <Box
        width='100vw'
        height='100vh'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Text>Loading ...</Text>
      </Box>
    )
  }

  if (error) {
    return (
      <Box
        width='100vw'
        height='100vh'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        {error}
      </Box>
    )
  }

  return (
    <Router>
      <Switch>
        <Route path='/recipes/:recipeId'>
          <RecipeDetails recipes={recipes} />
        </Route>
        <Route path='/'>
          <RecipesList recipes={recipes} />
        </Route>
      </Switch>
    </Router>
  )
}

export default Home
