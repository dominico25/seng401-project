import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AccountInfo from './AccountInfo';
import { AccountProvider } from './AccountContext';

// Mock the fetch function to prevent network requests during tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ name: 'Test User', email: 'test@example.com', bio: 'Test bio' }),
    ok: true,
  })
);

describe('AccountInfo component', () => {
  test('renders account details and allows editing name', async () => {
    render(
      <AccountProvider>
        <AccountInfo />
      </AccountProvider>
    );

    // Check if the component renders the account details correctly
    expect(await screen.findByText('Account Details')).toBeInTheDocument();
    expect(screen.getByText('Name: Test User')).toBeInTheDocument();
    expect(screen.getByText('Email: test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Bio:')).toBeInTheDocument();
    expect(screen.getByText('Test bio')).toBeInTheDocument();

    // Click the "Edit Name" button
    fireEvent.click(screen.getByText('Edit Name'));

    // Enter a new name in the prompt
    const newName = 'New Test User';
    global.prompt = jest.fn(() => newName);

    // Click the "OK" button in the prompt
    fireEvent.click(screen.getByText('OK'));

    // Check if the new name is updated in the account details
    await waitFor(() => expect(screen.getByText(`Name: ${newName}`)).toBeInTheDocument());
  });

});
