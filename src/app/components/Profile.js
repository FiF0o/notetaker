/**
 * Created by jonlazarini on 13/07/16.
 */ 
import React from 'react'

import Repos from './Github/Repos'
import UserProfile from './Github/UserProfile'
import Notes from './Notes/Notes'
import { token } from '../config/configToken'

// import firebase from 'firebase'
// integrate firebase data into react with mixin
// import ReactFireMixin from 'reactfire'
// import reactMixin from 'react-mixin'

import getGithubInfo from '../utils/helpers'

const firebaseConfig = {
  apiKey: token,
  authDomain: "note-taker-b4d9c.firebaseapp.com",
  databaseURL: "https://note-taker-b4d9c.firebaseio.com",
  storageBucket: "note-taker-b4d9c.appspot.com",
};
// const fbAppRef = firebase.initializeApp(firebaseConfig);

import Rebase from 're-base'
const base = Rebase.createClass(firebaseConfig.databaseURL)

class Profile extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      notes: [],
      bio: {
        // name: 'Jon Laz'
      },
      repos: [],
    }
    // holding reference to the DB to access nodes
    this._base = null;
  }

  _initData(username) {  // creates a listener to query the data
    /* Access child  by referencing root and passing down the username from
     the root */
    this._base = base.bindToState(username, {
      context: this,
      asArray: true,
      state: 'notes'
    })
    /*
     new instance of firebase
     retrieves endpoint / root : https://note-taker-b4d9c.firebaseio.com and pass username
     to access child of firebase
     */
    // const ref = fbAppRef.database().ref(username)

    // Here we bind the component to Firebase and it handles all data
    // updates to the notes state - this.state.notes,
    // no need to poll as in the React example.
    // this.bindAsArray(ref, 'notes')


   getGithubInfo(username)
           // returns a promise that will be used to populate state of the
           // component with the array of promises returning objects
           .then((data) => { // use fat arrow to get the right this context,
             // the object itself
             this.setState({
               bio: data.bio,
               repos: data.repos
             })
           })
  }
  componentDidMount() {
    this._initData(this.props.params.username) // this.props.params.username
    // will be passed down when cb _initData() is invoked

  }
  componentWillReceiveProps(nextProps) {
    //removes listener and binding
    base.removeBinding(this._base)
    /* page doesn't refresh when props are received to go to a new route,
     and the routing is going to props so the function will be invoked
     nextProps will be used to pass down the new props */
    this._initData(nextProps.params.username)

  }

  componentWillUnmount() {
    base.removeBinding(this._base)
  }

  /* this.props access from parents VS this.state to access current
   this.props.params is passed down by the router to the component */
  render() {

    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile username={ this.props.params.username } bio={this.state.bio} />
        </div>
        <div className="col-md-4">
          <Repos username={ this.props.params.username } repos={this.state.repos} />
        </div>
        <div className="col-md-4">
          <Notes
            username={ this.props.params.username }
            notes={ this.state.notes }
            addNote={ (newNote) => this._handleAddNote(newNote) }
          />
        </div>
      </div>
    )
  }
  /*
  * function passed down to the notes component
  * notes state bound to the username endpoint,
  * when endpoint is updated, changes are pushed to our state
   */
  _handleAddNote(newNote) {
    //updates firebase database with the newNote
    /* goes to root then /username then /numberofitems (as a key) in the array, then newNote is appended to it */
    // fbAppRef.database().ref(`${this.props.params.username}/${this.state.notes.length}`).set(newNote)
    base.post(this.props.params.username, {
      data: this.state.notes.concat([newNote])
    })

  }

}
//
//
// //TODO get rid off reactMixin & ReactFire
// reactMixin(Profile.prototype, ReactFireMixin)

export default Profile
