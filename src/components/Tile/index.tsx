import React from 'react';
import { Link } from 'react-router-dom';
import Calculator from 'types/Calculator';

export default function Tile({
  calculator,
}: {
  calculator: Calculator
}) {
  return (
    <div className="border-2 border-slate-700 rounded-md p-4 pb-6 flex flex-col">
      <div className="flex-grow">
        <h2>
          {calculator.navItem.title}
        </h2>
        <calculator.Intro />
      </div>
      <div className="text-right">
        <Link
          to={calculator.navItem.href}
          title={calculator.navItem.title}
          className="bg-fuchsia-600 text-white rounded-md py-2 px-5 hover:bg-fuchsia-700 hover:no-underline border-[1px] border-fuchsia-700 focus:border-fuchsia-900 focus-visible:outline-none"
        >
          Go
        </Link>
      </div>
    </div>
  );
}
