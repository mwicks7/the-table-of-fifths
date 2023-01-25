import React from 'react'

function FretMarkers () {
  const frets = [...Array(13)].map((_, i) => {
    return <div key={'fretMarker' + i} className="guitar__fret-marker"></div>
  })

  return (
    <div className="guitar__fret-markers">
      {frets}
    </div>
  )
}

function GuitarString ({ frets, activeNotes, showNoteNames }) {
  const notes = frets.map((note, i) => {
    let cssClass = 'guitar__fret'
    let disabled = true
    if (i === 0) cssClass += ' guitar__fret--open'
    if (note === activeNotes[0]) cssClass += ' guitar__fret--root'
    if (note === activeNotes[4]) cssClass += ' guitar__fret--fifth'
    if (activeNotes.includes(note)) cssClass += ' guitar__fret--scale'
    if (activeNotes.includes(note)) disabled = false
    return (
      <button disabled={disabled} className={cssClass} key={'fret' + note + i}>
        <span className="guitar__fret-name">{showNoteNames && note}</span>
      </button>
    )
  })

  return (
    <div className="guitar__string">{notes}</div>
  )
}

function Guitar ({ instNotes, activeNotes, showNoteNames }) {
  const stringTuning = ['E', 'B', 'G', 'D', 'A', 'E']

  const guitarStrings = stringTuning.map((tuning, i) => {
    const tuningIndex = instNotes.indexOf(tuning)
    const frets = instNotes
      .slice(tuningIndex, instNotes.length)
      .concat(instNotes.slice(0, tuningIndex))
      .concat([tuning])

    return (
      <GuitarString
        frets={frets}
        activeNotes={activeNotes}
        showNoteNames={showNoteNames}
        key={'guitarString' + tuning + i}
      />
    )
  })

  return (
    <div className="guitar">
      <FretMarkers />
      {guitarStrings}
    </div>
  )
}

export default Guitar
