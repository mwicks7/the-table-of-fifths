import React from 'react'

function PianoKey ({ note, activeScale }) {
  let cssClass = 'piano__key'
  let disabled = true
  if (note.length > 1) cssClass += ' piano__key--black'
  if (note === activeScale[0]) cssClass += ' piano__key--root'
  if (note === activeScale[4]) cssClass += ' piano__key--fifth'
  if (activeScale.includes(note)) cssClass += ' piano__key--scale'
  if (activeScale.includes(note)) disabled = false
  return (
    <button disabled={disabled} className={cssClass} >
      <span className="piano__key-name">{note}</span>
    </button>
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

export default Piano
