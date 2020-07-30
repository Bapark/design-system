import React, { createRef } from 'react';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import { waitFor } from '@testing-library/dom';
import Dropdown from './dropdown.jsx';

describe('src/components/dropdown/dropdown', () => {
  afterEach(cleanup);

  const TestChild = () => {
    return <h1>Testing</h1>;
  };

  it('renders children passed in when open', () => {
    render(<Dropdown open={true}><TestChild /></Dropdown>);
    expect(screen.getByText('Testing')).toBeDefined();
  });
});
