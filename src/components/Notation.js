import React, { Fragment } from 'react'
import Staff from './Staff.js'

const majorIntervals = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°']
const minorIntervals = ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII']

function Signature (props) {
  return (
    <div className="notation__signature">
      <Staff
        signature={props.signature}
        showClef={true}
        notes={[]}
      />
    </div>
  )
}

function Notes (props) {
  const intervals = props.keyType === 'major'
    ? majorIntervals
    : minorIntervals
  let octave = props.octave

  const noteGroups = props.notes.map((note, i) => {
    const notes = Array.isArray(note) ? note : [note]
    if (note.charAt(0) === 'A') octave += 1

    return (
      <div key={'staff' + note} className="notation__note">
        <div className="notation__interval">{props.showIntervals && intervals[i]}</div>
        <div className="Notation__name">{note}</div>
        <Staff
          notes={notes}
          signature={[]}
          showClef={false}
          octave={octave}
          key={'notationNotes' + note}
        />
      </div>
    )
  })

  return (
    <>
      {noteGroups}
    </>
  )
}

function Notation (props) {
  const signature = props.notes.filter(note => note.length > 1)
  const notes = props.octaves.map(octave => {
    return (
      <Notes
        key={'notes' + octave}
        notes={props.notes}
        keyType={props.keyType}
        octave={octave}
        showIntervals={props.showIntervals && octave === 1}
      />
    )
  })

  return (
    <div className="notation">
      <Signature signature={signature} />
      {notes}
    </div>
  )
}

export default Notation
