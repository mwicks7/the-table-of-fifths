import React, { Fragment } from 'react'
import Staff from './Staff.js'

const notesOrder = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

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

function Interval ({ intervals, i }) {
  return <div className="notation__interval">{intervals[i]}</div>
}

function Name ({ note }) {
  return <div className="notation__name">{note}</div>
}

function Notes ({ activeScale, activeType, octave, showIntervals, showRoot }) {
  const majorIntervals = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°']
  const minorIntervals = ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII']
  const intervals = activeType === 'major' ? majorIntervals : minorIntervals
  let incrementalOctave = octave
  let prevNote

  const noteGroups = activeScale.map((note, i) => {
    const notes = Array.isArray(note) ? note : [note]
    const intervalDOM = <Interval intervals={intervals} i={i}/>
    const rootDOM = <Name note={note}/>
    if (i > 0 && notesOrder.indexOf(note.charAt(0)) < notesOrder.indexOf(prevNote)) incrementalOctave += 1
    prevNote = note.charAt(0)

    return (
      <div key={'staff' + note} className="notation__note">
        {showIntervals && intervalDOM}
        {showRoot && rootDOM}
        <Staff
          notes={notes}
          signature={[]}
          showClef={false}
          octave={incrementalOctave}
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

function Notation ({ keyName, activeScale, activeType, showIntervals, octaves, showRoot }) {
  const sigNotes = activeScale.filter(note => note.length > 1)
  const notes = octaves.map(octave =>
    <Notes
      key={'notes' + octave}
      activeScale={activeScale}
      activeType={activeType}
      octave={octave}
      showIntervals={showIntervals && octave === 1}
      showRoot={showRoot}
    />
  )

  return (
    <div className="notation">
      <Signature sigNotes={sigNotes} keyName={keyName} />
      {notes}
    </div>
  )
}

export default Notation
