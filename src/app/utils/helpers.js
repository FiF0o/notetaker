/**
 * Created by jonlazarini on 24/07/16.
 */
import axios from 'axios'
import { token } from '../config/configToken' // gets token for 5000 limit
// requests per hours

// console.log('axios: ', axios)

const GITHUB_URL = 'https://api.github.com'

function getRepos(username) {
  // console.log(`${GITHUB_URL}/users/${username}/repos`)
  return axios.get(`${GITHUB_URL}/users/${username}/repos`, {
    params: { token }
  })
}


function getUserInfo(username) {
  // console.log(`${GITHUB_URL}/users/${username}`)
  return axios.get(`${GITHUB_URL}/users/${username}`, {
    params: { token }
  })
}

// const promiseObj = getRepos('fif0o')
//
// promiseObj.then(function(data) {
//   console.log(data)
// })


export default function getGithubInfo(username) {
  // get axios.all gets an array of promises
  return axios.all([getRepos(username), getUserInfo(username)])
    // wait for both promises to be resolves and pass arr of Data
    .then((arrData) => ({
      /* arrow function to remove .bind(this) and preserve teh context
       object with repos and bio and returns an object */
        repos: arrData[0].data, // accessing .data to return the objects
        // only an not the whole promise
        bio: arrData[1].data
      }))
  // first item is userRepo and second is bio
  }

