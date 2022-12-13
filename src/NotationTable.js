import { Key, Chord } from "tonal";
import React, { Fragment } from 'react';

const majorIntervals = ["I", "ii", "iii", "IV", "V", "vi", "vii°"];
const minorIntervals = ["i", "ii°", "III", "iv", "v", "VI", "VII"];
const staffPositions = ["G3", "F3", "E3", "D3", "C3", "B3", "A3", "G2", "F2", "E2", "D2", "C2", "B2", "A2", "G1", "F1", "E1", "D1", "C1", "B1", "A1"];

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
  const accPositions = props.accidentals.map(acc => {
    const accTonic = acc.charAt(0);
    return ["F", "G"].includes(accTonic)
      ? acc + "1"
      : acc + "2"
    
  })

  return (
    <td>
      <Staff notePositions={[]} accPositions={accPositions} showClef={true}/>
    </td>
  )
}

function StaffNotes(props) {
  let pos = props.pos;
  const notes = props.notes.map((note) => {
    const noteTonic = note.charAt(0);
    let notePos;

    if (Array.isArray(note)) {
      // chords
      notePos = note.map(note => noteTonic + pos);
    } else {
      notePos = [noteTonic+pos];
      if (noteTonic === "G") pos += 1 ;
    }
    
    return <td><Staff notePositions={notePos} accPositions={[]} showClef={false} /></td>
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
    const accPos = props.accPositions.map(accPos => accPos.charAt(0) + accPos.charAt(2));
    const accType = props.accPositions.length 
      ? symbolToText(props.accPositions[0].charAt(1)) 
      : '';

    return staffPositions.map(staffPos => {
      let accSymbol;
      if (accPos.includes(staffPos)) {
        const accIndex = accPos.indexOf(staffPos);
        accSymbol = <div className={"notation-staff__acc is--"+accIndex+" is--"+accType} ><img src={"images/acc_" + accType + ".svg"} /></div>;
      }
    
      const noteSymbol = (props.notePositions.includes(staffPos))
      ? <div className="notation-staff__note" ><img src="images/note_whole.svg" /></div>
      : ''
      
      return (
        <div className={"notation-staff__space for--"+staffPos}>
          {accSymbol}
          {noteSymbol}
        </div>
      )
      })
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
    const activeChord = this.props.activeChord.notes;
    const colGroup = this.props.activeKey.scale.map((note, i) => {
        let colClass = "";
        if (activeChord.includes(note)) colClass += " is--chord"
        if (activeChord.includes(note) && activeChord[0] === note) colClass += " is--root"
        return <col className={colClass} data-chord={this.props.activeKey.chords[i]} onMouseOver={this.props.onClick}/>
    });
    const accidentals = this.props.activeKey.scale.filter(note => note.length > 1);
    const intervals = this.props.activeKey.type === 'major' ? majorIntervals : minorIntervals;
    const intervalCells = intervals.map(intervalName => 
      <th>{intervalName}</th>  
    )
    const noteCells = this.props.activeKey.scale.map((noteName, i) => 
      <td><a href="#" className="notation-table__chord-link" data-chord={this.props.activeKey.chords[i]} onClick={this.props.onClick}>{noteName}</a></td>  
    )
    const chordCells = this.props.activeKey.chords.map(chordName => 
      <td>{chordName}</td>  
    )
    const chordNotes = this.props.activeKey.chords.map(chord => 
      Chord.get(chord).notes
    )
    const scale = this.props.activeKey.scale

    return (
      <table className="notation-table">
          
          <colgroup>
            <col/>
            {colGroup}
            {colGroup}
            {colGroup[0]}
          </colgroup>
          <tr>
            <th className="is--hidden">Intervals</th>
            {intervalCells}
            {intervalCells}
            <th></th>
          </tr>
  
          <tr>
            <th className="is--hidden">Notes</th>
            {noteCells}
            {noteCells}
            {noteCells[0]}
          </tr> 
          <tr>            
            <StaffSignature accidentals={accidentals}/>
            <StaffNotes notes={this.props.activeKey.scale} pos={1}/>
            <StaffNotes notes={this.props.activeKey.scale} pos={2}/>
            <StaffNotes notes={[this.props.activeKey.scale[0]]} pos={3}/>
          </tr>

          {/* <tr>            
            <StaffSignature accidentals={accidentals}/>
            <StaffNotes notes={this.props.activeKey.scale} pos={2}/>
            <StaffNotes notes={[this.props.activeKey.scale[0]]} pos={3}/>
          </tr> */}
          
  
          {/* <tr>
            <th className="is--hidden">Chords</th>
            {chordCells}
            {chordCells}
          </tr> */}
          {/* <tr>
            <StaffSignature accidentals={accidentals}/>
            <StaffNotes notes={chordNotes} pos={1}/>
          </tr> */}
  
  
      </table>
    )

  }
}

export default NotationTable;