const React = require('react');

module.exports = class Home extends React.Component {
  render() {
    return (
        <div>
          <h2 className="text-center">
           {this.props.title}
          Search by Github Username Above
          </h2>
        </div>
    )
  }
}

