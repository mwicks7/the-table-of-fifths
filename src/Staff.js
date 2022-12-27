const staffPositions = ["G3", "F3", "E3", "D3", "C3", "B3", "A3", "G2", "F2", "E2", "D2", "C2", "B2", "A2", "G1", "F1", "E1", "D1", "C1", "B1", "A1"];
const sharpsOrder = ["F", "C", "G", "D", "A", "E"];
const flatsOrder = ["B", "E", "A", "D", "G"];

function symbolToText(text) {
  if (text === "#") {
    return text.replace("#", "sharp")
  } else if (text === "b") {
    return text.replace("b", "flat")
  } else {
    return text
  }
}

function sortSignature(a, b) {
  if (a.charAt(1) == "#") {
    return sharpsOrder.indexOf(a.charAt(0)) - sharpsOrder.indexOf(b.charAt(0))
  } else {
    return flatsOrder.indexOf(a.charAt(0)) - flatsOrder.indexOf(b.charAt(0))
  }
}

function getSignatureType(signature) {
  return signature.length > 0 ?
    symbolToText(signature[0].charAt(1)) :
    ''
}

function convertSigToPos(sig) {
  const tonic = sig.charAt(0)
  return ["F", "G"].includes(tonic) ?
    tonic + "1" :
    tonic + "2"
}

function convertNoteToPos(note, octave) {
  return note.charAt(0) + octave
}

function ClefSymbol() {
  return (
    <div className="staff__clef is--treble">
      <img src="images/clef_treble.svg" />
    </div>
  )
}

function SignatureSymbol(props) {
  return (
    <div className={"staff__sig is--"+props.sigIndex+" is--"+props.sigType} >
      <img src={"images/acc_" + props.sigType + ".svg"} />
    </div>
  )
}

function NoteSymbol(props) {
  return (
    <div className="staff__note" >
      <img src="images/note_whole.svg" />
    </div>
  )
}

function StaffPosition(props) {
  let signatureSymbol
  let noteSymbol
  const showSignature = props.sigPositions.length > 0 && props.sigPositions.includes(props.staffPos)
  const showNotes = props.notePositions.length > 0 && props.notePositions.includes(props.staffPos)

  if (showSignature) {
    signatureSymbol = ( 
      <SignatureSymbol 
        key={"staffSignature"+props.staffPos}
        sigIndex={props.sigPositions.indexOf(props.staffPos)} 
        sigType={props.sigType}
      />
    )
  }

  if (showNotes){
    noteSymbol = (
      <NoteSymbol 
        key={"staffNote"+props.staffPos}   
      />
    )
  }

  return (
    <div className={"staff__space for--"+props.staffPos}>
      {signatureSymbol}      
      {noteSymbol}
    </div>
  )
}

function Staff(props) {
  const clef = props.showClef ?
    <ClefSymbol/> :
    ''
  const sigType = getSignatureType(props.signature)
  const sigPositions = props.signature.sort(sortSignature).map((sig) => convertSigToPos(sig))
  const notePositions = props.notes.map((note) => convertNoteToPos(note, props.octave))
  
  const staff = staffPositions.map(staffPos => {
    return (
      <StaffPosition
        staffPos={staffPos}
        sigType={sigType}
        sigPositions={sigPositions}
        notePositions={notePositions}
        key={"staffPosition"+staffPos}
      />
    )
  })

  return (
    <div className="staff">
      {clef}
      {staff}
    </div>
  )
}

export default Staff;