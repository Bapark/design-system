import React from 'react';
import { render, screen } from '@testing-library/react';
import Icon from './icon.jsx';

describe('Icon', () => {
  const requiredProps = {
    icon: {
      id: 'foobar',
      viewBox: '0 0 0 0',
    },
    label: 'Test label',
  };

  it('has defaults', () => {
    render(<Icon {...requiredProps} />);
    expect(document.body).toMatchSnapshot();
  });

  describe('className prop API', () => {
    it('can be set', () => {
      render(<Icon {...requiredProps} className="unique-class-name" />);
      expect(screen.getByRole('img', { name: 'Test label' })).toHaveClass('unique-class-name');
    });
  });

  describe('icon API', () => {
    it('sets the xlink:href', () => {
      render(<Icon {...requiredProps} icon={{ ...requiredProps.icon, id: 'unique-id' }} />);
      expect(screen.getByRole('img', { name: 'Test label' }).children[1]).toHaveAttribute('xlink:href', '#unique-id');
    });

    it('sets the height', () => {
      render((
        <Icon {...requiredProps} icon={{ id: 'foobar', viewBox: '0 0 10 11' }} />
      ));

      expect(screen.getByRole('img')).toHaveAttribute('height', '11');
    });

    it('sets the width', () => {
      render((
        <Icon {...requiredProps} icon={{ id: 'foobar', viewBox: '0 0 10 11' }} />
      ));

      expect(screen.getByRole('img')).toHaveAttribute('width', '10');
    });
  });

  describe('id API', () => {
    it('can be set', () => {
      render((
        <Icon {...requiredProps} id="unique-id" />
      ));
      expect(screen.getByRole('img')).toHaveAttribute('id', 'unique-id');
    });
  });

  describe('label prop API', () => {
    it('can be set', () => {
      render(<Icon {...requiredProps} label="Unique label" />);
      expect(screen.getByRole('img', { name: 'Unique label' })).toBeInTheDocument();
    });
  });

  describe('labelledBy prop API', () => {
    it('can be set', () => {
      render((
        <React.Fragment>
          <label id="label-id">Unique label</label>
          <Icon {...requiredProps} labelledBy="label-id" />
        </React.Fragment>
      ));
      expect(screen.getByLabelText('Unique label')).toBeInTheDocument();
    });
  });
});
