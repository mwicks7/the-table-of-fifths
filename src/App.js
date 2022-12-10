import logo from './logo.svg';
import './App.css';
import React, { Fragment } from 'react';
import { Key } from "tonal";

const notesWithSharps = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B" ];
const notesWithFlats = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B" ];

const scalesWithFlats = ["F Major", ]
const majorKeys = [ "Db", "Ab", "Eb", "Bb", "F", "C", "G", "D", "A", "E", "B", "F#"];
const minorKeys = [ "Bb", "F", "C", "G", "D", "A", "E", "B", "F#", "C#", "G#", "D#"];
const majorIntervals = ["I", "ii", "iii", "IV", "V", "vi", "VII"]

function PianoKey(props) { 
  let cssClass = "piano__key";
  if (props.note.length > 1) cssClass += " piano__key--accidental";

  return (
    <button className={cssClass}/>       
  )
}

// function Piano(props) {
//   const pianoKeys = props.inst_notes.map(note => {
//     return (
//       <PianoKey 
//         key={note} 
//         note={note}
//       />
//     )
//   });

//   return (
//     <section className="piano">
//       {pianoKeys}
//     </section>
//   )
// }

// function Instrument(props) {
//   if (props.scaleType === "Major"){
//     const instNotes = props.scaleTonic[1] === "b" || ["F"].includes(props.scaleTonic)  
//       ? notesWithFlats 
//       : notesWithSharps;
//   }
//   else if (props.scaleType === "Minor") {
//     const instNotes = props.scaleTonic[1] === "b" || [""].includes(props.scaleTonic)
//       ? notesWithFlats 
//       : notesWithSharps;
//   }

//   return (
//     <section className="instrument">
//       {/* <Piano inst_notes={props.inst}/> */}
//     </section>
//   )

// }

function KeysNav(props) {
  const links = props.keysList.map((key, i) => {
    const isCurrent = props.currentScaleTonic === key;
    const linkClass = isCurrent ? "is--current" : '';

    return (
      <li>
        <a href={"/#" + key} data-key-tonic={key} data-key-type={props.scaleType} onClick={props.onClick} className={linkClass}>{key}</a>
      </li>
    )
  })

  return (
    <ul className="scale-nav">  
      {links}
    </ul>
  )
}

function NotationStaff(props) {
  const accidentals = props.accidentals.map((acc, i) =>
    <Fragment>
      <div className="notation-staff__acc notation-staff__acc--{acc}">{acc}</div>
    </Fragment>
  );

  const notes = props.notes.map((note) =>
    <Fragment>
      <div className="notation-staff__whole-note notation-staff__whole-note--{note}"></div>
    </Fragment>
  );

  return (
    <div className="notation-staff">
      {accidentals}
      {notes}
    </div>
  )
}

function NotationTable(props) {
  const accidentals = props.scaleNotes.filter(note => note.length > 1);

  const noteColumns = props.scaleNotes.map((note) =>
    <div className="notation-table__col">
      <div className="notation-table__row">
        I
      </div>
      <div className="notation-table__row">
        <NotationStaff notes={[note]} accidentals={[]}/>
      </div>
      <div className="notation-table__row">
        {note}
      </div>
      <div className="notation-table__row">
        <NotationStaff notes={[note]} accidentals={[]}/>
      </div>
    </div>
  )


  return (
    <section className="notation-table">
      <div className="notation-table__col">
        <div className="notation-table__row">Key Signature</div>
        <div className="notation-table__row">
          <NotationStaff notes={[]} accidentals={accidentals}/>
        </div>
        <div className="notation-table__row">Key Signature</div>
        <div className="notation-table__row">
          <NotationStaff notes={[]} accidentals={accidentals}/>
        </div>
      </div>
      {noteColumns}
    </section>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    const keyData = Key.majorKey("C");
    console.log(keyData);

    this.state = {
      scaleName: keyData.tonic + ' ' + keyData.type,
      scaleTonic: keyData.tonic,
      scaleType:  keyData.type,
      scaleNotes: keyData.scale,
    }
  }

  handleKeyChange(e) {
    const newKeyTonic = e.target.dataset.keyTonic;
    const newKeyType = e.target.dataset.keyType;
    const newKeyData = newKeyType === "major" 
      ? Key.majorKey(newKeyTonic)
      : Key.minorKey(newKeyTonic)

    console.log(newKeyData);
    this.setState({
      scaleName: newKeyData.tonic + ' ' + newKeyData.type,
      scaleTonic: newKeyData.tonic,
      scaleType:  newKeyData.type,
      scaleNotes: newKeyData.scale
    });
  }


  render() {
    return (
      <div className="page">
        <header className="header">Linear 5ths Table</header>
        
        <KeysNav 
          keysList={majorKeys}
          onClick={e => this.handleKeyChange(e)}
          currentScaleTonic={this.state.scaleTonic}
          scaleType="major"
          />
        <KeysNav 
          keysList={minorKeys}
          onClick={e => this.handleKeyChange(e)}
          currentScaleTonic={this.state.scaleTonic}
          scaleType="minor"
        />

        <section className="body">
          <h1 className="header">
            {this.state.scaleTonic} {this.state.scaleType}
          </h1>

          <NotationTable 
            scaleType={this.state.scaleType}
            scaleNotes={this.state.scaleNotes}
          />
          

          {/* <Instrument/> */}
        </section>

      </div>
    );
  }
}

export default App;
