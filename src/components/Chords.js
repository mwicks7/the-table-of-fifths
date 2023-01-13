import React from 'react'
import { Chord } from 'tonal'

import Instrument from './Instrument'
import Notation from './Notation.js'

function ChordSection (props) {
  const notes = Chord.get(props.chord).notes

  return (
    <section className="chords__chord">
      <header>
        <h3>{props.chord}</h3>
      </header>

      <Instrument
        activeScale={notes}
        activeType={props.activeKey.type}
        copies={[1]}
      />
      <Notation
        keyName=''
        activeScale={notes}
        activeType={props.activeKey.type}
        showIntervals={false}
        showRoot={true}
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
      <header>
        {/* <h2>Chords</h2> */}
      </header>
      <div className="chords__grid">
        {chords}
      </div>
    </section>
  )
}

export default Chords
