import { Key, Chord } from "tonal";

import Instrument from './Instrument';
import NotationTable from './Notation.js';

function ChordSection(props) {
  const notes = Chord.get(props.chord).notes;
  const notesDup = Chord.get(props.chord).notes;

  return (
    <section className="chord">
      <header>
      <h1>{props.chord}</h1>
      </header>

      <Instrument 
        notes={notes}
        keyType={props.activeKey.type}
        keyTonic={props.activeKey.tonic}
        copies={[1]}
      />

      <NotationTable 
        notes={notes}
        showIntervals={false}
        octaves={[1]} 
      />
    </section>
  )
}

function Chords(props) {
  const chords = props.chords.map(chord => 
    <ChordSection chord={chord} activeKey={props.activeKey}/>
  )
  
  return (
    <section class="chords">
      {chords}
    </section>
  )
}

export default Chords;