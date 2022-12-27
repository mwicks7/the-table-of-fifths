import React from 'react'

function PianoKey (props) {
  let cssClass = 'piano__key'
  if (props.note.length > 1) cssClass += ' piano__key--black'
  if (props.note === props.activeNotes[0]) cssClass += ' piano__key--root'
  if (props.activeNotes.includes(props.note)) cssClass += ' piano__key--scale'

  return (
    <button className={cssClass} />
  )
}

function Piano (props) {
  const pianoKeys = props.instNotes.map(note => {
    return (
      <PianoKey
        activeNotes={props.activeNotes}
        key={note}
        note={note}
      />
    )
  })

  return (
    <section className="piano">
      {pianoKeys}
    </section>
  )
}

function Instrument (props) {
  const notesWithSharps = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  const notesWithFlats = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
  let instNotes = notesWithSharps

  if (props.keyType === 'major' && (props.keyTonic[1] === 'b' || ['F'].includes(props.keyTonic))) {
    instNotes = notesWithFlats
  }

  if (props.keyType === 'minor' && (props.keyTonic[1] === 'b' || ['D', 'G', 'C', 'F'].includes(props.keyTonic))) {
    instNotes = notesWithFlats
  }

  return (
    <section className="instrument">
      {props.copies.map(copy =>
        <Piano
          key={'piano' + copy}
          activeNotes={props.notes}
          instNotes={instNotes}
        />
      )}
    </section>
  )
}

export default Instrument
