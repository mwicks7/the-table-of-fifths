import React, { Fragment } from 'react'
import Staff from './Staff.js'
import GlobalVars from '../helpers/globalVars'

function Signature ({ sigNotes, keyName }) {
  return (
    <div className="notation__signature">
      <Name note={keyName}/>
      <Staff
        signature={sigNotes}
        showClef={true}
        notes={[]}
      />
    </div>
  )
}

function Interval ({ interval }) {
  return <div className="notation__interval">{interval}</div>
}

function Name ({ note }) {
  return <div className="notation__name">{note}</div>
}

function Notes ({ activeKey, notes, octaves, showNoteNames }) {
  const noteGroups = octaves.map((octave) => {
    let incrementalOctave = octave
    let prevNote

    return notes.map((note, i) => {
      const noteStack = Array.isArray(note) ? note : [note]
      const interval = activeKey.intervals[activeKey.scale.indexOf(note)]
      noteStack.forEach((ns) => {
        if (i > 0 && GlobalVars.notesOrder.indexOf(ns.charAt(0)) < GlobalVars.notesOrder.indexOf(prevNote.charAt(0))) incrementalOctave++
        prevNote = ns
      })

      return (
        <div key={'staff' + note} className="notation__note">
          {(showNoteNames && octave === 1) && <Interval interval={interval}/>}
          {(showNoteNames && octave === 1) && <Name note={note}/>}
          <Staff
            notes={noteStack}
            signature={[]}
            showClef={false}
            octave={incrementalOctave}
            key={'notationNotes' + note}
          />
        </div>
      )
    })
  })

  return (
    <>
      {noteGroups}
    </>
  )
}

function Notation ({ label, activeKey, notes, octaves, showNoteNames }) {
  return (
    <section className="notation">
      <Signature
        sigNotes={activeKey.scale.filter(note => note.length > 1)}
        keyName={label}
      />
      <Notes
        activeKey={activeKey}
        notes={notes}
        octaves={octaves}
        showNoteNames={showNoteNames}
      />
    </section>
  )
}

export default Notation
