import wholeNote from '../images/note_whole.svg'
import trebleClef from '../images/clef_treble.svg'
import flatSym from '../images/acc_flat.svg'
import sharpSym from '../images/acc_sharp.svg'

import React from 'react'

const staffSpaces = ['G3', 'F3', 'E3', 'D3', 'C3', 'B3', 'A3', 'G2', 'F2', 'E2', 'D2', 'C2', 'B2', 'A2', 'G1', 'F1', 'E1', 'D1', 'C1', 'B1', 'A1']
const sharpsOrder = ['F', 'C', 'G', 'D', 'A', 'E']
const flatsOrder = ['B', 'E', 'A', 'D', 'G']
const notesOrder = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

function symbolToText (text) {
  if (text === '#') {
    return text.replace('#', 'sharp')
  } else if (text === 'b') {
    return text.replace('b', 'flat')
  } else {
    return text
  }
}

function sortSignature (noteA, noteB) {
  const order = noteA.charAt(1) === '#' ? sharpsOrder : flatsOrder
  return order.indexOf(noteA.charAt(0)) - order.indexOf(noteB.charAt(0))
}

function getSignatureType (signature) {
  return signature.length > 0 ? symbolToText(signature[0].charAt(1)) : ''
}

function convertSigToPos (sig) {
  const tonic = sig.charAt(0)
  return ['F', 'G'].includes(tonic)
    ? tonic + '1'
    : tonic + '2'
}

function convertNotesToPos (notes, octave) {
  let prevNote
  let octaveIncrement = octave

  const notePositions = notes.map((note, i) => {
    if (i > 1 && notesOrder.indexOf(note.charAt(0) < notesOrder.indexOf(prevNote).charAt(0))) octaveIncrement += 1
    prevNote = note
    return note.charAt(0) + octaveIncrement
  })

  return notePositions
}

function ClefSymbol () {
  return (
    <div className="staff__clef is--treble">
      <img src={trebleClef} alt="Treble Clef"/>
    </div>
  )
}

function SignatureSymbol (props) {
  const sym = props.sigType === 'sharp' ? sharpSym : flatSym
  return (
    <div className={'staff__sig is--' + props.sigIndex + ' is--' + props.sigType} >
    <img src={sym} alt={props.sigType}/>
    </div>
  )
}

function NoteSymbol (props) {
  return (
    <div className="staff__note" >
      <img src={wholeNote} alt="Whole notes" />
    </div>
  )
}

function StaffSpace (props) {
  let signatureSymbol
  let noteSymbol
  const showSignature = props.sigPositions.length > 0 && props.sigPositions.includes(props.staffPos)
  const showNote = props.notePositions.length > 0 && props.notePositions.includes(props.staffPos)

  if (showSignature) {
    signatureSymbol = (
      <SignatureSymbol
        key={'staffSignature' + props.staffPos}
        sigIndex={props.sigPositions.indexOf(props.staffPos)}
        sigType={props.sigType}
      />
    )
  }

  if (showNote) {
    noteSymbol = (
      <NoteSymbol
        key={'staffNote' + props.staffPos}
      />
    )
  }

  return (
    <div className={'staff__space for--' + props.staffPos}>
      {signatureSymbol}
      {noteSymbol}
    </div>
  )
}

function Staff (props) {
  const sigType = getSignatureType(props.signature)
  const sigPositions = props.signature.sort(sortSignature).map(sig => convertSigToPos(sig))
  const notePositions = convertNotesToPos(props.notes, props.octave)

  const staff = staffSpaces.map(staffPos =>
    <StaffSpace
      staffPos={staffPos}
      sigType={sigType}
      sigPositions={sigPositions}
      notePositions={notePositions}
      key={'StaffSpace' + staffPos}
    />
  )

  return (
    <div className="staff">
      {props.showClef && <ClefSymbol />}
      {staff}
    </div>
  )
}

export default Staff
