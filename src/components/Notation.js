import React, { Fragment } from 'react'
import Staff from './Staff.js'

function Signature ({ sigNotes }) {
  return (
    <div className="notation__signature">
      <Staff
        signature={sigNotes}
        showClef={true}
        notes={[]}
      />
    </div>
  )
}

function Notes ({ activeScale, activeType, octave, showIntervals }) {
  const majorIntervals = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°']
  const minorIntervals = ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII']

  const intervals = activeType === 'major' ? majorIntervals : minorIntervals
  let newOctave = octave

  const noteGroups = activeScale.map((note, i) => {
    const notes = Array.isArray(note) ? note : [note]
    if (note.charAt(0) === 'A') newOctave += 1

    return (
      <div key={'staff' + note} className="notation__note">
        <div className="notation__interval">{showIntervals && intervals[i]}</div>
        <div className="Notation__name">{note}</div>
        <Staff
          notes={notes}
          signature={[]}
          showClef={false}
          octave={newOctave}
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

function Notation ({ activeScale, activeType, showIntervals, octaves }) {
  const sigNotes = activeScale.filter(note => note.length > 1)
  const notes = octaves.map(octave =>
    <Notes
      key={'notes' + octave}
      activeScale={activeScale}
      activeType={activeType}
      octave={octave}
      showIntervals={showIntervals && octave === 1}
    />
  )

  return (
    <div className="notation">
      <Signature sigNotes={sigNotes} />
      {notes}
    </div>
  )
}

export default Notation
