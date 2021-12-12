import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation';

test('renders learn react link', () => {
  const scmPackage = {
    files: [
      { scmFileId: 123, label: 'Testfile' },
    ],
  };
  const { getByText } = render(
    <Router>
      <Navigation
        open
        scmPackage={scmPackage}
      />
    </Router>,
  );
  const label = getByText(/Testfile/i);
  expect(label).toBeInTheDocument();
});
