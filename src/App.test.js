import React from 'react';
import { render } from '@testing-library/react';
import Navigation from './components/Navigation';
import {BrowserRouter as Router} from "react-router-dom";

test('renders learn react link', () => {
  let scmPackage = {
    files: [
      {scmFileId: 123, label: "Testfile"}
    ]
  }
  const { getByText } = render(
    <Router>
        <Navigation
        open={true}
        scmPackage={scmPackage}
      />
    </Router>);
  const label = getByText(/Testfile/i);
  expect(label).toBeInTheDocument();
});
