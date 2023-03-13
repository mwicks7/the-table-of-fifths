import React from 'react'

const PianoKey = ({ note, activeNotes, hideNoteNames }) => {
  let cssClass = 'piano__key'
  let disabled = true
  if (note.length > 1) cssClass += ' piano__key--black'
  if (note === activeNotes[0]) cssClass += ' piano__key--root'
  if (note === activeNotes[4]) cssClass += ' piano__key--fifth'
  if (activeNotes.includes(note)) cssClass += ' piano__key--scale'
  if (activeNotes.includes(note)) disabled = false
  return (
    <button disabled={disabled} className={cssClass} aria-label={note}>
      <span className="piano__key-name">{!hideNoteNames && note}</span>
    </button>
  )
}

const Piano = ({ instNotes, activeNotes, hideNoteNames }) => {
  const pianoKeys = instNotes.map(note =>
    <PianoKey
      note={note}
      activeNotes={activeNotes}
      hideNoteNames={hideNoteNames}
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
