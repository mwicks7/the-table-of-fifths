import React from 'react'
import Piano from './Piano.js'
import Guitar from './Guitar.js'
import GlobalVars from '../helpers/globalVars'

function Instrument ({ activeScale, activeType, copies, instType, showNoteNames }) {
  const activeTonic = activeScale[0]
  const tonicIsFlat = activeTonic[1] === 'b'
  const isMajorFlat = (activeType === 'major' && ['F'].includes(activeTonic))
  const isMinorFlat = (activeType === 'minor' && ['D', 'G', 'C', 'F'].includes(activeTonic))
  const useFlat = tonicIsFlat || isMajorFlat || isMinorFlat
  const instNotes = useFlat ? GlobalVars.notes.withFlats : GlobalVars.notes.withSharps
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
