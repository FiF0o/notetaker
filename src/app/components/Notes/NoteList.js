/**
 * Created by jonlazarini on 13/07/16.
 */
import React from 'react'

export default class NoteList extends React.Component {
  
  // firebase returns a .value value from the key/value pairs that we access
  render() {

    const { notes } = this.props
    const listNotes = notes.map((note, index) => {
      return (
        <li className="list-group-item" key={ index }>
          { note['.value'] }
        </li>
      )
    })

    return (
          <ul className="list-group">
            { listNotes }
          </ul>
    )
  }
}
