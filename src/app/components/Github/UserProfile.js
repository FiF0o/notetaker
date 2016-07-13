/**
 * Created by jonlazarini on 13/07/16.
 */

import React from 'react'

export default class UserProfile extends React.Component {
  constructor() {
    super();

    this.state = {
    }

  }
  componentWillMount() {

  }

  render() {

    return (
      <div>
        <p>USER PROFILE:</p>
        <p>Username: { this.props.username }</p>
        <p>Bio: { this.props.bio.name }</p>
      </div>
    )
  }
}