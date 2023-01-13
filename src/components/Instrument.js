import React from 'react'
import Piano from './Piano.js'
import Guitar from './Guitar.js'

function Instrument ({ activeScale, activeType, copies }) {
  const notesWithSharps = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  const notesWithFlats = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
  const activeTonic = activeScale[0]
  const tonicIsFlat = activeTonic[1] === 'b'
  const isMajorFlat = (activeType === 'major' && ['F'].includes(activeTonic))
  const isMinorFlat = (activeType === 'minor' && ['D', 'G', 'C', 'F'].includes(activeTonic))
  const useFlat = tonicIsFlat || isMajorFlat || isMinorFlat
  const instNotes = useFlat ? notesWithFlats : notesWithSharps

  return (
    <>
    {/* <section className="instrument">
      {copies.map(copy =>
        <Piano
          activeScale={activeScale}
          instNotes={instNotes}
          key={'piano' + copy}
        />
      )}
    </section> */}
    <section className="instrument">
      <Guitar
        activeScale={activeScale}
        instNotes={instNotes}
      />
    </section>

    </>
  )
}

export default Instrument
