import React from 'react'

function PianoKey ({ note, activeNotes, showNoteNames }) {
  let cssClass = 'piano__key'
  let disabled = true
  if (note.length > 1) cssClass += ' piano__key--black'
  if (note === activeNotes[0]) cssClass += ' piano__key--root'
  if (note === activeNotes[4]) cssClass += ' piano__key--fifth'
  if (activeNotes.includes(note)) cssClass += ' piano__key--scale'
  if (activeNotes.includes(note)) disabled = false
  return (
    <button disabled={disabled} className={cssClass} >
      <span className="piano__key-name">{showNoteNames && note}</span>
    </button>
  )
}

function Piano ({ instNotes, activeNotes, showNoteNames }) {
  const pianoKeys = instNotes.map(note =>
    <PianoKey
      note={note}
      activeNotes={activeNotes}
      showNoteNames={showNoteNames}
      key={'pianokey' + note}
    />
  )

  return (
    <section className="piano">
      {pianoKeys}
    </section>
  )
}

export default Piano
