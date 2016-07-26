/**
 * Created by jonlazarini on 21/07/16.
 */

import React from 'react'

import { hashHistory } from 'react-router'/* use hashHistory from
 Router (used in App as well) */
class SearchGithub extends React.Component {

  render() {
    // passed down from Main (which is handled by the Router) Component to be
    // used in Mixin
    console.log('this.props.history: ', this.props.history)
    return (
      <div className="col-sm-12">
        <form action="" onSubmit={ () => this._handleSubmit() }>
          <div className="form-group col-sm-7">
            <input type="text" className="form-control" ref={ (input) => this._username = input }/>
          </div>
          <div className="form-group col-sm-5">
            <button type="submit" className="btn btn-block btn-primary">Search Github</button>
          </div>
        </form>xx
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
    // console.log(`profile/${username}`)
    this.props.history.push(`/profile/${username}`) // transition to a new
    // route,
    // history props is passed down from Main which handled by the Router

  }
}

SearchGithub.PropTypes = {
  history: React.PropTypes.object.isRequired,
}

export default SearchGithub