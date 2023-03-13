import React from 'react'
import Piano from './Piano.js'
import Guitar from './Guitar.js'

const Instrument = ({ activeNotes, instNotes, copies, instType, hideNoteNames }) => {
  let inst

  if (instType === 'piano') {
    inst = copies.map(copy =>
      <Piano
        instNotes={instNotes}
        activeNotes={activeNotes}
        hideNoteNames={hideNoteNames}
        key={'piano' + copy}
      />
    )
  } else if (instType === 'guitar') {
    inst = <Guitar
      instNotes={instNotes}
      activeNotes={activeNotes}
      hideNoteNames={hideNoteNames}
    />
  }

  return (
    <section className="instrument">
      {inst}
    </section>
  )
}

export default Instrument
