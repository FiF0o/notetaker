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

/*
* props required on the component Repos when created
*/
Repos.propTypes = {
  username: React.PropTypes.string.isRequired,
  repos: React.PropTypes.array.isRequired,

}

Repos.defaultProps = {

}
