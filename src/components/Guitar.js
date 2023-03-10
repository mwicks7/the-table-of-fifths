import React from 'react'

const FretMarkers = () => {
  const frets = [...Array(13)].map((_, i) => {
    return <div key={'fretMarker' + i} className="guitar__fret-marker"></div>
  })

  return (
    <div className="guitar__fret-markers">
      {frets}
    </div>
  )
}

const GuitarString = ({ frets, activeNotes, hideNoteNames }) => {
  const notes = frets.map((note, i) => {
    let cssClass = 'guitar__fret'
    let disabled = true
    if (i === 0) cssClass += ' guitar__fret--open'
    if (note === activeNotes[0]) cssClass += ' guitar__fret--root'
    if (note === activeNotes[4]) cssClass += ' guitar__fret--fifth'
    if (activeNotes.includes(note)) cssClass += ' guitar__fret--scale'
    if (activeNotes.includes(note)) disabled = false
    return (
      <button disabled={disabled} className={cssClass} aria-label={note} key={'fret' + note + i}>
        <span className="guitar__fret-name">{!hideNoteNames && note}</span>
      </button>
    )
  })

  return (
    <div className="guitar__string">{notes}</div>
  )
}

const Guitar = ({ instNotes, activeNotes, hideNoteNames }) => {
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
        hideNoteNames={hideNoteNames}
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
