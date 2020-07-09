import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/icon.jsx';
import styles from './abstract-custom-field.css';
import cautionSvg from '../../svgs/icon-caution-fill.svg';
import FormControl from '../form-control/form-control.jsx';

function getRootClassName(className, error, disabled) {
  if (disabled) {
    return `${className} ${styles.disabled}`;
  }

  if (error) {
    return `${className} ${styles.error}`;
  }

  return className;
}

export default function AbstractCustomField(props) {
  const labelId = `${props.id}-label`;
  const invalidDueToProps = () => props.errorText.length > 0 && !props.readOnly;

  const icon = () => {
    if (invalidDueToProps()) {
      return (<Icon
        className={styles['input-icon']}
        currentColor="caution"
        name={cautionSvg.id}
        size="medium"
      />);
    }

    if (props.icon) {
      return props.icon;
    }

    return undefined;
  };

  const showIcon = () => {
    return invalidDueToProps() || !!props.icon;
  };

  const hasError = props.errorText.length > 0;
  const className = getRootClassName(props.className, hasError, props.disabled);

  return (
    <FormControl
      className={className}
      error={props.errorText}
      id={props.id}
      labelId={labelId}
      label={props.label}
      readOnly={props.readOnly}
      required={props.required}
    >
      <input
        aria-autocomplete={props.ariaProps.autocomplete}
        aria-controls={labelId}
        aria-haspopup={props.ariaProps.haspopup}
        defaultValue={props.defaultValue}
        className={styles.input}
        disabled={props.disabled}
        id={props.id}
        max={props.max}
        min={props.min}
        name={props.name}
        onBlur={props.onBlur}
        onChange={props.onChange}
        onClick={props.onClick}
        onFocus={props.onFocus}
        onKeyDown={props.onKeyDown}
        onKeyUp={props.onKeyUp}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        ref={props.inputRef}
        required={props.required}
        step={props.step}
        type={props.type}
        value={props.value}
      />
      {showIcon() && icon()}
    </FormControl>
  );
}

AbstractCustomField.propTypes = {
  ariaProps: PropTypes.shape({
    autocomplete: PropTypes.string,
    haspopup: PropTypes.string,
  }),
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  disabled: PropTypes.bool,
  errorText: PropTypes.string,
  icon: PropTypes.node,
  id: PropTypes.string.isRequired,
  inputRef: PropTypes.shape({ current: PropTypes.any }),
  label: PropTypes.string.isRequired,
  max: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  min: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  step: PropTypes.number,
  type: PropTypes.oneOf([
    'date',
    'number',
    'text',
  ]),
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

AbstractCustomField.defaultProps = {
  ariaProps: {},
  className: undefined,
  defaultValue: undefined,
  disabled: false,
  errorText: '',
  icon: undefined,
  inputRef: undefined,
  max: undefined,
  min: undefined,
  name: undefined,
  onBlur: () => {},
  onChange: () => {},
  onClick: () => {},
  onFocus: () => {},
  onKeyDown: () => {},
  onKeyUp: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  step: undefined,
  type: 'text',
  value: undefined,
};