import { Key, Chord } from "tonal";
import React, { Fragment } from 'react';

const majorIntervals = ["I", "ii", "iii", "IV", "V", "vi", "vii°"];
const minorIntervals = ["i", "ii°", "III", "iv", "v", "VI", "VII"];
const staffPositions = ["B3", "A3", "G2", "F2", "E2", "D2", "C2", "B2", "A2", "G1", "F1", "E1", "D1", "C1"];

function symbolToText(text) {
  if (text === "#") {
    return text.replace("#", "sharp");
  } else if (text === "b") {
    return text.replace("b", "flat");
  } else {
    return text;
  }
}

function StaffSignature(props) {
  return (
    <td>
      <Staff notes={[]} accidentals={props.accidentals} showClef={true}/>
    </td>
  )
}

function StaffNotes(props) {
  const notes = props.notes.map((note) => {
      const notes = Array.isArray(note) ? note : [note]
      return <td><Staff notes={notes} accidentals={[]} showClef={false}/></td>
  });

  return (
    <Fragment>
      {notes}
    </Fragment>
  )
}

function Staff(props) {
  const clefSymbol = props.showClef 
    ? <div className="notation-staff__clef is--treble"><img src="images/clef_treble.svg" /></div>
    : ''
  
  function buildStaff() {
    const accTonics = props.accidentals.map(note => note.charAt(0));
    const accType = accTonics.length 
      ? symbolToText(props.accidentals[0].charAt(1)) 
      : '';

    const noteTonics = props.notes.map(note => note.charAt(0));

    return staffPositions.map(note => {
      const accSymbol = (accTonics.includes(note.charAt(0)))
        ? <div className={"notation-staff__acc is--"+accType} ><img src={"images/acc_" + accType + ".svg"} /></div>
        : ''
        
      const noteSymbol = (noteTonics.includes(note.charAt(0)))
        ? <div className="notation-staff__note" ><img src="images/note_whole.svg" /></div>
        : ''

      return (
        <div className={"notation-staff__space for--"+note}>
          {accSymbol}
          {noteSymbol}
        </div>
      )
    });
  }

  return (
    <div className="notation-staff">
      {clefSymbol}
      {buildStaff()}
    </div>
  )
}



class NotationTable extends React.Component {
  render() {
    const accidentals = this.props.activeKey.scale.filter(note => note.length > 1);
    const intervals = this.props.activeKey.type === 'major' ? majorIntervals : minorIntervals;
    const intervalCells = intervals.map(intervalName => 
      <td>{intervalName}</td>  
    )
    const noteCells = this.props.activeKey.scale.map(noteName => 
      <td>{noteName}</td>  
    )
    const chordCells = this.props.activeKey.chords.map(chordName => 
      <td>{chordName}</td>  
    )
    const chordNotes = this.props.activeKey.chords.map(chord => 
      Chord.get(chord).notes
    )

    return (
      <table className="notation-table">
        <tbody>
          
          <tr>
            <th>Intervals</th>
            {intervalCells}
          </tr>
  
          <tr>
            <th>Notes</th>
            {noteCells}
          </tr> 
  
          <tr>
            <StaffSignature accidentals={accidentals} />
            <StaffNotes notes={this.props.activeKey.scale}/>
          </tr>
  
          {/* <tr>
            <th>Chords</th>
            {chordCells}
          </tr>
          <tr>
            <StaffSignature accidentals={accidentals} />
            <StaffNotes notes={chordNotes}/>
          </tr> */}
  
  
        </tbody>
      </table>
    )

  }
}

export default NotationTable;