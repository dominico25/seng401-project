//This is the test file created to test generate outfit feature (RQ12)
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GenerateOutfit from './GenerateOutfit';

describe('GenerateOutfit component', () => {
  test('renders GenerateOutfit component', () => {
    render(<GenerateOutfit />);
    
    const headingElement = screen.getByRole('heading', { name: /generate an outfit/i });
    const colourSelect = screen.getByRole('combobox', { name: /select colour/i });
    const styleSelect = screen.getByRole('combobox', { name: /select style/i });
    const classificationSelect = screen.getByRole('combobox', { name: /select classification/i });
    const submitButton = screen.getByRole('button', { name: /submit/i });

    expect(headingElement).toBeInTheDocument();
    expect(colourSelect).toBeInTheDocument();
    expect(styleSelect).toBeInTheDocument();
    expect(classificationSelect).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('displays warning when submitting without selecting options', async () => {
    render(<GenerateOutfit />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    const warningMessage = await screen.findByText(/please make selections for both colour, style, and classification/i);
    expect(warningMessage).toBeInTheDocument();
  });
});
