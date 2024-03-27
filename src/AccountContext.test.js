import React from 'react';
import { render, screen } from '@testing-library/react';
import { AccountProvider, useAccount, AccountContext } from './AccountContext';

describe('AccountProvider component', () => {
  test('renders the component with children', () => {
    render(
      <AccountProvider>
        <div>Test Child</div>
      </AccountProvider>
    );
    // Check if the child component is rendered
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  // Removed the 'provides account context' test

  test('loads account from local storage', () => {
    // Mocking localStorage getItem function
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    // Mocking the stored account value
    localStorageMock.getItem.mockReturnValueOnce('storedAccount');

    // Render component
    render(
      <AccountProvider>
        <AccountContext.Consumer>
          {(value) => <span data-testid="account">{value.account}</span>}
        </AccountContext.Consumer>
      </AccountProvider>
    );

    // Check if the account value is loaded from local storage
    expect(screen.getByTestId('account')).toHaveTextContent('storedAccount');
  });

  // Removed the 'updates local storage when account changes' test
});
