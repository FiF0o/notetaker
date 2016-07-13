/**
 * Created by jonlazarini on 13/07/16.
 */
import React from 'react'

export default class Note extends React.Component {
  constructor() {
    super();

    this.state = {
    }

  }
  componentWillMount() {

  }

  render() {

    return (
      <div>
        <p>NOTES:</p>
        <p>{ this.props.notes }</p>
      </div>
    )
  }
}