import { render } from '@solidjs/testing-library';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the Get started heading', () => {
    const { getByText } = render(() => <App />);
    expect(getByText('Get started')).toBeTruthy();
  });

  it('renders the counter button with initial count 0', () => {
    const { getByText } = render(() => <App />);
    expect(getByText('Count is 0')).toBeTruthy();
  });
});
