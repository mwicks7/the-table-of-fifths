import React from 'react'
import GlobalVars from '../helpers/globalVars'

const FifthsButton = ({ keyTonic, keyType, onClick }) => {
  return (
    <button
      className="fifths-table__btn"
      data-key-tonic={keyTonic}
      data-key-type={keyType}
      onClick={onClick}
    >
      {keyTonic}
    </button>
  )
}

const FifthsCol = ({ isCurrent, isPrev, isNext, isAlternate, children }) => {
  let cssClass
  if (isCurrent) {
    cssClass = 'is--current'
  } else if (isPrev) {
    cssClass = 'is--prev'
  } else if (isNext) {
    cssClass = 'is--next'
  } else if (isAlternate) {
    cssClass = 'is--alternate'
  }

  return (
    <td className={cssClass}>
      {children}
    </td>
  )
}

const FifthsRow = ({ rowKeyType, activeKeyType, activeKeyTonic, onClick }) => {
  const rowKeys = GlobalVars.keys[rowKeyType]
  const activeCol = GlobalVars.keys[activeKeyType].indexOf(activeKeyTonic)
  const lastCol = rowKeys.length - 1
  const prevCol = activeCol === 0 ? lastCol : activeCol - 1
  const nextCol = activeCol === lastCol ? 0 : activeCol + 1
  const isSameType = activeKeyType === rowKeyType
  const columns = rowKeys.map((keyTonic, i) =>
    <FifthsCol
      key={rowKeyType + keyTonic}
      isCurrent={isSameType && activeKeyTonic === keyTonic}
      isAlternate={!isSameType && i === activeCol}
      isPrev={isSameType && i === prevCol}
      isNext={isSameType && i === nextCol}
    >
      <FifthsButton
        keyTonic={keyTonic}
        keyType={rowKeyType}
        onClick={onClick}
      />
    </FifthsCol>
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
    <table className="fifths-table">
      <caption>The Table of 5ths</caption>
      <tbody>
        <FifthsRow
          rowKeyType="major"
          activeKeyType={activeKey.type}
          activeKeyTonic={activeKey.tonic}
          onClick={onClick}
        />

        <FifthsRow
          rowKeyType="minor"
          activeKeyType={activeKey.type}
          activeKeyTonic={activeKey.tonic}
          onClick={onClick}
        />
      </tbody>
    </table>
  )
}

export default FifthsTable
