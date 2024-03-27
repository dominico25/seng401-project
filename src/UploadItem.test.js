import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UploadItem from './UploadItem';

test('uploads item when form is submitted', () => {
  render(<UploadItem />);
  
  // Mock file object
  const file = new File(['test.png'], 'test.png', { type: 'image/png' });
  const fileInput = screen.getByLabelText('Select the Item to Upload');
  Object.defineProperty(fileInput, 'files', {
    value: [file],
  });

  // Mock select input values
  const colourSelect = screen.getByPlaceholderText('Select Colour');
  const styleSelect = screen.getByPlaceholderText('Select Style');
  const typeSelect = screen.getByPlaceholderText('Select Type');
  const classificationSelect = screen.getByPlaceholderText('Select Wishlist or Closet');
  fireEvent.change(colourSelect, { target: { value: 'Red' } });
  fireEvent.change(styleSelect, { target: { value: 'Casual' } });
  fireEvent.change(typeSelect, { target: { value: 'Top' } });
  fireEvent.change(classificationSelect, { target: { value: 'Wishlist' } });

  // Submit form
  fireEvent.click(screen.getByText('Upload Item'));

  // Assert that the file is uploaded (in this case, it just logs the file name)
  expect(console.log).toHaveBeenCalledWith('Selected File:', file);
});
