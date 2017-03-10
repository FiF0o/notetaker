/**
 * Created by jonlazarini on 24/07/16.
 */
import axios from 'axios'

// gets token for 5000 limit requests per hours
import { token } from '../config/configToken'
/**
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

import Hashes from 'jshashes'
// new SHA1 instance and base64 string encoding
const SHA1 = new Hashes.SHA1().b64({token})
const hashedGithubToken = getToken(SHA1)
console.log('hashedGithubToken: ', hashedGithubToken)


/** Beginning helpers **/

const GITHUB_URL = 'https://api.github.com'

// placeholder function in case we need to hash the token for encryption
function getToken( hashedToken = 'abc') {
  return hashedToken
}

const githubToken = getToken({ token })


function getRepos(username) {
  return axios.get(`${GITHUB_URL}/users/${username}/repos`, {
    // GET request config passed down as a (xhr) response header
    params: githubToken // passed as params as headers {} is not allowed by chrome
  })
}

function getUserInfo(username) {
  return axios.get(`${GITHUB_URL}/users/${username}`, {
    params: githubToken
  })
}

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
