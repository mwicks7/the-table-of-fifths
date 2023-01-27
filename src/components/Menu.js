import React from 'react'
import Modal from './Modal'
import Settings from './Settings.js'

import settingsIcon from '../images/settings.svg'
import printIcon from '../images/printer.svg'

function Menu ({ handleSettingsChange, settings }) {
  const [showModal, setShowModal] = React.useState(false)

  return (
    <menu className="menu">
      <li>
        <button className="menu__button" onClick={() => setShowModal(true)}>
          <img src={settingsIcon} alt="Settings"/>
        </button>

        <Modal
          show={showModal}
          setShow={setShowModal}
          header="Settings"
        >
          <Settings
            handleSettingsChange={handleSettingsChange}
            settings={settings}
          />
        </Modal>
      </li>
      <li>
        <button height={24} width={24} className="menu__button" onClick={window.print}>
          <img src={printIcon} alt="Print"/>
        </button>
      </li>
    </menu>
  )
}

export default Menu
