import Tile from 'components/Tile';
import Layout from 'components/layout';
import React from 'react';
import {
  Routes, Route, BrowserRouter,
} from 'react-router-dom';
import { Calculators, Render } from 'types/Calculator';

function Home() {
  return (
    <div className="border-slate-400 border-2 rounded-md p-6 relative z-10">
      <p>
        This is a collection of calculators related to making beer, mead, cider, and wine.
      </p>
      <div className="grid grid-cols-2 gap-4">
        {
          Calculators.map((calc) => (
            <Tile
              key={calc.navItem.href}
              calculator={calc}
            />
          ))
        }
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
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
