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
        keyName={activeKey.name}
        activeScale={activeKey.scale}
        activeType={activeKey.type}
        showIntervals={true}
        showRoot={true}
        octaves={[1, 2]}
      />

    </section>
  )
}

export default Scale
