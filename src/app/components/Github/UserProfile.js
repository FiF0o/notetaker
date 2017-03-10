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
    const bio = this.props.bio

    return (
      <div>
        <p>
          <span style={{textTransform: 'uppercase', fontWeight: 'bold'}}>USER PROFILE:</span>
          <span>&nbsp;</span>
          <span style={{color: '#337ab7', fontSize: '2em'}}>{this.props.username}</span>
        </p>
        <ul>
          { bio.avatar_url && <li className="list-group-item"> <img src={ bio.avatar_url } className="img-rounded img-responsive"/></li> }
          { bio.name && <li className="list-group-item"><span style={{fontWeight: 'bold', fontSize: '.9em'}}>Name: </span>{ bio.name}</li> }
            { bio.login && <li className="list-group-item"><span style={{fontWeight: 'bold', fontSize: '.9em'}}>Username: </span>{ bio.login }</li> }
            { bio.email && <li className="list-group-item"><span style={{fontWeight: 'bold', fontSize: '.9em'}}>Email: </span>{ bio.email }</li> }
            { bio.location && <li className="list-group-item"><span style={{fontWeight: 'bold', fontSize: '.9em'}}>Location: </span>{ bio.location }</li> }
            { bio.company && <li className="list-group-item"><span style={{fontWeight: 'bold', fontSize: '.9em'}}>Company: </span>{ bio.company }</li> }
            { bio.followers && <li className="list-group-item"><span style={{fontWeight: 'bold', fontSize: '.9em'}}>Followers: </span>{ bio.followers }</li> }
            { bio.following ? <li className="list-group-item"><span style={{fontWeight: 'bold', fontSize: '.9em'}}>Following: </span>{ bio.following }</li> : <li className="list-group-item">Yo: yo</li> }
            { bio.following && <li className="list-group-item"><span style={{fontWeight: 'bold', fontSize: '.9em'}}>Public Repos: </span>{ bio.public_repos }</li> }
            { bio.blog && <li className="list-group-item"><span style={{fontWeight: 'bold', fontSize: '.9em'}}>Blog: </span><a href={bio.blog }> { bio.blog }</a></li> }
        </ul>
      </div>
    )
  }
}

UserProfile.propTypes = {
  username: React.PropTypes.string.isRequired,
  bio: React.PropTypes.object.isRequired,

}

UserProfile.defaultProps = {

}
