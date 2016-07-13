/**
 * Created by jonlazarini on 13/07/16.
 */ 
import React from 'react'
import { Router } from 'react-router'

import Repos from './Github/Repos'
import UserProfile from './Github/UserProfile'
import Notes from './Notes/Notes'

export default class Profile extends React.Component {
  constructor() {
    super();
    
    this.state = {
      notes: [1, 2, 3],
      bio: {
        name: 'Jon Laz'
      },
      repos: ['a', 'b', 'c']
    }
    
  }
  componentWillMount() {
    
  }
  // this.props access from parents VS this.state to acess current

  // this.props.params is passed down by the router to the component
  render() {
    console.log(this.props)
    return (
      <div className="row">
        <div className="col-md-4">
          User Profile Component { this.props.params.username }
          <UserProfile username={ this.props.params.username } bio={this.state.bio} />
        </div>
        <div className="col-md-4">
          Repos Component
          <Repos repos={this.state.repos} />
        </div>
        <div className="col-md-4">
          Notes Component
          <Notes notes={this.state.notes}/>
        </div>
      </div>
    )
  }
}

