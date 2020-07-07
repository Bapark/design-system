import React, {
  createRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import FormControl from '../form-control/form-control.jsx';
import Icon from '../icon/icon.jsx';
import iconCaretDown from '../../svgs/icon-caret-down.svg';
import iconCaretDownDisabled from '../../svgs/icon-caret-down-disabled.svg';
import Listbox from '../listbox/listbox.jsx';
import ListOption from '../list-option/list-option.jsx';
import TagList from '../tag-list/tag-list.jsx';
import Tag from '../tag/tag.jsx';
import styles from './custom-field-input-multiple-choice.css';

function getClassName(readOnly, helpText) {
  if (readOnly) return styles['read-only-container'];
  if (helpText) return styles['invalid-container'];

  return styles['read-write-container'];
}

function CustomFieldInputMultipleChoice(props) {
  const autocompleteRef = useRef();
  const [autocompleteValue, setAutocompleteValue] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState(props.value);
  const visibleChoices = props.choices
    .filter(choice => choice.label.includes(autocompleteValue))
    .filter(choice => !value.includes(choice));
  const choicesRefs = visibleChoices.map(() => createRef());
  const valueRefs = value.map(() => createRef());
  const classContainer = getClassName(props.readOnly, props.helpText);
  const renderPopup = !props.readOnly && expanded && visibleChoices.length !== 0;

  function onChoiceRemove(event) {
    const newValue = value.filter((choice, index) => (
      valueRefs[index].current !== event.target
    ));
    setValue(newValue);
  }

  function onChoiceSelect(event) {
    const selectedChoiceIndex = choicesRefs.findIndex(choiceRef => choiceRef === event.target);
    const selectedChoice = visibleChoices[selectedChoiceIndex];
    setExpanded(false);
    setValue([...value, selectedChoice]);
  }

  function onAutocompleteChange(event) {
    setExpanded(true);
    setAutocompleteValue(event.target.value);
  }

  function onClick() {
    setExpanded(true);
  }

  function onKeyDown(event) {
    switch (event.key) {
      case 'Escape':
        setExpanded(false);
        break;
      default:
    }
  }

  useEffect(() => {
    if (expanded && autocompleteRef.current) {
      autocompleteRef.current.focus();
    }
  }, [expanded]);

  return (
    <FormControl
      error={props.helpText}
      label={props.label}
      labelId={`${props.id}-label`}
      id={`${props.id}-autocomple`}
      onKeyDown={onKeyDown}
      readOnly={props.readOnly}
    >
      <div
        className={classContainer}
        onClick={onClick}
        role="presentation"
      >
        <TagList
          className={styles['tag-list']}
          id={props.id}
          labelledBy={`${props.id}-label`}
          refs={valueRefs}
        >
          {value.map((choice, index) => (
            <Tag
              defaultActive={index === 0}
              id={`${props.id}-${choice.id}`}
              key={`${props.id}-${choice.id}`}
              onRemove={onChoiceRemove}
              readOnly={props.readOnly}
              ref={valueRefs[index]}
            >
              {choice.label}
            </Tag>
          ))}
          {!props.readOnly && (
            <input
              aria-labelledby={`${props.id}-label`}
              className={styles['autocomplete-input']}
              id={`${props.id}-autocomple`}
              onChange={onAutocompleteChange}
              ref={autocompleteRef}
              value={autocompleteValue}
            />
          )}
        </TagList>
        <div className={styles['icons-container']}>
          <Icon className={styles['input-icon']} name={props.readOnly ? iconCaretDownDisabled.id : iconCaretDown.id} fill="skip" />
        </div>
      </div>
      {(renderPopup &&
        <Listbox
          className={styles['popup-container']}
          labelledBy={`${props.id}-label`}
          refs={choicesRefs}
        >
          {visibleChoices.map((choice, index) => (
            <ListOption
              key={`${props.id}-${choice.id}`}
              onSelect={onChoiceSelect}
              ref={choicesRefs[index]}
              value={choice}
            >
              {choice.label}
            </ListOption>
          ))}
        </Listbox>
      )}
    </FormControl>
  );
}

CustomFieldInputMultipleChoice.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  helpText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  value: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
};

CustomFieldInputMultipleChoice.defaultProps = {
  helpText: undefined,
  readOnly: false,
  value: [],
};

export default CustomFieldInputMultipleChoice;
