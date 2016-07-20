/**
 * Created by jonlazarini on 13/07/16.
 */
import React from 'react'
import NoteList from './NoteList'

export default class Notes extends React.Component {
  constructor() {
    super();

    this.state = {
    }

  }
  componentWillMount() {

  }

  render() {
   // notes passed from from Profile to Notes to NoteList components
    console.log('Notes: ', this.props.notes)
    return (
      <div>
        <h3>Notes for { this.props.username }</h3>
        
        <p>NOTES:</p>
        <NoteList notes={ this.props.notes }/>
        
      </div>
    )
  }
}

Notes.propTypes = {
  username: React.PropTypes.string.isRequired,
  notes: React.PropTypes.array.isRequired,

}

Notes.defaultProps = {

}