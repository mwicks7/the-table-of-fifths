import React from 'react'
import { Chord } from 'tonal'
import Notation from './Notation.js'

function Chords (props) {
  return (
    <section>
      <h2>Triads</h2>
      {props.chords.map((chord, i) =>
        <Notation
          activeKey={props.activeKey}
          notes={Chord.get(chord).notes}
          octaves={[1, 2]}
          showNoteNames={props.settings.showNoteNames}
          key={'chord' + chord}
        />
      )}
    </section>
  )
}

export default Chords
