import React from 'react'
import GlobalVars from '../helpers/globalVars'

const FifthsCol = ({ keyTonic, keyType, activeKey, handleKeyChange }) => {
  const keyName = `${keyTonic} ${keyType}`
  let cssClass

  if (keyName === activeKey.name) {
    cssClass = 'is--current'
  } else if (keyName === activeKey.fourth) {
    cssClass = 'is--prev'
  } else if (keyName === activeKey.fifth) {
    cssClass = 'is--next'
  } else if (keyName === activeKey.relative) {
    cssClass = 'is--relative'
  }

  return (
    <td className={cssClass}>
      <button
      className="fifths-table__btn"
      data-key-tonic={keyTonic}
      data-key-type={keyType}
      onClick={handleKeyChange}
      >
        {keyTonic}
      </button>
    </td>
  )
}

const FifthsRow = ({ rowKeyType, activeKey, rowKeys, handleKeyChange }) => {
  return (
    <tr>
      <th scope="row">{rowKeyType + ':'}</th>
      {rowKeys.map((keyTonic, i) =>
        <FifthsCol
          keyTonic={keyTonic}
          keyType={rowKeyType}
          activeKey={activeKey}
          handleKeyChange={handleKeyChange}
          key={`${i}${keyTonic}${rowKeyType}`}
        />
      )}
    </tr>
  )
}

const FifthsTable = ({ activeKey, handleKeyChange }) => {
  return (
    <nav>
      <table className="fifths-table">
        <tbody>
          <FifthsRow
            rowKeyType="major"
            activeKey={activeKey}
            rowKeys={GlobalVars.keys.major}
            handleKeyChange={handleKeyChange}
          />

          <FifthsRow
            rowKeyType="minor"
            activeKey={activeKey}
            rowKeys={GlobalVars.keys.minor}
            handleKeyChange={handleKeyChange}
          />
        </tbody>
      </table>
    </nav>
  )
}

export default FifthsTable
