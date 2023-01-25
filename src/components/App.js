import '../styles/styles.scss'

import React from 'react'
import { Key } from 'tonal'

import Menu from './Menu.js'
import FifthsTable from './FifthsTable.js'
import Scale from './Scale.js'
import Chords from './Chords.js'
import globalVars from '../helpers/globalVars'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.handleKeyChange = this.handleKeyChange.bind(this)
    this.handleSettingsChange = this.handleSettingsChange.bind(this)

    this.state = {
      activeKey: this.buildActiveKeyObj('C', 'major'),
      settings: {
        inst: 'piano',
        showNoteNames: true
      }
    }
  }

  buildActiveKeyObj (keyTonic, keyType) {
    const keyData = keyType === 'major'
      ? Key.majorKey(keyTonic)
      : Key.minorKey(keyTonic).natural

    return {
      name: `${keyData.tonic} ${keyType}`,
      tonic: keyData.tonic,
      type: keyType,
      scale: keyData.scale,
      chords: keyData.triads,
      fifth: `${keyData.scale[4]} ${keyType}`,
      fourth: `${keyData.scale[3]} ${keyType}`,
      relative: keyType === 'major' ? `${Key.majorKey(keyTonic).minorRelative} minor` : `${Key.minorKey(keyTonic).relativeMajor} major`,
      intervals: globalVars.intervals[keyType],
      instNotes: this.getInstrumentNotes(keyTonic, keyData.type)
    }
  }

  getInstrumentNotes (activeTonic, activeType) {
    const tonicIsFlat = activeTonic[1] === 'b'
    const isMajorFlat = (activeType === 'major' && ['F'].includes(activeTonic))
    const isMinorFlat = (activeType === 'minor' && ['D', 'G', 'C', 'F'].includes(activeTonic))
    const useFlat = tonicIsFlat || isMajorFlat || isMinorFlat

    return useFlat ? globalVars.notes.withFlats : globalVars.notes.withSharps
  }

  handleKeyChange (e) {
    this.setState({
      activeKey: this.buildActiveKeyObj(e.target.dataset.keyTonic, e.target.dataset.keyType)
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
      <main className="app">
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
      </main>
    )
  }
}

export default App
