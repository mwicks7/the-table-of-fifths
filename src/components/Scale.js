import React from 'react'
import Instrument from './Instrument'
import Notation from './Notation.js'

function Scale ({ activeKey }) {
  return (
    <section>
      <header>
        <h1>{activeKey.name}</h1>
      </header>

      <Instrument
        activeScale={activeKey.scale}
        activeType={activeKey.type}
        copies={[1, 2, 3]}
      />
      <Notation
        label=''
        activeKey={activeKey}
        notes={activeKey.scale}
        octaves={[1, 2]}
        showIntervals={true}
        showRoot={true}
      />

    </section>
  )
}

export default Scale
