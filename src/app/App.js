import jQuery from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
//imports components as properties of the object
import { Router, hashHistory } from 'react-router'
import AppRoutes from './config/AppRoutes'

import '../sass/main.sass'

const el = '<div id="app"></div>'
jQuery('body').append(el)
const appEntry = document.getElementById('app')

ReactDOM.render(
  // handling routes of the app, which component to render depending on which route we are at
  <Router history={ hashHistory }>
    { AppRoutes }
  </Router>
  , appEntry
)

// <script src="https://www.gstatic.com/firebasejs/3.2.0/firebase.js"></script>
//   <script>
// // Initialize Firebase
// var config = {
//   apiKey: "AIzaSyBBBC2h-Aw_uHel1zmnDQiOmtCuwJIH8hE",
//   authDomain: "note-taker-b4d9c.firebaseapp.com",
//   databaseURL: "https://note-taker-b4d9c.firebaseio.com",
//   storageBucket: "",
// };
// firebase.initializeApp(config);
// </script>