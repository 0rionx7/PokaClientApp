import { screen } from '@testing-library/react';

import App from 'App';
import { renderWithProviders } from '__tests__/utils/test-utils';

test('should display heading text', () => {
  renderWithProviders(<App />);
  const headingText = screen.getByText('Hello');
  expect(headingText).toBeInTheDocument();
});
