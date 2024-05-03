import React from 'react'

const Settings = ({ handleSettingsChange, settings }) => {
  return (
    <section className="settings">
      <form onInput={handleSettingsChange}>
        <h3 className="settings__header">Instrument</h3>

        <p className="setting__field">
          <input type="radio" name="inst" value="piano" id="inst_piano" defaultChecked={settings.inst === 'piano'}/>
          <label className="settings__label" htmlFor="inst_piano">Piano</label>
        </p>

        <p className="setting__field">
          <input type="radio" name="inst" value="guitar" id="inst_guitar" defaultChecked={settings.inst === 'guitar'}/>
          <label className="settings__label" htmlFor="inst_guitar">Guitar</label>
        </p>

        <p className="setting__field">
          <input type="radio" name="inst" value="none" id="inst_none" defaultChecked={settings.inst === 'none'}/>
          <label className="settings__label" htmlFor="inst_none">None</label>
        </p>

        <h3 className="settings__header">Notation</h3>

        <p className="setting__field">
          <input type="checkbox" name="hideNoteNames" id="hide_note_names" defaultChecked={settings.hideNoteNames}/>
          <label className="settings__label" htmlFor="hide_note_names">Hide note names</label>
        </p>
      </form>
    </section>
  )
}

export default Settings
