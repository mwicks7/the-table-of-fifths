import React from 'react'
import Piano from './Piano.js'
import Guitar from './Guitar.js'

function Instrument ({ activeNotes, instNotes, copies, instType, showNoteNames }) {
  let inst

  if (instType === 'piano') {
    inst = copies.map(copy =>
      <Piano
        instNotes={instNotes}
        activeNotes={activeNotes}
        showNoteNames={showNoteNames}
        key={'piano' + copy}
      />
    )
  } else if (instType === 'guitar') {
    inst = <Guitar
      instNotes={instNotes}
      activeNotes={activeNotes}
      showNoteNames={showNoteNames}
    />
  }

  return (
    <section className="instrument">
      {inst}
    </section>
  )
}

export default Instrument
