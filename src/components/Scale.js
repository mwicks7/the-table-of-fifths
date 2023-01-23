import React from 'react'
import Instrument from './Instrument'
import Notation from './Notation.js'

function Scale ({ activeKey, settings }) {
  return (
    <section>
      <h1>{activeKey.name}</h1>

      <Instrument
        activeScale={activeKey.scale}
        activeType={activeKey.type}
        copies={[1, 2, 3]}
        instType={settings.inst}
        showNoteNames={settings.showNoteNames}
      />

      <Notation
        label=''
        activeKey={activeKey}
        notes={activeKey.scale}
        octaves={[1, 2]}
        showNoteNames={settings.showNoteNames}
      />

    </section>
  )
}

export default Scale
