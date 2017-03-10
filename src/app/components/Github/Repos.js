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
    console.log('repos: ', this.props.repos)
    const listRepos = this.props
    const repos = listRepos.repos.map((repo, index) => {
      return (
        <li className='list-group-item' key={ index }>
          { /* js if statement */ }
          { repo.html_url && <h4><a href={ repo.html_url }>{ repo.name }</a></h4> }
          { repo.description && <p>{ repo.description }</p> }
        </li>
      )
    })

    return (
      <div>
        <h3>USER REPOS</h3>
        <p style={{fontWeight: 'bold'}}>List of repos:</p>
        <ul className='list-group'>
          { repos }
        </ul>
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
