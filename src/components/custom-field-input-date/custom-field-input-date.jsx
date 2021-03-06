import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import calendarSvg from '../../svgs/calendar.svg';
import IconButton from '../icon-button/icon-button.jsx';
import Icon from '../icon/icon.jsx';
import { convertToFormat, validDate } from './format/format-date.js';
import dateStyles from './custom-field-date.css';
import AbstractCustomField from '../__internal__/abstract-custom-field/abstract-custom-field.jsx';
import useDropdownClose from '../../hooks/use-dropdown-close.js';
import Calendar from '../calendar/calendar.jsx';

const isValidInput = (value) => {
  if (value === '' || value === undefined) {
    return true;
  }

  return validDate(value);
};

function isValidDate(dateString) {
  if (dateString === '') return true;
  const date = new Date(`${dateString}T00:00`);
  return date instanceof Date && !isNaN(date);
}

const isValueValid = (value, error, isInputValid = false) => {
  if (error) {
    return false;
  }

  if (!isInputValid) {
    return false;
  }

  return isValidInput(value);
};

const CustomFieldInputDate = forwardRef(function CustomFieldInputDate(props, ref) {
  const componentRef = useRef(null);
  const inputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const value = validDate(props.value) ? convertToFormat(props.value, 'yyyy-mm-dd') : props.value;
  const [currentValue, setCurrentValue] = useState(value);
  const [isValid, setIsValid] = useState(isValueValid(currentValue, props.errorText, true));
  const [expanded, setExpanded] = useState(false);
  const [shouldFocusInput, setShouldFocusInput] = useState(false);
  const [initialValue, setInitialValue] = useState(true);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    if (shouldFocusInput && componentRef.current) {
      componentRef.current.focus();
    }

    setShouldFocusInput(false);
  }, [shouldFocusInput]);

  function onDateSelected(date) {
    setShouldFocusInput(true);
    setCurrentValue(date.toISOString().slice(0, 10));
    setExpanded(false);
    setIsEditing(false);
  }

  useImperativeHandle(ref, () => ({
    get dirty() {
      return convertToFormat(props.value, 'yyyy-mm-dd') !== this.value;
    },
    id: props.id,
    name: props.name,
    get value() {
      if (inputRef.current) {
        return convertToFormat(inputRef.current.value, 'yyyy-mm-dd');
      } else if (componentRef.current) {
        return convertToFormat(componentRef.current.value, 'yyyy-mm-dd');
      }
      return undefined;
    },
  }));

  useEffect(() => {
    if (!initialValue) {
      if (ref) {
        props.onChange({ target: ref.current });
      } else {
        props.onChange(currentValue);
      }
    } else {
      setInitialValue(false);
    }
  }, [currentValue]);

  const handleOnChange = (event) => {
    if (inputRef.current) {
      const isInputValid = inputRef.current.validity.valid;
      const newDate = convertToFormat(event.target.value, 'yyyy-mm-dd');
      setIsValid(isValueValid(newDate, props.errorText, isInputValid));
    }

    setCurrentValue(event.target.value);
  };

  const errorText = () => {
    if (!isValid && !isValidInput(props.value)) {
      return `"${props.value}" is an invalid date`;
    }

    return props.errorText;
  };

  const wrapperRef = useRef(null);
  const handleDropdownClose = () => {
    setExpanded(false);
    setIsEditing(false);
  };
  useDropdownClose(wrapperRef, expanded, handleDropdownClose);

  const openCalendar = () => {
    if (!props.disabled) {
      setExpanded(!expanded);
      setIsEditing(!isEditing);
    }
  };

  function onInputClick(event) {
    event.preventDefault();
    if (!props.disabled) {
      setExpanded(true);
      setIsEditing(true);
    }
  }

  function onInputKeyDown(event) {
    if (event.key === 'Enter' || event.key === 'Space') {
      event.preventDefault();
      if (!props.disabled) {
        setShouldFocusInput(true);
        setExpanded(!expanded);
        setIsEditing(!isEditing);
      }
    }
  }

  function onKeyDown(event) {
    if (event.key === 'Escape') {
      setExpanded(false);
      setIsEditing(false);
    }
  }

  function calendarIcon() {
    if (props.disabled) {
      return (
        <Icon
          icon={calendarSvg}
          title={props.label}
          label={`${props.label} calendar`}
        />
      );
    }

    return (
      <IconButton
        onPress={openCalendar}
        icon={calendarSvg}
        title={props.label}
        label={`${props.label} calendar button`}
      />
    );
  }

  const sharedProps = {
    className: dateStyles['date-input'],
    inputClassName: props.errorText ? dateStyles['input-invalid'] : dateStyles.input,
    disabled: props.disabled,
    icon: calendarIcon(),
    label: props.label,
    required: props.required,
    onClick: onInputClick,
    onKeyDown: onInputKeyDown,
    errorText: props.errorText,
  };

  function renderField() {
    if (isEditing || !isValid) {
      return (
        <AbstractCustomField
          {...sharedProps}
          defaultValue={currentValue}
          errorText={errorText()}
          id={props.id}
          key={`${props.id}-editing`}
          min={convertToFormat(props.min, 'yyyy-mm-dd')}
          max={convertToFormat(props.max, 'yyyy-mm-dd')}
          inputRef={inputRef}
          onChange={handleOnChange}
          step={1}
          type="date"
        />);
    }

    return (
      <AbstractCustomField
        {...sharedProps}
        defaultValue={convertToFormat(currentValue, 'Month dd, yyyy')}
        id={props.id}
        key={`${props.id}-readonly`}
        inputRef={componentRef}
        type="text"
      />
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div ref={wrapperRef} onKeyDown={onKeyDown}>
      { renderField() }
      { expanded && isValidDate(currentValue) && (
        <div className={dateStyles['calendar-container']}>
          <Calendar value={currentValue} onDateSelected={onDateSelected} />
        </div>
      )}
    </div>
  );
});

CustomFieldInputDate.propTypes = {
  disabled: PropTypes.bool,
  errorText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  min: PropTypes.string, /* eslint-disable-line react/no-unused-prop-types */
  max: PropTypes.string, /* eslint-disable-line react/no-unused-prop-types */
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.string,
};

CustomFieldInputDate.defaultProps = {
  disabled: false,
  errorText: '',
  min: undefined,
  max: undefined,
  onChange: () => {},
  required: false,
  value: '',
};

export default CustomFieldInputDate;
