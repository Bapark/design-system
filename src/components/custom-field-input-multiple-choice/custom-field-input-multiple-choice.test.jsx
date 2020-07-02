import React from 'react';
import renderer from 'react-test-renderer';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomFieldInputMultipleChoice from './custom-field-input-multiple-choice.jsx';

describe('<CustomFieldInputMultipleChoice>', () => {
  const requiredProps = {
    choices: [{
      id: '1',
      label: 'Choice 1',
    }, {
      id: '2',
      label: 'Choice 2',
    }],
    id: 'test-id',
    label: 'test label',
  };

  it('has defaults', () => {
    expect(renderer.create(<CustomFieldInputMultipleChoice {...requiredProps} />).toJSON()).toMatchSnapshot();
  });

  describe('autocompleter popup', () => {
    it('opens on click', () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} />);
      expect(screen.queryByRole('option', { name: 'Choice 1' })).not.toBeInTheDocument();
      expect(screen.queryByRole('option', { name: 'Choice 2' })).not.toBeInTheDocument();
      userEvent.click(screen.getByLabelText('test label'));
      expect(screen.queryByRole('option', { name: 'Choice 1' })).toBeInTheDocument();
      expect(screen.queryByRole('option', { name: 'Choice 2' })).toBeInTheDocument();
    });

    it('closes on escape key', () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} />);
      userEvent.click(screen.getByLabelText('test label'));
      expect(screen.queryByRole('option', { name: 'Choice 1' })).toBeInTheDocument();
      expect(screen.queryByRole('option', { name: 'Choice 2' })).toBeInTheDocument();
      fireEvent.keyDown(document.activeElement, { key: 'Escape' });
      expect(screen.queryByRole('option', { name: 'Choice 1' })).not.toBeInTheDocument();
      expect(screen.queryByRole('option', { name: 'Choice 2' })).not.toBeInTheDocument();
    });
  });

  describe('deselecting a choice', () => {
    it('removes the choice value when pressing the remove button', () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        value={requiredProps.choices}
      />));

      expect(screen.getByText('Choice 1')).toBeInTheDocument();
      expect(screen.getByText('Choice 2')).toBeInTheDocument();

      userEvent.click(screen.getAllByRole('button')[0]);
      expect(screen.queryByText('Choice 1')).not.toBeInTheDocument();
      expect(screen.getByText('Choice 2')).toBeInTheDocument();
    });
  });

  describe('choices API', () => {
    it('can be set', () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        choices={[{
          id: '42',
          label: 'Answer to everything',
        }]}
      />));

      expect(screen.queryByRole('option', { name: 'Answer to everything' })).not.toBeInTheDocument();
      userEvent.click(screen.getByLabelText('test label'));
      expect(screen.getByRole('option', { name: 'Answer to everything' })).toBeInTheDocument();
    });

    it('does not show a selected choice', () => {
      const choices = [{
        id: '42',
        label: 'Answer to everything',
      }];
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        choices={choices}
        value={choices}
      />));

      userEvent.click(screen.getByLabelText('test label'));
      expect(screen.queryByRole('option', { name: 'Answer to everything' })).not.toBeInTheDocument();
    });
  });

  describe('id API', () => {
    it('generates unique tag ids', () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        id="123"
        value={requiredProps.choices}
      />));

      expect(screen.getByText('Choice 1').parentElement).toHaveAttribute('id', '123-1');
      expect(screen.getByText('Choice 2').parentElement).toHaveAttribute('id', '123-2');
    });
  });

  describe('label API', () => {
    it('can be set', () => {
      render((<CustomFieldInputMultipleChoice {...requiredProps} label="Unique label" />));

      expect(screen.getByLabelText('Unique label')).toBeInTheDocument();
    });
  });

  describe('readOnly API', () => {
    it('does not have the clear button on its tags', () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        readOnly={true}
        value={[requiredProps.choices[0]]}
      />));

      expect(screen.queryByRole('button')).toBeNull();
    });

    it('has the clear button on its tags', () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        readOnly={false}
        value={[requiredProps.choices[0]]}
      />));

      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('selecting a choice', () => {
    it('removes the choice from the list of choices', () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} />);
      userEvent.click(screen.getByLabelText('test label'));
      expect(screen.queryByRole('option', { name: 'Choice 1' })).toBeInTheDocument();
      userEvent.click(screen.getByRole('option', { name: 'Choice 1' }));
      userEvent.click(screen.getByLabelText('test label'));
      expect(screen.queryByRole('option', { name: 'Choice 1' })).not.toBeInTheDocument();
    });

    it('adds the choice to the selected choices', () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} />);
      userEvent.click(screen.getByLabelText('test label'));
      expect(screen.queryByRole('gridcell', { name: 'Choice 1' })).not.toBeInTheDocument();
      userEvent.click(screen.queryByRole('option', { name: 'Choice 1' }));
      expect(screen.queryByRole('option', { name: 'Choice 1' })).not.toBeInTheDocument();
      userEvent.click(screen.getByLabelText('test label'));
      expect(screen.queryByRole('gridcell', { name: 'Choice 1' })).toBeInTheDocument();
    });
  });

  describe('value API', () => {
    it('generates tags', () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        value={requiredProps.choices}
      />));

      expect(screen.getByText('Choice 1')).toBeInTheDocument();
      expect(screen.getByText('Choice 2')).toBeInTheDocument();
    });
  });
});
