import React, { Fragment } from 'react';

const majorKeys = ["Db", "Ab", "Eb", "Bb", "F", "C", "G", "D", "A", "E", "B", "F#"];
const minorKeys = ["Bb", "F", "C", "G", "D", "A", "E", "B", "F#", "C#", "G#", "D#"];

const FifthsLink = (props) => {
  return (
    <a
      className="fifths-table__link"
      href={"/#" + props.keyTonic}
      data-key-tonic={props.keyTonic}
      data-key-type={props.keyType}
      onClick={props.onClick}
    >
      {props.keyTonic}
    </a>
  )
}

const FifthsCol = (props) => {
  let cssClass;
  if (props.isCurrent) {
    cssClass = "is--current";
  } else if (props.isPrev) {
    cssClass = "is--prev";
  } else if (props.isNext) {
    cssClass = "is--next";
  } else if (props.isAlternate) {
    cssClass = "is--alternate";
  }

  return (
    <td className={cssClass}>
      {props.children}
    </td>
  )
}

const FifthsRow = (props) => {
  const activeIndex = props.activeKey.type === "major"
    ? majorKeys.indexOf(props.activeKey.tonic)
    : minorKeys.indexOf(props.activeKey.tonic)
  const lastIndex = props.keys.length - 1;
  const prevIndex = activeIndex === 0
    ? lastIndex
    : activeIndex - 1
  const nextIndex = activeIndex === lastIndex
    ? 0
    : activeIndex + 1
  const isSameType = props.activeKey.type === props.keyType;

  const columns = props.keys.map((keyTonic, i) => {
    return (
      <FifthsCol
        key={keyTonic}
        isCurrent={isSameType && props.activeKey.tonic === keyTonic}
        isAlternate={!isSameType && i === activeIndex}
        isPrev={isSameType && i === prevIndex}
        isNext={isSameType && i === nextIndex}
      >
        <FifthsLink
          keyTonic={keyTonic}
          keyType={props.keyType}
          onClick={props.onClick}
        />
      </FifthsCol>
    )
  })

  return (
    <tr>
      <th scope="row">{props.keyType + ":"}</th>
      {columns}
    </tr>
  )
}

const FifthsTable = (props) => {
  return (
    <table className="fifths-table">
      <caption>The Table of 5ths</caption>
      <tbody>
        <FifthsRow
          keys={majorKeys}
          keyType="major"
          activeKey={props.activeKey}
          onClick={props.onClick}
        />

        <FifthsRow
          keys={minorKeys}
          keyType="minor"
          activeKey={props.activeKey}
          onClick={props.onClick}
        />
      </tbody>
    </table>
  )
}

export default FifthsTable;
