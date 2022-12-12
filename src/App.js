import logo from './logo.svg';
import './Defaults.scss';
import './NotationTable.scss';
import './KeyNav.scss';
import './Piano.scss';
import './App.scss';
import KeyNav from './KeyNav.js';
import Instrument from './Instrument';
import NotationTable from './NotationTable.js';

import React, { Fragment } from 'react';
import { Key, Chord } from "tonal";

class App extends React.Component {
  constructor(props) {
    super(props);
    const keyData = Key.majorKey("G");
    this.state = {
      activeKey: {
        name: keyData.tonic + ' ' + keyData.type,
        tonic: keyData.tonic,
        type:  keyData.type,
        scale: keyData.scale,
        chords: keyData.chords,
      }
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
      activeKey: {
        name: newKeyData.tonic + ' ' + newKeyType,
        tonic: newKeyData.tonic,
        type: newKeyType,
        scale: newKeyData.scale,
        chords: newKeyData.chords,
      }
    });
  }


  render() {
    return (
      <div className="page">        
        <nav>
          <KeyNav 
            onClick={e => this.handleKeyChange(e)}
            activeKey={this.state.activeKey}
          />
        </nav>
        
        <h1>{this.state.activeKey.name}</h1>
        <Instrument activeKey={this.state.activeKey}/>

        <section>
          <NotationTable activeKey={this.state.activeKey}/>
        </section>

      </div>
    );
  }
}

export default App;
