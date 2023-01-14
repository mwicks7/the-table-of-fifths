import '../styles/styles.scss'

import React from 'react'
import { Key, Chord } from 'tonal'

import FifthsTable from './FifthsTable.js'
import Scale from './Scale.js'
import Chords from './Chords.js'
import globalVars from '../helpers/globalVars'

class App extends React.Component {
  constructor (props) {
    super(props)
    const keyName = 'C'
    const keyData = Key.majorKey(keyName)
    const chord = Chord.get(keyData.triads[0])

    this.state = {
      activeKey: {
        name: keyData.tonic + ' ' + keyData.type,
        tonic: keyData.tonic,
        type: keyData.type,
        scale: keyData.scale,
        chords: keyData.triads,
        intervals: globalVars.intervals[keyData.type]
      },
      activeChord: {
        notes: chord.notes.slice(0, 3)
      }
    }
  }

  handleKeyChange (e) {
    const newKeyTonic = e.target.dataset.keyTonic
    const newKeyType = e.target.dataset.keyType
    const newKeyData = newKeyType === 'major'
      ? Key.majorKey(newKeyTonic)
      : Key.minorKey(newKeyTonic).natural
    const newKeyName = newKeyTonic + ' ' + newKeyType
    const newChord = Chord.get(newKeyData.triads[0])

    this.setState({
      activeKey: {
        name: newKeyName,
        tonic: newKeyData.tonic,
        type: newKeyType,
        scale: newKeyData.scale,
        chords: newKeyData.triads,
        intervals: globalVars.intervals[newKeyType]
      },
      activeChord: {
        notes: newChord.notes.slice(0, 3)
      }
    })
  }

  handleChordChange (e) {
    const newChord = Chord.get(e.target.dataset.chord)

    this.setState({
      activeChord: {
        notes: newChord.notes.slice(0, 3)
      }
    })
  }

  render () {
    return (
      <div className="page">
        <FifthsTable
          activeKey={this.state.activeKey}
          onClick={e => this.handleKeyChange(e)}
        />
        <Scale
          activeKey={this.state.activeKey}
        />
        <Chords
          activeKey={this.state.activeKey}
          chords={this.state.activeKey.chords}
        />
      </div>
    )
  }
}

export default App
