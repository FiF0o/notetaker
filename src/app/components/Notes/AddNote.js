/**
 * Created by jonlazarini on 20/07/16.
 */
import React from 'react'

export default class AddNote extends React.Component {
  constructor() {
    super()
  }

  render() {
    // retrieves value via the ref of the New Note before passing it to the
    // function
    // console.log('this.props / AddNote ', this.props)
    return (
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Add New Note" ref={ (input) => this._note = input }/>
        <span className="input-group-btn">
          <button className="btn btn-default" type="button" onClick={ () => this.handleSubmit() }>
            Submit
          </button>
        </span>
      </div>
    )
  }

  handleSubmit() {
    // e.preventDefault()
    /*
    note is coming from setRef func - created on the fly
    setRef -> handleSubmit
    */
    const note = this._note
    // console.log('note ', note)
    const newNote = note.value // grabbing value of this.note
    // console.log(newNote)
    note.value = '' // clears input field
    this.props.addNote(newNote) // calling function from prop of Profile
    // component which is a func - handleAddNote()
    // newNote is passed down to handleAddNote()
  }
}

AddNote.propTypes = {
  username: React.PropTypes.string.isRequired,
  addNote : React.PropTypes.func.isRequired
}