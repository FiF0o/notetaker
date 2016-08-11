const React = require('react');
const { shallow } = require('enzyme');
const chai = require('chai');
const expect = chai.expect;
const chaiEnzyme = require('chai-enzyme');

chai.use(chaiEnzyme());

const Home = require('./Home');

describe('<Home />', () => {

  it('exists', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).to.have.tagName('h2');
  });


  it('should display the passed title', () => {
    const wrapper = shallow(<Home title={'Testacular'} />);
    expect(wrapper).to.have.text('Testacular');
  });

  it('should display the passed name');
  it('should use Unknown as name if name is undefined');

});