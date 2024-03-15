import Home from 'components/Home';
import Layout from 'components/layout';
import React from 'react';
import {
  Routes, Route, BrowserRouter,
} from 'react-router-dom';
import { Calculators, Render } from 'types/Calculator';

export default function App() {
  // part of a hack to get the site to run on GitHub Pages: https://github.com/rafgraph/spa-github-pages
  const baseName = (process.env.NODE_ENV === 'development' ? '' : '/homebrewing-calculators');

  return (
    <BrowserRouter basename={baseName}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={<Home />}
          />
          {
          Calculators.map((calc) => {
            const body = <Render calculator={calc} />;

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
