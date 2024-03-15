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
    <div className="p-4">
      <calculator.Intro />
      <calculator.Notes />
      <section>
        <calculator.Form />
      </section>
      {calculator.sources && (
      <>
        <h3 className="font-bold mt-4">
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
  Notes: React.ElementType
  Form: React.ElementType
  sources?: CalculatorLink[]
}
