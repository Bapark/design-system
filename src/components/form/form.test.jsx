import React, { createRef } from 'react';
import {
  render,
} from '@testing-library/react';
import Form from './form.jsx';

describe('<Form />', () => {
  const requiredProps = {
    children: () => {},
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<Form {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
  });
});
