const notesWithSharps = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B" ];
const notesWithFlats = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B" ];

function PianoKey(props) { 
  let cssClass = "piano__key";
  if (props.note.length > 1) cssClass += " piano__key--accidental";
  if (props.note === props.activeKey.tonic) cssClass += " piano__key--root";
  if (props.activeKey.scale.includes(props.note)) cssClass += " piano__key--scale"
  
  return (
    <button className={cssClass}/>       
  )
}

function Piano(props) {
  const pianoKeys = props.instNotes.map(note => {
    return (
      <PianoKey 
        activeKey={props.activeKey}
        key={note} 
        note={note}
      />
    )
  });

  return (
    <section className="piano">
      {pianoKeys}
    </section>
  )
}

function Instrument(props) {
  let instNotes;

  if (props.activeKey.type === "major"){
    instNotes = props.activeKey.tonic[1] === "b" || ["F"].includes(props.activeKey.tonic)  
      ? notesWithFlats 
      : notesWithSharps;
  }
  else if (props.activeKey.type === "minor") {
    instNotes = props.activeKey.tonic[1] === "b" || [""].includes(props.activeKey.tonic)
      ? notesWithFlats 
      : notesWithSharps;
  }

  return (
    <section className="instrument">
      <Piano 
        activeKey={props.activeKey}
        instNotes={instNotes}/>
      <Piano 
        activeKey={props.activeKey}
        instNotes={instNotes}/>
      <Piano 
        activeKey={props.activeKey}
        instNotes={instNotes}/>
    </section>
  )
}

export default Instrument;