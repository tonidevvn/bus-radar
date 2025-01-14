import { ReactElement } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

function render(ui: ReactElement, { route = '/' } = {}) {
  window.history.pushState({}, 'Test page', route);

  return rtlRender(
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  );
}

// Re-export everything
export * from '@testing-library/react';
export { render };

// Mock location calculation
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  // Return mock distance for testing
  return 100;
};
