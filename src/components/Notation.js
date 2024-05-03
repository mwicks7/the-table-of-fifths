import React, { Fragment } from 'react'
import Staff from './Staff.js'
import GlobalVars from '../helpers/globalVars'

const Signature = ({ signature }) => {
  return (
    <div className="notation__signature">
      <Staff
        signature={signature}
        showClef={true}
        notes={[]}
      />
    </div>
  )
}

const Notes = ({ activeKey, notes, octaves, hideNoteNames }) => {
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
          {!hideNoteNames && <div className="notation__interval">{interval}</div>}
          {!hideNoteNames && <div className="notation__name">{note}</div>}
          <Staff
            notes={noteStack}
            signature={{ sigNotes: [], sigType: '' }}
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

const Notation = ({ activeKey, notes, octaves, hideNoteNames }) => {
  return (
    <section className="notation">
      <Signature
        signature={activeKey.signature}
      />
      <Notes
        activeKey={activeKey}
        notes={notes}
        octaves={octaves}
        hideNoteNames={hideNoteNames}
      />
    </section>
  )
}

export default Notation
