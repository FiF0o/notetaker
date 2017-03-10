# Notetaker

This is a react application using Github API to retrieve profiles and their repos in order to add notes against them.</br>
This app uses webpack to serve and bundle files.</br></br>

`config/` dir contains tokens for firebase (`configToken.js`) and App routes.</br>
`utils/` dir exposes functions using <b>axios</b> to make Github API calls.</br>
`App.js` is the app entrypoint.



## Prerequisites

add `configToken.js` file with your Github `API_KEY`.</br>
The file must:
- Be located in the following directory `src/app/config/<YOUR_CONFIGTOKEN_FILE.js>`
- Have a `token` key exported from the module (e.g.`module.exports = { token: "<YOUR_GITHUB_TOKEN>"}`).


## Dev

`npm run start` and app will open on port `:3333`.


## Serving files

`npm run build`.</br>
App deployed: [Note taker](http://note-taker.surge.sh/)


## Todo

- Data persistence
- Unit tests
- Add CI/CD
- Add badges

