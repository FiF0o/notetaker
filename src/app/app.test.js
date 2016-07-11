/*
 Browser doesn't undestand ES6 imports so it needs to be pre processed by webpack
karma-webpack is required
*/
import Home from './components/Home'
console.log(Home)

describe('home',() => {
  it('exists', () => {
    // stuff to test
    expect(Home).to.exists // assertion - chai
  })
  // it('works again', () => {
  //     // stuff to test again
  //     // throw new Error('failure')
  //     expect('hi').to.equal('hi')
  // })

})
