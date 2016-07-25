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
    console.log('bio: ', bio)
    return (
      <div>
        <p>USER PROFILE: {this.props.username}</p>
        { bio.avatar_url && <li className="list-group-item"> <img src={ bio.avatar_url } className="img-rounded img-responsive"/></li> }
        { bio.name && <li className="list-group-item">Name: { bio.name}</li> }
        { bio.login && <li className="list-group-item">Username: { bio.login }</li> }
        { bio.email && <li className="list-group-item">Email: { bio.email }</li> }
        { bio.location && <li className="list-group-item">Location: { bio.location }</li> }
        { bio.company && <li className="list-group-item">Company: { bio.company }</li> }
        { bio.followers && <li className="list-group-item">Followers: { bio.followers }</li> }
        { bio.following ? <li className="list-group-item">Following: { bio.following }</li> : <li className="list-group-item">Yo: yo</li> }
        { bio.following && <li className="list-group-item">Public Repos: { bio.public_repos }</li> }
        { bio.blog && <li className="list-group-item">Blog: <a href={bio.blog }> { bio.blog }</a></li> }
 
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
