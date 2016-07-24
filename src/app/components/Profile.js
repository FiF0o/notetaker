/**
 * Created by jonlazarini on 13/07/16.
 */ 
import React from 'react'

import Repos from './Github/Repos'
import UserProfile from './Github/UserProfile'
import Notes from './Notes/Notes'

import firebase from 'firebase'
import ReactFireMixin from 'reactfire'
import reactMixin from 'react-mixin'

import helpers from '../utils/helpers'
console.log('helpers: ', helpers)

const firebaseConfig = {
  apiKey: "AIzaSyBBBC2h-Aw_uHel1zmnDQiOmtCuwJIH8hE",
  authDomain: "note-taker-b4d9c.firebaseapp.com",
  databaseURL: "https://note-taker-b4d9c.firebaseio.com",
  storageBucket: "note-taker-b4d9c.appspot.com",
};
const fbAppRef = firebase.initializeApp(firebaseConfig);

// import Rebase from 're-base'
// const rebase = Rebase.createClass(firebaseConfig.databaseURL)
// console.log('rebase ', rebase)

//TODO Fix Firebase & React Mixin ES6 syntax - https://gist.github.com/kulakowka/24bb83775358ad4c3bc7

class Profile extends React.Component {
  
  constructor() {
    super();
    
    this.state = {
      notes: [1, 2, 3],
      bio: {
        // name: 'Jon Laz'
      },
      repos: []
    }

  }

  componentDidMount() {
    /* Access child  by referencing root and passing down the username from
     the root */
    const dbUsername = this.props.params.username

    /*
    new instance of firebase
    retrieves endpoint / root : https://note-taker-b4d9c.firebaseio.com and pass username
    to access child of firebase
    */
    const ref = fbAppRef.database().ref(dbUsername)

    // Here we bind the component to Firebase and it handles all data
    // updates to the notes state - this.state.notes,
    // no need to poll as in the React example.
    this.bindAsArray(ref, 'notes')


    helpers.getGithubInfo(dbUsername)
     // returns a promise that will be used to populate state of the
           // component with the array of promises returning objects
      .then(function(data) {
        return this.setState({
          bio: data.bio,
          repos: data.repos
        })
        /* specify the (this) context of the new function  by
         referring it to the component instead of the context of the new
         func (window/global) */
      }.bind(this))
  }
  componentWillUnmount() {
    //removes listener and binding
    this.unbind('notes')
  }

  /* this.props access from parents VS this.state to access current
   this.props.params is passed down by the router to the component */
  render() {
    console.log('this.props ', this.props)
    return (
      <div className="row">
        <div className="col-md-4">
          User Profile Component { this.props.params.username }
          <UserProfile username={ this.props.params.username } bio={this.state.bio} />
        </div>
        <div className="col-md-4">
          Repos Component
          <Repos username={ this.props.params.username } repos={this.state.repos} />
        </div>
        <div className="col-md-4">
          Notes Component
          <Notes
            username={ this.props.params.username }
            notes={ this.state.notes }
            addNote={ this._handleAddNote.bind(this) }
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
    // console.log(`${this.props.params.username}/${this.state.notes.length}`)
    // console.log('this.state.note.length', this.state.notes.length)
    
    //updates firebase database with the newNote
    /* goes to root then /username then /numberofitems (as a key) in the array, then newNote is appended to it */
    fbAppRef.database().ref(`${this.props.params.username}/${this.state.notes.length}`).set(newNote)

  }

}


//TODO get rid off reactMixin & ReactFire
reactMixin(Profile.prototype, ReactFireMixin)

export default Profile
