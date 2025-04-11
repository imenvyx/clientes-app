import { render, screen } from '@testing-library/react';
import Clients from './Clients';

test('renders learn react link', () => {
  render(<Clients />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
