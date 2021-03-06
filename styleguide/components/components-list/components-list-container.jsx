import PropTypes from 'prop-types';
import React from 'react';
import ComponentsList from './components-list.jsx';

function sortByName(a, b) {
  if (a.name > b.name) return 1;
  if (a.name < b.name) return -1;
  return 0;
}

export default function ComponentsListContainer(props) {
  const shouldAlphabetize = !props.items.some(item => item.heading);
  const items = shouldAlphabetize ? props.items.sort(sortByName) : props.items;

  return <ComponentsList {...props} items={items} />;
}

ComponentsListContainer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    heading: PropTypes.bool,
    name: PropTypes.string.isRequired,
  })).isRequired,
};
