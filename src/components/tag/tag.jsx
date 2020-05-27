import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import styles from './tag.css';
import clearIcon from '../../svgs/icon-clear-small.svg';
import Icon from '../icon/index.js';

export default function Tag(props) {
  const [tabActiveStates, setTabActiveStates] = useState([true, false]);
  const iconElement = useRef(null);
  const titleElement = useRef(null);
  const refElements = [titleElement, iconElement];

  function handleGridCellKeyDown(keyEvent) {
    switch (keyEvent.key) {
      case 'ArrowRight':
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'ArrowDown':
        const newTabActiveStates = tabActiveStates.map(activeState => !activeState);

        setTabActiveStates(newTabActiveStates);
        break;
      default:
    }   
  }

  function handleGridCellClick(clickEvent, gridIndex) {
    const newTabActiveStates = [false, false];
    
    newTabActiveStates[gridIndex] = true;
    setTabActiveStates(newTabActiveStates);
  }

  useEffect(() => {
    const activeTabIndex = tabActiveStates.findIndex(activeState => activeState);
    
    refElements[activeTabIndex].current.focus();
  }, [tabActiveStates]);

  return (
    <div className={styles.tag} role="row">
      <span className={styles.title} ref={titleElement} role="gridcell" tabIndex={tabActiveStates[0] ? "0" : "-1"} onClick={clickEvent => handleGridCellClick(clickEvent, 0)} onKeyDown={handleGridCellKeyDown}>{props.title}</span>
      <span className={styles['icon-wrapper']} ref={iconElement} role="gridcell" tabIndex={tabActiveStates[1] ? "0" : "-1"} onClick={clickEvent => handleGridCellClick(clickEvent, 1)} onKeyDown={handleGridCellKeyDown}>
        <Icon name={clearIcon.id} size="small" stroke="skip" fill="skip" currentColor="skip" role="button" />
      </span>
    </div>
  );
}

Tag.propTypes = {
  title: PropTypes.string.isRequired,
};

Tag.defaultProps = {};
