import React from 'react'
import { Chord } from 'tonal'

import Instrument from './Instrument'
import Notation from './Notation.js'

function ChordSection (props) {
  const notes = Chord.get(props.chord).notes
  // const degrees = Chord.degrees(props.chord)
  // notes.push([1, 2, 3].map(degrees))

  return (
    <section className="chords__chord">
      <Notation
        label={''}
        activeKey={props.activeKey}
        notes={notes}
        octaves={[1, 2]}
        showNoteNames={props.showNoteNames}
      />
    </section>
  )
}

function Chords (props) {
  const chords = props.chords.map((chord, i) =>
    <ChordSection
      chord={chord}
      activeKey={props.activeKey}
      showNoteNames={props.settings.showNoteNames}
      key={'chord' + chord}
      i={i}
    />
  )

  return (
    <section className="chords">
      <header>
        <h2>Triads</h2>
      </header>
      <div className="chords__grid">
        {chords}
      </div>
    </section>
  )
}

export default Chords
