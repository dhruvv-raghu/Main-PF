import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';

test('renders Home component with expected text', () => {
  render(<Home />);
  expect(screen.getByText('Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus, nam tempora. Sequi corrupti animi eius, earum velit, officiis id tempore at labore ut cupiditate dicta. Magnam est alias illum magni!')).toBeInTheDocument();
});
