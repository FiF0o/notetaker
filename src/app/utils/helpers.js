/**
 * Created by jonlazarini on 24/07/16.
 */
import axios from 'axios'
// console.log('axios: ', axios)

const GITHUB_URL = 'https://api.github.com'

function getRepos(username) {
  // console.log(`${GITHUB_URL}/users/${username}/repos`)
  return axios.get(`${GITHUB_URL}/users/${username}/repos`)
}


function getUserInfo(username) {
  // console.log(`${GITHUB_URL}/users/${username}`)
  return axios.get(`${GITHUB_URL}/users/${username}`)
}

// const promiseObj = getRepos('fif0o')
//
// promiseObj.then(function(data) {
//   console.log(data)
// })

const helpers = {
  getGithubInfo: function(username) {
    // get axios.all gets an array of promises
    return axios.all([getRepos(username), getUserInfo(username)])
      // wait for both promises to be resolves and pass arr of Data
      .then(function(arrData) {
        // first item is userRepo and second is bio
        return { // object with repos and bio
          repos: arrData[0].data, // accessing .data to return the objects
          // only an not the whole promise
          bio: arrData[1].data
        }
      })
  }

}
// console.log(helpers)

export default helpers