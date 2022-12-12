import logo from './logo.svg';
import './Defaults.scss';
import './NotationTable.scss';
import './KeyNav.scss';
import './Piano.scss';
import './App.scss';
import React, { Fragment } from 'react';
import { Key, Chord } from "tonal";

const notesWithSharps = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B" ];
const notesWithFlats = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B" ];
const majorKeys = [ "Db", "Ab", "Eb", "Bb", "F", "C", "G", "D", "A", "E", "B", "F#"];
const majorQualities = ["I", "ii", "iii", "IV", "V", "vi", "vii°"];
const minorQualities = ["i", "ii°", "III", "iv", "v", "VI", "VII"];
const minorKeys = [ "Bb", "F", "C", "G", "D", "A", "E", "B", "F#", "C#", "G#", "D#"];
const staffPositions = ["B3", "A3", "G2", "F2", "E2", "D2", "C2", "B2", "A2", "G1", "F1", "E1", "D1", "C1"];

function PianoKey(props) { 
  let cssClass = "piano__key";
  if (props.note.length > 1) cssClass += " piano__key--accidental";
  if (props.note === props.keyTonic) cssClass += " piano__key--root";
  if (props.keyScale.includes(props.note)) cssClass += " piano__key--scale"
  
  return (
    <button className={cssClass}/>       
  )
}

function Piano(props) {
  const pianoKeys = props.instNotes.map(note => {
    return (
      <PianoKey 
        keyScale={props.keyScale}
        keyTonic={props.keyTonic}
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

  if (props.keyType === "major"){
    instNotes = props.keyTonic[1] === "b" || ["F"].includes(props.keyTonic)  
      ? notesWithFlats 
      : notesWithSharps;
  }
  else if (props.keyType === "minor") {
    instNotes = props.keyTonic[1] === "b" || [""].includes(props.keyTonic)
      ? notesWithFlats 
      : notesWithSharps;
  }

  return (
    <section className="instrument">
      <Piano 
        keyTonic={props.keyTonic}
        keyScale={props.keyScale}
        instNotes={instNotes}/>
      <Piano 
        keyTonic={props.keyTonic}
        keyScale={props.keyScale}
        instNotes={instNotes}/>
      <Piano 
        keyTonic={props.keyTonic}
        keyScale={props.keyScale}
        instNotes={instNotes}/>
    </section>
  )

}

function KeyNavLinks(props) {
  const lastIndex = props.keys.length - 1;
  const isSameType = props.currentKeyType === props.keyType;
  const prevIndex = props.currentIndex === 0
    ? lastIndex
    : props.currentIndex - 1

  const nextIndex = props.currentIndex === lastIndex
    ? 0
    : props.currentIndex + 1 
  
  return props.keys.map((key, i) => {
    const isCurrent = props.currentKeyName === key + ' ' + props.keyType;
    const isPrev = isSameType && i === prevIndex;
    const isNext = isSameType && i === nextIndex;
    const isAlternate = !isSameType && i === props.currentIndex;

    let linkClass = "";

    if (isCurrent) {
      linkClass = "is--current";
    } else if (isPrev) {
      linkClass = "is--prev";
    } else if (isNext) {
      linkClass = "is--next";
    } else if (isAlternate) {
      linkClass = "is--alternate";
    }

    return (
      <td>
        <a href={"/#" + key} data-key-tonic={key} data-key-type={props.keyType} onClick={props.onClick} className={linkClass}>{key}</a>
      </td>
    )
  })
}

function KeyNav(props) {
  const currentIndex = props.currentKeyType === "major"
    ? majorKeys.indexOf(props.currentKeyTonic)
    : minorKeys.indexOf(props.currentKeyTonic);

  return (
    <table className="key-nav">
      <caption>Table of 5ths</caption>
      <tbody>
          <tr>
            <th scope="row">Major:</th>
            <KeyNavLinks
              keys={majorKeys}
              keyType="major"
              currentIndex={currentIndex}
              currentKeyTonic={props.currentKeyTonic}
              currentKeyName={props.currentKeyName}
              currentKeyType={props.currentKeyType}
              onClick={props.onClick}
            />
          </tr>
          <tr>
            <th scope="row">Minor:</th>
            <KeyNavLinks
              keys={minorKeys}
              keyType="minor"
              currentIndex={currentIndex}
              currentKeyTonic={props.currentKeyTonic}
              currentKeyName={props.currentKeyName}
              currentKeyType={props.currentKeyType}
              onClick={props.onClick}
            />
          </tr>
      </tbody>
    </table>
  )
}

function NotationNotes(props) {
  const accidentals = props.accidentals.map((acc, i) => {
    const tonic = acc.charAt(0).toLowerCase()+"2";

    return (
      <Fragment>
        <div className={"notation-staff__note is--"+tonic}>{acc}</div>
      </Fragment>
    )
  });

  const notes = props.notes.map((note) => {
    const modifier = note.charAt(0).toLowerCase()+"2";

    return (
      <Fragment>
        <div className={"notation-staff__note is--"+modifier}>{note}</div>
      </Fragment>
    )  
  });

  return (
    <Fragment>
      {accidentals}
      {notes}
    </Fragment>
  )
}

function NotationStaff(props) {
  const tonics = props.notes.map(note => note.charAt(0));
  
  function buildStaff() {
    return staffPositions.map(note => {
      const noteIcon = (tonics.includes(note.charAt(0)))
      ? <div className="notation-staff__note" ><img src="images/note_whole.svg" /></div>
      : ''
      
      return (
        <div className={"notation-staff__space for--"+note}>
        {noteIcon}
      </div>
      )
    })
  }

  return (
    <div className="notation-staff">
      {buildStaff()}
    </div>
  )
}

function NotationTextRow(props) {
  return (
    props.textItems.map(item => 
      <td>{item}</td>  
    )
  ) 
}

function NotationTable(props) {
  const accidentals = props.keyScale.filter(note => note.length > 1);
  const qualities = props.keyType === 'major' ? majorQualities : minorQualities;
  const notesOnStaff = props.keyScale.map(note =>
    <td>
      <NotationStaff
        notes={[note]} 
        accidentals={[]}
      />
    </td>
  )

  const chordsOnStaff = props.keyChords.map(chord =>{
    const chordNotes = Chord.get(chord).notes;

    return (
      <td>
        <NotationStaff
          notes={chordNotes} 
          accidentals={[]}
        />
      </td>
    )}
  )

  // const chordNotes = 
  
  return (
    <table className="notation-table">
      <tbody>
        
        <tr>
          <th>Intervals</th>
          <NotationTextRow textItems={qualities}/>
        </tr>

        <tr>
          <th>Notes</th>
          <NotationTextRow textItems={props.keyScale}/>
        </tr> 
        <tr>
          <td>
            <NotationStaff
              notes={props.keyScale} 
              accidentals={accidentals}
            />
          </td>
          {notesOnStaff}
        </tr>

        <tr>
          <th>Chords</th>
          <NotationTextRow textItems={props.keyChords}/>
        </tr>
        <tr>
          <td>
            <NotationStaff
              notes={props.keyChords} 
              accidentals={accidentals}
            />
          </td>
          {notesOnStaff}
        </tr>


      </tbody>
    </table>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    const keyData = Key.majorKey("C");
    this.state = {
      keyName: keyData.tonic + ' ' + keyData.type,
      keyTonic: keyData.tonic,
      keyType:  keyData.type,
      keyScale: keyData.scale,
      keyChords: keyData.chords,
      
    }
  }

  handleKeyChange(e) {
    const newKeyTonic = e.target.dataset.keyTonic;
    const newKeyType = e.target.dataset.keyType;
    const newKeyData = newKeyType === "major" 
      ? Key.majorKey(newKeyTonic)
      : Key.minorKey(newKeyTonic).natural
    console.log(newKeyData);

    this.setState({
      keyName: newKeyData.tonic + ' ' + newKeyType,
      keyTonic: newKeyData.tonic,
      keyType: newKeyType,
      keyScale: newKeyData.scale,
      keyChords: newKeyData.chords,
    });
  }


  render() {
    return (
      <div className="page">        
        <nav>
          <KeyNav 
            onClick={e => this.handleKeyChange(e)}
            currentKeyName={this.state.keyName}
            currentKeyTonic={this.state.keyTonic}
            currentKeyType={this.state.keyType}
          />
        </nav>
        
          <h1>
            {this.state.keyName}
          </h1>
        <Instrument
          keyType={this.state.keyType}
          keyTonic={this.state.keyTonic}
          keyScale={this.state.keyScale}
        />

        <section>

          <NotationTable 
            keyType={this.state.keyType}
            keyScale={this.state.keyScale}
            keyChords={this.state.keyChords}
          />

        </section>

      </div>
    );
  }
}

export default App;
