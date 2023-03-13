import wholeNote from '../images/note_whole.svg'
import trebleClef from '../images/clef_treble.svg'
import flatSym from '../images/acc_flat.svg'
import sharpSym from '../images/acc_sharp.svg'
import GlobalVars from '../helpers/globalVars'
import React from 'react'

const staffSpaces = ['G3', 'F3', 'E3', 'D3', 'C3', 'B3', 'A3', 'G2', 'F2', 'E2', 'D2', 'C2', 'B2', 'A2', 'G1', 'F1', 'E1', 'D1', 'C1', 'B1', 'A1']

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
    if (i > 1 && GlobalVars.notesOrder.indexOf(note.charAt(0) < GlobalVars.notesOrder.indexOf(prevNote).charAt(0))) octaveIncrement += 1
    prevNote = note
    return note.charAt(0) + octaveIncrement
  })

  return notePositions
}

const ClefSymbol = () => {
  return (
    <div className="staff__clef is--treble">
      <img src={trebleClef} alt="Treble Clef"/>
    </div>
  )
}

const SignatureSymbol = ({ sigIndex, sigType }) => {
  const sym = sigType === 'sharp' ? sharpSym : flatSym
  return (
    <div className={'staff__sig is--' + sigIndex + ' is--' + sigType} >
    <img src={sym} alt={sigType}/>
    </div>
  )
}

const NoteSymbol = () => {
  return (
    <div className="staff__note" >
      <img src={wholeNote} alt="Whole notes" />
    </div>
  )
}

const StaffSpace = ({ staffPos, sigType, sigPositions, notePositions }) => {
  let signatureSymbol
  let noteSymbol
  const showSignature = sigPositions.length > 0 && sigPositions.includes(staffPos)
  const showNote = notePositions.length > 0 && notePositions.includes(staffPos)

  if (showSignature) {
    signatureSymbol = (
      <SignatureSymbol
        key={'staffSignature' + staffPos}
        sigIndex={sigPositions.indexOf(staffPos)}
        sigType={sigType}
      />
    )
  }

  if (showNote) {
    noteSymbol = (
      <NoteSymbol
        key={'staffNote' + staffPos}
      />
    )
  }

  return (
    <div className={'staff__space for--' + staffPos}>
      {signatureSymbol}
      {noteSymbol}
    </div>
  )
}

const Staff = ({ signature, notes, octave = 1, showClef = false }) => {
  const sigPositions = signature.sigNotes.map(sig => convertSigToPos(sig))
  const notePositions = convertNotesToPos(notes, octave)

  const staff = staffSpaces.map(staffPos =>
    <StaffSpace
      staffPos={staffPos}
      sigType={signature.sigType}
      sigPositions={sigPositions}
      notePositions={notePositions}
      key={'StaffSpace' + staffPos}
    />
  )

  return (
    <div className="staff">
      {showClef && <ClefSymbol />}
      {staff}
    </div>
  )
}

export default Staff
