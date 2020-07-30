import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './dropdown.css';

export default function Dropdown(props) {
  if (!props.open) return null;

  return (
    <div className={styles.dropdown} >
      { props.children }
    </div>
  );
}

Dropdown.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
};

Dropdown.defaultProps = {
  children: undefined,
  open: false,
};
