import React from 'react';
import { render, screen } from '@testing-library/react';
import BrowseItem from './BrowseItem';

describe('BrowseItem component', () => {
  test('renders header', () => {
    render(<BrowseItem />);
    expect(screen.getByText(/header/i)).toBeInTheDocument();
  });
});
