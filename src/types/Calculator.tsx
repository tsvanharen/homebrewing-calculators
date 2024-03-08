import AlphaAcidPercentage from 'components/calculators/AlphaAcidPercentage';
import AlphaAcidUnits from 'components/calculators/AlphaAcidUnits';
import Backsweetening from 'components/calculators/Backsweetening';
import Bottles from 'components/calculators/Bottles';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export interface CalculationResult {
  type: 'success' | 'error'
  messages: ReactNode[]
}

export interface CalculatorLink {
  title: string
  linkChildren?: ReactNode
  href: string
}

export function Render({
  calculator,
}: {
  calculator: Calculator
}) {
  return (
    <div className="border-slate-400 border-2 rounded-md p-6 relative z-10">
      <calculator.Intro />
      <section>
        <calculator.Form />
      </section>
      {calculator.sources && (
      <>
        <h3 className="font-bold pt-2 mt-4 border-t-slate-400 border-t-2">
          Sources
        </h3>
        <ul>
          {
            calculator.sources.map((source) => (
              <li
                key={source.href}
              >
                <Link
                  to={source.href}
                  title={source.title}
                  target="_blank"
                  rel="noreferrer"
                >
                  {source.linkChildren ? source.linkChildren : source.title}
                </Link>
              </li>
            ))
          }
        </ul>
      </>
      )}
    </div>
  );
}

export const Calculators = [
  Bottles,
  Backsweetening,
  AlphaAcidUnits,
  AlphaAcidPercentage,
];

export default interface Calculator {
  navItem: CalculatorLink
  Intro: React.ElementType
  Form: React.ElementType
  sources?: CalculatorLink[]
}
