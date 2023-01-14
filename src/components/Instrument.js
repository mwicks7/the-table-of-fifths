import React from 'react'
import Piano from './Piano.js'
import Guitar from './Guitar.js'
import GlobalVars from '../helpers/globalVars'

function Instrument ({ activeScale, activeType, copies }) {
  const activeTonic = activeScale[0]
  const tonicIsFlat = activeTonic[1] === 'b'
  const isMajorFlat = (activeType === 'major' && ['F'].includes(activeTonic))
  const isMinorFlat = (activeType === 'minor' && ['D', 'G', 'C', 'F'].includes(activeTonic))
  const useFlat = tonicIsFlat || isMajorFlat || isMinorFlat
  const instNotes = useFlat ? GlobalVars.notes.withFlats : GlobalVars.notes.withSharps

  return (
    <>
    <section className="instrument">
      {copies.map(copy =>
        <Piano
          activeScale={activeScale}
          instNotes={instNotes}
          key={'piano' + copy}
        />
      )}
    </section>
    {/* <section className="instrument">
      <Guitar
        activeScale={activeScale}
        instNotes={instNotes}
      />
    </section> */}

    </>
  )
}

export default Instrument
