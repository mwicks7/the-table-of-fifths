import React from 'react'
import { Chord } from 'tonal'
import Notation from './Notation.js'

const Chords = ({ activeKey, chords, settings }) => {
  return (
    <section>
      <h2>{activeKey.name} triads</h2>
      {chords.map((chord, i) =>
        <Notation
          activeKey={activeKey}
          notes={Chord.get(chord).notes}
          octaves={[1, 2]}
          hideNoteNames={settings.hideNoteNames}
          key={'chord' + chord}
        />
      )}
    </section>
  )
}

export default Chords
