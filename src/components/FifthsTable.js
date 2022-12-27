import React, { Fragment } from 'react';

const majorKeys = [ "Db", "Ab", "Eb", "Bb", "F", "C", "G", "D", "A", "E", "B", "F#"];
const minorKeys = [ "Bb", "F", "C", "G", "D", "A", "E", "B", "F#", "C#", "G#", "D#"];

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
  return (
    <td className={props.class}>
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
    const isCurrent = isSameType && props.activeKey.tonic === keyTonic
    const isAlternate = !isSameType && i === activeIndex
    const isPrev = isSameType && i === prevIndex
    const isNext = isSameType && i === nextIndex
    let className;
  
    if (isCurrent) {
      className = "is--current";
    } else if (isPrev) {
      className = "is--prev";
    } else if (isNext) {
      className = "is--next";
    } else if (isAlternate) {
      className = "is--alternate";
    }

    return (
      <FifthsCol key={keyTonic} class={className}>
        <FifthsLink
          key={keyTonic}
          keyTonic={keyTonic}
          keyType={props.keyType}
          onClick={props.onClick}
        />
      </FifthsCol>
    )
  })

  return (
    <tr>
      <th scope="row">{props.keyType+":"}</th>
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
