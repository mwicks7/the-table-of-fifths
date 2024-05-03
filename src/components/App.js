import '../styles/styles.scss'

import React from 'react'
import { Key } from 'tonal'
import Menu from './Menu'
import FifthsTable from './FifthsTable'
import Scale from './Scale'
import Chords from './Chords'
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
        hideNoteNames: false
      }
    }
  }

  // DATA PREP

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
      signature: this.getSignature(keyData.scale),
      instNotes: this.getInstrumentNotes(keyTonic, keyData.type)
    }
  }

  getSignature (keyNotes) {
    const sigNotes = keyNotes.filter(note => note.length > 1)
    let sigType = ''

    if (sigNotes.length > 0) {
      sigType = sigNotes[0].charAt(1) === '#' ? 'sharp' : 'flat'
      const order = sigType === 'sharp' ? ['F#', 'C#', 'G#', 'D#', 'A#', 'E#'] : ['Bb', 'Eb', 'Ab', 'Db', 'Gb']
      sigNotes.sort((noteA, noteB) => order.indexOf(noteA) - order.indexOf(noteB))
    }

    return { sigNotes, sigType }
  }

  getInstrumentNotes (activeTonic, activeType) {
    const tonicIsFlat = activeTonic.charAt(1) === 'b'
    const isMajorFlat = (activeType === 'major' && ['F'].includes(activeTonic))
    const isMinorFlat = (activeType === 'minor' && ['D', 'G', 'C', 'F'].includes(activeTonic))
    const useFlat = tonicIsFlat || isMajorFlat || isMinorFlat

    return useFlat ? globalVars.notes.withFlats : globalVars.notes.withSharps
  }

  // EVENT HANDLERS

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

  // COMPONENT RENDER

  render () {
    return (
      <div className="app">
        <header className="app__header">
          <h1>The Table of 5ths</h1>
          <Menu
            handleSettingsChange={this.handleSettingsChange}
            settings={this.state.settings}
          />
        </header>

        <main className="app_main">
          <FifthsTable
            activeKey={this.state.activeKey}
            handleKeyChange={this.handleKeyChange}
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
      </div>
    )
  }
}

export default App
