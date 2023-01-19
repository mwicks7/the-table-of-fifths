import React from 'react'

function PianoKey ({ note, activeScale, showNoteNames }) {
  let cssClass = 'piano__key'
  let disabled = true
  if (note.length > 1) cssClass += ' piano__key--black'
  if (note === activeScale[0]) cssClass += ' piano__key--root'
  if (note === activeScale[4]) cssClass += ' piano__key--fifth'
  if (activeScale.includes(note)) cssClass += ' piano__key--scale'
  if (activeScale.includes(note)) disabled = false
  return (
    <button disabled={disabled} className={cssClass} >
      <span className="piano__key-name">{showNoteNames && note}</span>
    </button>
  )
}

function Piano ({ instNotes, activeScale, showNoteNames }) {
  const pianoKeys = instNotes.map(note =>
    <PianoKey
      note={note}
      activeScale={activeScale}
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
