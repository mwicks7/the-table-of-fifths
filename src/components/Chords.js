import React from 'react'
import { Chord } from 'tonal'

import Instrument from './Instrument'
import Notation from './Notation.js'

function ChordSection (props) {
  const notes = Chord.get(props.chord).notes

  return (
    <section className="chord">
      <header>
        <h2>{props.chord}</h2>
      </header>

      <Instrument
        activeScale={notes}
        activeType={props.activeKey.type}
        copies={[1, 2]}
      />
      <Notation
        activeScale={notes}
        activeType={props.activeKey.type}
        showIntervals={false}
        showRoot={false}
        octaves={[1, 2]}
      />
    </section>
  )
}

function Chords (props) {
  const chords = props.chords.map(chord =>
    <ChordSection
      chord={chord}
      activeKey={props.activeKey}
      key={'chord' + chord}
    />
  )

  return (
    <section className="chords">
      {chords}
    </section>
  )
}

export default Chords
