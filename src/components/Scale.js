import Instrument from './Instrument';
import Notation from './Notation.js';

function Scale(props) {
  return (
    <section>
      <header>
        <h1>{props.activeKey.name}</h1>
      </header>

      <Instrument
        notes={props.activeKey.scale}
        keyType={props.activeKey.type}
        keyTonic={props.activeKey.tonic}
        copies={[1, 2, 3]}
      />

      <Notation
        notes={props.activeKey.scale}
        keyType={props.activeKey.type}
        showIntervals={true}
        octaves={[1, 2]}
      />
    </section>
  )
}

export default Scale;