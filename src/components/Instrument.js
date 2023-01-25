import React from 'react'
import Piano from './Piano.js'
import Guitar from './Guitar.js'

function Instrument ({ activeScale, instNotes, copies, instType, showNoteNames }) {
  let inst

  if (instType === 'piano') {
    inst = copies.map(copy =>
      <Piano
        activeScale={activeScale}
        instNotes={instNotes}
        showNoteNames={showNoteNames}
        key={'piano' + copy}
      />
    )
  } else if (instType === 'guitar') {
    inst = <Guitar
      activeScale={activeScale}
      instNotes={instNotes}
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
