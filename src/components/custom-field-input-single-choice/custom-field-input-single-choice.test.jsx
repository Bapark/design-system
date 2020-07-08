import React from 'react';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import CustomFieldInputSingleChoice from './custom-field-input-single-choice.jsx';

describe('src/components/custom-field-input-single-choice/custom-field-input-single-choice', () => {
  const requiredProps = {
    id: 'test-id',
    label: 'Test label',
  };

  afterEach(cleanup);

  it('has defaults', () => {
    const tree = renderer.create(<CustomFieldInputSingleChoice {...requiredProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('accessibility', () => {
    const choices = [{
      id: 'foo',
      label: 'foo',
    }, {
      id: 'bar',
      label: 'bar',
    }];

    it('shows choices when clicked', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} choices={choices} />);
      userEvent.click(screen.getByLabelText('Test label'));

      expect(screen.getByText('foo')).toBeInTheDocument();
      expect(screen.getByText('bar')).toBeInTheDocument();
    });

    it('does not show option when focused, but shows when enter key is pressed', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} choices={choices} />);
      userEvent.tab();

      expect(screen.getByLabelText('Test label')).toHaveFocus();
      expect(screen.queryByText('foo')).not.toBeInTheDocument();
      expect(screen.queryByText('bar')).not.toBeInTheDocument();

      fireEvent.keyDown(document.activeElement, { key: 'Enter' });
      expect(screen.getByText('foo')).toBeInTheDocument();
      expect(screen.getByText('bar')).toBeInTheDocument();
    });

    it('hides choices when ESC is pressed', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} choices={choices} />);
      userEvent.click(screen.getByLabelText('Test label'));
      expect(screen.getByText('foo')).toBeInTheDocument();
      expect(screen.getByText('bar')).toBeInTheDocument();

      fireEvent.keyDown(document.activeElement, { key: 'Escape' });
      expect(screen.queryByText('foo')).not.toBeInTheDocument();
      expect(screen.queryByText('bar')).not.toBeInTheDocument();
    });

    it('focuses on the first choice with tab', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} choices={choices} />);
      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.tab();

      expect(document.activeElement.innerHTML).toBe('foo');
    });

    it('focuses on the second choice with down arrow', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} choices={choices} />);
      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.tab();
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

      expect(document.activeElement.innerHTML).toBe('bar');
    });

    it('focuses the input after selection', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} choices={choices} />);
      userEvent.click(screen.getByLabelText('Test label'));
      expect(screen.queryAllByRole('option', 'bar')[0]).toBeInTheDocument();

      userEvent.click(screen.getByText('foo'));
      expect(screen.getByLabelText('Test label')).toHaveFocus();
      expect(screen.queryAllByRole('option', 'bar')[0]).toBeUndefined();
    });
  });

  describe('id API', () => {
    it('accepts an ID', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} id="this-is-an-id" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('id', 'this-is-an-id');
    });
  });

  describe('label API', () => {
    it('accepts a label', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} label="Bar" />);
      expect(screen.getByLabelText('Bar')).toBeDefined();
    });
  });

  describe('placeholder API', () => {
    it('accepts a placeholder', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} placeholder="I am place" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('placeholder', 'I am place');
    });
  });

  describe('readOnly API', () => {
    it('sets the readonly attribute', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} readOnly />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('readonly', '');
    });

    it('unsets the readonly attribute', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} readOnly={false} />);
      expect(screen.getByLabelText('Test label')).not.toHaveAttribute('readonly', '');
    });

    it('shows the listbox', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} readOnly={false} />);
      userEvent.click(screen.getByLabelText('Test label'));
      expect(screen.queryByRole('listbox')).toBeInTheDocument();
    });

    it('does not show the listbox', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} readOnly={true} />);
      userEvent.click(screen.getByLabelText('Test label'));
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  describe('required API', () => {
    it('sets the required attribute', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} required />);
      expect(screen.getByLabelText('Test label')).toBeRequired();
    });

    it('unsets the required attribute', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} required={false} />);
      expect(screen.getByLabelText('Test label')).not.toBeRequired();
    });
  });

  describe('selection', () => {
    const choices = [{
      id: 'broke',
      label: 'broke my heart',
    }, {
      id: 'now',
      label: "now I'm aching for you",
    }];

    it('sets the value of the input', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} label="Oh La Mort" id="hey" choices={choices} />);
      userEvent.click(screen.getByLabelText('Oh La Mort'));
      userEvent.click(screen.getByText('broke my heart'));

      expect(screen.getByLabelText('Oh La Mort')).toHaveValue('broke my heart');
    });

    it('keeps the selected value selected', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} label="Oh La Mort" id="hey" choices={choices} />);
      userEvent.click(screen.getByLabelText('Oh La Mort'));
      userEvent.click(screen.getByText('broke my heart'));
      userEvent.click(screen.getByLabelText('Oh La Mort'));

      expect(screen.getByText('broke my heart')).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('value API', () => {
    it('accepts a value', () => {
      const value = { id: 'some-selection', label: 'Some selection' };
      render(<CustomFieldInputSingleChoice {...requiredProps} value={value} />);
      expect(screen.getByLabelText('Test label')).toHaveValue('Some selection');
    });

    it('provided value sets the corresponding list item as selected', () => {
      const value = { id: 'hello', label: 'hello' };
      const choices = [value];
      render(<CustomFieldInputSingleChoice {...requiredProps} value={value} choices={choices} />);
      userEvent.click(screen.getByLabelText('Test label'));

      expect(screen.getByText('hello')).toHaveAttribute('aria-selected', 'true');
    });
  });
});