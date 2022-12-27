import React, { Fragment } from 'react';

const majorKeys = [ "Db", "Ab", "Eb", "Bb", "F", "C", "G", "D", "A", "E", "B", "F#"];
const minorKeys = [ "Bb", "F", "C", "G", "D", "A", "E", "B", "F#", "C#", "G#", "D#"];

function KeyLink(props) {
  return (
    <a 
      className="key-nav__link"
      href={"/#" + props.keyTonic} 
      data-key-tonic={props.keyTonic} 
      data-key-type={props.keyType} 
      onClick={props.onClick} 
    >
      {props.keyTonic}
    </a>
  )
}

function KeyCol(props) {
  return (
    <td className={props.class}>
      {props.children}
    </td>
  )
}

function KeyRow(props) {
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
      <KeyCol key={keyTonic} class={className}>
        <KeyLink
          key={keyTonic}
          keyTonic={keyTonic}
          keyType={props.keyType}
          onClick={props.onClick}
        />
      </KeyCol>
    )
  })

  return (
    <tr>
      <th scope="row">{props.keyType+":"}</th>
      {columns}
    </tr>
  )
}

class KeyNav extends React.Component {
  render() {
 
    return (
      <table className="key-nav">
        <caption>The Table of 5ths</caption>
        <tbody>
            <KeyRow 
              keys={majorKeys}
              keyType="major"
              activeKey={this.props.activeKey}
              onClick={this.props.onClick}
            />

            <KeyRow 
              keys={minorKeys}
              keyType="minor"
              activeKey={this.props.activeKey}
              onClick={this.props.onClick}
            />
        </tbody>
      </table>
    )
  }
}

export default KeyNav;
