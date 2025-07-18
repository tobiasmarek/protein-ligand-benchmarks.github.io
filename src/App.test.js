import { render, screen } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = jest.fn();
});

test('renders learn react link', () => {
  render(<App/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
