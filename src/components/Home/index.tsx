import Tile from "components/Tile";
import React from "react";
import { Calculators } from "types/Calculator";

export default function Home() {
  return (
    <div className="p-4">
      <p>
        A collection of tools related to making beer, mead, cider, and wine.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        {Calculators.map((calc) => (
          <Tile key={calc.navItem.href} calculator={calc} />
        ))}
      </div>
    </div>
  );
}
