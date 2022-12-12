import React, { Fragment } from 'react';

const majorKeys = [ "Db", "Ab", "Eb", "Bb", "F", "C", "G", "D", "A", "E", "B", "F#"];
const minorKeys = [ "Bb", "F", "C", "G", "D", "A", "E", "B", "F#", "C#", "G#", "D#"];

function KeyNavLinks(props) {
    const lastIndex = props.keys.length - 1;
  const isSameType = props.currentKeyType === props.keyType;
  const prevIndex = props.currentIndex === 0
    ? lastIndex
    : props.currentIndex - 1

  const nextIndex = props.currentIndex === lastIndex
    ? 0
    : props.currentIndex + 1 
  
  return props.keys.map((key, i) => {
    const isCurrent = props.currentKeyName === key + ' ' + props.keyType;
    const isPrev = isSameType && i === prevIndex;
    const isNext = isSameType && i === nextIndex;
    const isAlternate = !isSameType && i === props.currentIndex;

    let linkClass = "";

    if (isCurrent) {
      linkClass = "is--current";
    } else if (isPrev) {
      linkClass = "is--prev";
    } else if (isNext) {
      linkClass = "is--next";
    } else if (isAlternate) {
      linkClass = "is--alternate";
    }

    return (
      <td>
        <a href={"/#" + key} data-key-tonic={key} data-key-type={props.keyType} onClick={props.onClick} className={linkClass}>{key}</a>
      </td>
    )
  })
}

class KeyNav extends React.Component {
  render() {
    const activeKey = this.props.activeKey;
    const currentIndex = activeKey.type === "major"
      ? majorKeys.indexOf(activeKey.tonic)
      : minorKeys.indexOf(activeKey.tonic);
  
    return (
      <table className="key-nav">
        <caption>Table of 5ths</caption>
        <tbody>
            <tr>
              <th scope="row">Major:</th>
              <KeyNavLinks
                keys={majorKeys}
                keyType="major"
                currentIndex={currentIndex}
                currentKeyTonic={activeKey.tonic}
                currentKeyName={activeKey.name}
                currentKeyType={activeKey.type}
                onClick={this.props.onClick}
              />
            </tr>
            <tr>
              <th scope="row">Minor:</th>
              <KeyNavLinks
                keys={minorKeys}
                keyType="minor"
                currentIndex={currentIndex}
                currentKeyTonic={activeKey.tonic}
                currentKeyName={activeKey.name}
                currentKeyType={activeKey.type}
                onClick={this.props.onClick}
              />
            </tr>
        </tbody>
      </table>
    )
  }
}

export default KeyNav;
