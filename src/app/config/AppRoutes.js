import React from 'React'

/*
  Importing components here to be rendered depending on the route we are at
  in - App.js -
*/
import Main from '../components/Main'
import Home from '../components/Home'

// imports Route objects from react router to be used to render Routes
import { Route } from 'react-router'

export default (
  <Route path="/" component={ Main }>
    <Route path="home" component={ Home }/>
  </Route>
)

// exporting Routes instructions for app js.
