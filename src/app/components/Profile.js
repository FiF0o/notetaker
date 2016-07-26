/**
 * Created by jonlazarini on 13/07/16.
 */ 
import React from 'react'

import Repos from './Github/Repos'
import UserProfile from './Github/UserProfile'
import Notes from './Notes/Notes'

import firebase from 'firebase'
// integrate firebase data into react with mixin
import ReactFireMixin from 'reactfire'
import reactMixin from 'react-mixin'

import getGithubInfo from '../utils/helpers'

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
      repos: [],
      
    }

  }

  _initData(username) {  // creates a listener to query the data
    /* Access child  by referencing root and passing down the username from
     the root */
    // const dbUsername = this.props.params.username

    /*
     new instance of firebase
     retrieves endpoint / root : https://note-taker-b4d9c.firebaseio.com and pass username
     to access child of firebase
     */
    const ref = fbAppRef.database().ref(username)

    // Here we bind the component to Firebase and it handles all data
    // updates to the notes state - this.state.notes,
    // no need to poll as in the React example.
    this.bindAsArray(ref, 'notes')


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
    // console.log('componentDidMount this.props.params.username: ', this.props.params.username)
    this._initData(this.props.params.username) // this.props.params.username
    // will be passed down when cb _initData() is invoked

  }
  componentWillReceiveProps(nextProps) {
    //removes listener and binding
    this.unbind('notes')
    /* page doesn't refresh when props are received to go to a new route,
     and the routing is going to props so the function will be invoked
     nextProps will be used to pass down the new props */
    console.log('the nextProps are: ', nextProps)
    this._initData(nextProps.params.username)

  }

  componentWillUnmount() {
  }

  /* this.props access from parents VS this.state to access current
   this.props.params is passed down by the router to the component */
  render() {
    console.log('this.props ', this.props)
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
