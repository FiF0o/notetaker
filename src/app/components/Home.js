const React = require('react');

module.exports = class Home extends React.Component {
  render() {
    return (
    <h2 className="">
     {this.props.title}
    </h2>
    )
  }
}
