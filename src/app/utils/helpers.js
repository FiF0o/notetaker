/**
 * Created by jonlazarini on 24/07/16.
 */
import axios from 'axios'

// gets token for 5000 limit requests per hours
import { token } from '../config/configToken'
/*
 * Rate limit issues with Github API: https://developer.github.com/v3/#rate-limiting 
 * 
 * 1- Creates Personal access tokens from Github for our app: https://github.com/settings/tokens
 * 2- Axios get url - Request config - : https://github.com/mzabriskie/axios
 * 3- add token to be passed and ignore config file in .gitignore
 *
 * test token access and response rate - Authentication - : curl
 * https://api.github.com/?access_token=OAUTH-TOKEN
 *
 * Developer guide for reference: https://developer.github.com/v3/
 * */

const GITHUB_URL = 'https://api.github.com'

function getToken( hashedToken = 'abc') {
  // console.log('getToken default va: ',hashedToken)
  return hashedToken
}

console.log('getToken(): ' , getToken());

var githubToken = getToken({ token })
console.log('githubToken: ', githubToken)


function getRepos(username) {
  // console.log(`${GITHUB_URL}/users/${username}/repos`)
  return axios.get(`${GITHUB_URL}/users/${username}/repos`, {
    // GET request config passed down as a (xhr) response header
    params: githubToken // passed as params as headers {} is not allowed by chrome
  })
}


function getUserInfo(username) {
  // console.log(`${GITHUB_URL}/users/${username}`)
  // console.log('getUserInfo - githubToken ;', githubToken)
  return axios.get(`${GITHUB_URL}/users/${username}`, {
    params: githubToken
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

