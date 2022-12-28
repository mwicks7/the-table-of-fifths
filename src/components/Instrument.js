import React from 'react'

function PianoKey ({ note, activeScale }) {
  let cssClass = 'piano__key'
  if (note.length > 1) cssClass += ' piano__key--black'
  if (note === activeScale[0]) cssClass += ' piano__key--root'
  if (activeScale.includes(note)) cssClass += ' piano__key--scale'

  return (
    <button className={cssClass} />
  )
}

function Piano ({ instNotes, activeScale }) {
  const pianoKeys = instNotes.map(note =>
    <PianoKey
      note={note}
      activeScale={activeScale}
      key={'pianokey' + note}
    />
  )

  return (
    <section className="piano">
      {pianoKeys}
    </section>
  )
}

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
    <section className="instrument">
      {copies.map(copy =>
        <Piano
          activeScale={activeScale}
          instNotes={instNotes}
          key={'piano' + copy}
        />
      )}
    </section>
  )
}

export default Instrument
