import '../styles/styles.scss'

import React from 'react'
import { Key, Chord } from 'tonal'

import Menu from './Menu.js'
import FifthsTable from './FifthsTable.js'
import Scale from './Scale.js'
import Chords from './Chords.js'
import globalVars from '../helpers/globalVars'

class App extends React.Component {
  constructor (props) {
    super(props)
    const keyData = Key.majorKey('C')

    this.state = {
      activeKey: {
        name: keyData.tonic + ' ' + keyData.type,
        tonic: keyData.tonic,
        type: keyData.type,
        scale: keyData.scale,
        chords: keyData.triads,
        intervals: globalVars.intervals[keyData.type]
      },
      settings: {
        inst: 'piano',
        showNoteNames: true
      }
    }
  }

  handleKeyChange (e) {
    const newKeyTonic = e.target.dataset.keyTonic
    const newKeyType = e.target.dataset.keyType
    const newKeyData = newKeyType === 'major'
      ? Key.majorKey(newKeyTonic)
      : Key.minorKey(newKeyTonic).natural

    this.setState({
      activeKey: {
        name: newKeyData.tonic + ' ' + newKeyType,
        tonic: newKeyData.tonic,
        type: newKeyType,
        scale: newKeyData.scale,
        chords: newKeyData.triads,
        intervals: globalVars.intervals[newKeyType]
      }
    })
  }

  handleSettingsChange (e) {
    const elem = e.target
    const value = elem.type === 'checkbox' ? elem.checked : elem.value

    this.setState((state) => {
      const settings = state.settings
      settings[elem.name] = value
      return { settings }
    })
  }

  render () {
    return (
      <div className="app">
        <header className="app__header">
          <h1>The Table of 5ths</h1>
          <Menu
            handleSettingsChange={e => this.handleSettingsChange(e)}
            settings={this.state.settings}
          />
        </header>

        <FifthsTable
          activeKey={this.state.activeKey}
          onClick={e => this.handleKeyChange(e)}
        />
        <Scale
          activeKey={this.state.activeKey}
          settings={this.state.settings}
        />
        <Chords
          activeKey={this.state.activeKey}
          chords={this.state.activeKey.chords}
          settings={this.state.settings}
        />
      </div>
    )
  }
}

export default App
