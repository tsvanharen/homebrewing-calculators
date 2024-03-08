import { CalculationResult } from 'types/Calculator';
import React from 'react';

export default function ButtonAlertGroup({
  result,
  calculateCallback,
}: {
  result: CalculationResult | undefined,
  calculateCallback: () => void
}) {
  return (
    <>
      <div className="pt-4">
        <button
          type="button"
          onClick={() => calculateCallback()}
          className="bg-fuchsia-600 text-white rounded-md py-2 px-5 hover:bg-fuchsia-700 border-[1px] border-fuchsia-700 focus:border-fuchsia-900 focus-visible:outline-none"
        >
          Calculate
        </button>
      </div>

      {result && result.messages.length && (
      <div className={`block py-4 px-4 border-[1px] rounded-md mt-4 text-sm ${result.type}`} role="alert">
        {result.messages.length === 1 && result.messages[0]}
        {result.messages.length > 1 && (
        <ul>
          {
            result.messages.map((message) => (
              <li key={message?.toString()}>
                {message}
              </li>
            ))
          }
        </ul>
        )}
      </div>
      )}
    </>
  );
}
