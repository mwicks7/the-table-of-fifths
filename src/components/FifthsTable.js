import React from 'react'
import GlobalVars from '../helpers/globalVars'

const FifthsCol = ({ keyTonic, keyType, activeKey, onClick }) => {
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
      onClick={onClick}
      >
        {keyTonic}
      </button>
    </td>
  )
}

const FifthsRow = ({ rowKeyType, activeKey, rowKeys, onClick }) => {
  const columns = rowKeys.map((keyTonic, i) =>
    <FifthsCol
      keyTonic={keyTonic}
      keyType={rowKeyType}
      activeKey={activeKey}
      onClick={onClick}
      key={`${i}${keyTonic}${rowKeyType}`}
    />
  )

  return (
    <tr>
      <th scope="row">{rowKeyType + ':'}</th>
      {columns}
    </tr>
  )
}

const FifthsTable = ({ activeKey, onClick }) => {
  return (
    <nav>
      <table className="fifths-table">
        <tbody>
          <FifthsRow
            rowKeyType="major"
            activeKey={activeKey}
            rowKeys={GlobalVars.keys.major}
            onClick={onClick}
          />

          <FifthsRow
            rowKeyType="minor"
            activeKey={activeKey}
            rowKeys={GlobalVars.keys.minor}
            onClick={onClick}
          />
        </tbody>
      </table>
    </nav>
  )
}

export default FifthsTable
