import { render, screen } from '@testing-library/react';
import App from './App';

test('renders send button', () => {
  render(<App />);
  const button = screen.getByText(/Send/i);
  expect(button).toBeInTheDocument();
});
