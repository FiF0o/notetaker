/**
 * Created by jonlazarini on 21/07/16.
 */

import React from 'react'
import { hashHistory } from 'react-router'
console.log('browserHistory ', hashHistory) //

class SearchGithub extends React.Component {

  render() {
    console.log('this.props ', this.props)
    return (
      <div className="col-sm-12">
        <form action="" onSubmit={ this._handleSubmit.bind(this) }>
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
  _handleSubmit(e) {
    console.log('e ', e)
    // e.preventDefault()
    const username = this._username.value
    console.log('username ',username)
    this._username = ''

    /*
    Since we are using a mixin - reactMixin,
    taking amy properties on the React.History module object and adding it to
     our instance of SearchGithub
    */
    console.log(this)
    console.log('this.browserHistory ', hashHistory)
    console.log(`profile/${username}`)
    hashHistory.replace(`profile/${username}`) // transition to a new route

  }
}

// reactMixin(SearchGithub.prototype, Router.History)

export default SearchGithub