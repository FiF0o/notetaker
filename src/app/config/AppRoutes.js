import React from 'react'
/*
  Importing components here to be rendered depending on the route we are at
  in - App.js -
*/
import Main from '../components/Main'
import Home from '../components/Home'
import Profile from '../components/Profile'

// imports Route objects from react router to be used to render Routes
import { Route, IndexRoute } from 'react-router'

export default (
  <Route path="/" component={ Main }>
    <IndexRoute component={ Home } />
    <Route path="profile/:username" component={ Profile } />


  </Route>
)
// exporting Routes instructions for app js.
// IndexRoute is the component being rendered