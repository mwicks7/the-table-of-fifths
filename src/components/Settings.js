import React from 'react'

function Settings ({ handleSettingsChange, settings }) {
  return (
    <section className="settings">
      <h1>Settings</h1>
      <form onInput={handleSettingsChange}>
        <h2>Instrument</h2>
        <div>
          <input type="radio" name="inst" value="piano" id="inst_piano" defaultChecked={settings.inst === 'piano'}/><label htmlFor="inst_piano">Piano</label>
          <input type="radio" name="inst" value="guitar" id="inst_guitar" defaultChecked={settings.inst === 'guitar'}/><label htmlFor="inst_guitar">Guitar</label>
          <input type="radio" name="inst" value="none" id="inst_none" defaultChecked={settings.inst === 'none'}/><label htmlFor="inst_none">None</label>
        </div>
        <div>
          <input type="checkbox" name="showNoteNames" value="piano" defaultChecked={settings.showNoteNames}/><label htmlFor="inst_piano">Show note names</label>
        </div>
      </form>
    </section>
  )
}

export default Settings
