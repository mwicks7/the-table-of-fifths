import React from 'react'
import Instrument from './Instrument'
import Notation from './Notation.js'

const Scale = ({ activeKey, settings }) => {
  return (
    <section>
      <h2>{activeKey.name} scale</h2>

      <Instrument
        activeNotes={activeKey.scale}
        instNotes={activeKey.instNotes}
        copies={[1, 2, 3]}
        instType={settings.inst}
        hideNoteNames={settings.hideNoteNames}
      />

      <Notation
        activeKey={activeKey}
        notes={activeKey.scale}
        octaves={[1, 2]}
        hideNoteNames={settings.hideNoteNames}
      />
    </section>
  )
}

export default Scale
