//This is a basic test suite for create outfit module in order to just test rendering

import React from 'react';
import { render } from '@testing-library/react';
import CreateOutfit from './CreateOutfit';

describe('CreateOutfit component', () => {
  it('renders without crashing', () => {
    render(<CreateOutfit />);
  });

});
