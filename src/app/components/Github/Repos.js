/**
 * Created by jonlazarini on 13/07/16.
 */

/**
 * Created by jonlazarini on 13/07/16.
 */
import React from 'react'

export default class Repos extends React.Component {
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
        <p>REPOS:</p>
        <p>List of repos { this.props.repos } </p>
      </div>
    )
  }
}

