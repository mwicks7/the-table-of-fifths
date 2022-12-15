import logo from './logo.svg';
import './styles.scss'

import KeyNav from './KeyNav.js';
import Instrument from './Instrument';
import NotationTable from './NotationTable.js';
import React, { Fragment } from 'react';
import { Key, Chord } from "tonal";

class App extends React.Component {
  constructor(props) {
    super(props);
    const keyName = "C";
    const keyData = Key.majorKey(keyName);
    const chord = Chord.get(keyData.chords[0]);

    this.state = {
      activeKey: {
        name: keyData.tonic + ' ' + keyData.type,
        tonic: keyData.tonic,
        type:  keyData.type,
        scale: keyData.scale,
        chords: keyData.chords,
      },
      activeChord: {
        notes: chord.notes.slice(0, 3)
      }
    }
  }

  handleKeyChange(e) {
    const newKeyTonic = e.target.dataset.keyTonic;
    const newKeyType = e.target.dataset.keyType;
    const newKeyData = newKeyType === "major" 
      ? Key.majorKey(newKeyTonic)
      : Key.minorKey(newKeyTonic).natural
    const newKeyName = newKeyTonic + ' ' + newKeyType
    const newChord = Chord.get(newKeyData.chords[0])
    
    this.setState({
      activeKey: {
        name: newKeyName,
        tonic: newKeyData.tonic,
        type: newKeyType,
        scale: newKeyData.scale,
        chords: newKeyData.chords,
      },
      activeChord: {
        notes: newChord.notes.slice(0, 3)
      }
    });
  }

  handleChordChange(e) {
    const newChord = Chord.get(e.target.dataset.chord);
    
    this.setState({
      activeChord: {
        notes: newChord.notes.slice(0, 3)
      }
    });
  }


  render() {
    const chords = this.state.activeKey.chords;

    return (
      <div className="page">        
        <nav>
          <KeyNav 
            onClick={e => this.handleKeyChange(e)}
            activeKey={this.state.activeKey}
          />
        </nav>
        

        <section>
        
          <header>
            <h1>{this.state.activeKey.name}</h1>
          </header>
          <Instrument 
            activeKey={this.state.activeKey}
            activeChord={this.state.activeChord}
          />
        
          <NotationTable 
            activeKey={this.state.activeKey} 
            activeChord={this.state.activeChord}
            onClick={e => this.handleChordChange(e)}
          />
        </section>
        
        <section className="flex-col">
          <div>
            <h1>{chords[0]}</h1>

          </div>
          <div>
            <h1>{chords[1]}</h1>
          </div>
        </section>
        <section className="flex-col">
          <div>
            <h1>{chords[2]}</h1>
          </div>
          <div>
            <h1>{chords[3]}</h1>
          </div>
        </section>
        <section className="flex-col">
          <div>
            <h1>{chords[4]}</h1>
          </div>
        </section>
        <section className="flex-col">
          <div>
            <h1>{chords[5]}</h1>
          </div>
          <div>
            <h1>{chords[6]}</h1>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
