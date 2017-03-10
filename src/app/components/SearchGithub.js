/**
 * Created by jonlazarini on 21/07/16.
 */

import React from 'react'

class SearchGithub extends React.Component {

  render() {
    // passed down from Main (which is handled by the Router) Component to be
    // used in Mixin
    return (
      <div className="col-sm-12">
        <form action="" onSubmit={ () => this._handleSubmit() }>
          <div className="form-group col-sm-7">
            <input type="text" className="form-control" ref={ (input) => this._username = input }/>
          </div>
          <div className="form-group col-sm-5">
            <button type="submit" className="btn btn-block btn-primary">Search Github</button>
          </div>
        </form>
      </div>
    )
  }
  _handleSubmit() {
    // e.preventDefault()
    const username = this._username.value
    this._username = ''

    /*
    Since we are using a mixin - reactMixin,
    taking amy properties on the React.History module object and adding it to
     our instance of SearchGithub
    */
    this.context.router.push(`/profile/${username}`)
    // transition to a new route passed down via router in the context obj,

  }
}

SearchGithub.PropTypes = {
  history: React.PropTypes.object.isRequired,
}
/* needs to be added for this.context to work properly and not be returned as an empty object */
SearchGithub.contextTypes = {
  router: React.PropTypes.object.isRequired,
}

export default SearchGithub
