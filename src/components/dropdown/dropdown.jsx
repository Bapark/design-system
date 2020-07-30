import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './dropdown.css';
import useDropdownClose from '../../hooks/use-dropdown-close.js';

export default function Dropdown(props) {
  const wrapperRef = useRef(null);
  const handleDropdownClose = () => {
    // setShowOptions(false);
    // setSearchValue(defaultValue);
  };
  useDropdownClose(wrapperRef, props.open, handleDropdownClose);

  if (!props.open) return null;

  return (
    <div ref={wrapperRef} >
      { props.content() }
      <div className={styles.dropdown} >
        { props.dropdownContent() }
      </div>
    </div>
  );
}

Dropdown.propTypes = {
  content: PropTypes.node,
  dropdownContent: PropTypes.node,
  open: PropTypes.bool,
};

Dropdown.defaultProps = {
  content: undefined,
  dropdownContent: () => {},
  open: false,
};
