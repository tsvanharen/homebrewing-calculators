import Layout from 'components/layout';
import React from 'react';
import {
  Routes, Route, BrowserRouter,
} from 'react-router-dom';
import { Calculators, Render } from 'types/Calculator';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {
          Calculators.map((calc, i) => {
            const body = <Render calculator={calc} />;

            if (i === 0) {
              return (
                <Route
                  key={calc.navItem.href}
                  index
                  element={body}
                />
              );
            }

            return (
              <Route
                key={calc.navItem.href}
                path={calc.navItem.href}
                element={body}
              />
            );
          })
        }
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
