import Calculator, { CalculationResult } from 'types/Calculator';
import React, { ReactNode, useCallback, useState } from 'react';
import ButtonAlertGroup from 'components/ButtonAlertGroup';
import GridInputGroup from 'components/GridInputGroup';

function Intro() {
  return (

    <p>
      Use this tool to determine the change in your beverage&apos;s ABV from the addition of liquids post-fermentation, like
      spirits or backsweeters.
    </p>

  );
}

function Notes() {
  return (
    <>
      <p>
        Remember to halt fermentation prior to addition to prevent any sugar additions from being fermented out.
      </p>
      <p>
        Note that the volumes don&apos;t ask for a dimension (fluid ounces, gallons, etc.). It won&apos;t matter as long as the
        volume for the beverage and the liquid addition are in the same measure.
      </p>
    </>
  );
}

function Form() {
  const [beverageVolume, setBeverageVolume] = useState('');
  const [beverageAbv, setBeverageAbv] = useState('');
  const [additionVolume, setAdditionVolume] = useState('');
  const [additionAbv, setAdditionAbv] = useState('');

  const [result, setResult] = useState<CalculationResult | undefined>();

  const calculate = useCallback(() => {
    const bevVolume = parseFloat(beverageVolume.trim());
    const bevAbv = parseFloat(beverageAbv.trim());
    const addnVolume = parseFloat(additionVolume.trim());
    const addnAbv = parseFloat(additionAbv.trim());
    const errorMessages: ReactNode[] = [];

    if (Number.isNaN(bevVolume) || bevVolume <= 0.0) {
      errorMessages.push(<>Enter a positive numeric beverage volume.</>);
    }

    if (Number.isNaN(bevAbv) || bevAbv < 0.0) {
      errorMessages.push(<>Enter a non-negative numeric beverage ABV percentage.</>);
    }

    if (Number.isNaN(addnVolume) || addnVolume <= 0.0) {
      errorMessages.push(<>Enter a positive numeric addition volume.</>);
    }

    if (Number.isNaN(addnAbv) || addnAbv < 0.0) {
      errorMessages.push(<>Enter a non-negative numeric addition ABV percentage.</>);
    }

    if (errorMessages.length) {
      setResult({
        type: 'error',
        messages: errorMessages,
      });
      return;
    }

    // ((Volume1 X ABV1) + (Volume2 X ABV2)) / (Volume1 + Volume2)
    const bevAlcoholVolume = bevVolume * bevAbv;
    const addnAlcoholVolume = addnVolume * addnAbv;
    const totalVolume = bevVolume + addnVolume;
    const resultingAbv = (bevAlcoholVolume + addnAlcoholVolume) / totalVolume;
    const abvChange = resultingAbv - bevAbv;

    let message: ReactNode;

    if (abvChange > 0.0) {
      message = (
        <>
          This adds
          {' '}
          <span className="font-bold">
            {abvChange}
            % ABV
          </span>
          {' '}
          to your beverage, resulting in a beverage with
          {' '}
          <span className="font-bold">
            {resultingAbv}
            % ABV
          </span>
          .
        </>
      );
    } else if (abvChange === 0.0) {
      // no change in ABV
      message = (
        <>
          This results in no change in ABV to your beer, resulting in a beer with
          {' '}
          <span className="font-bold">
            {resultingAbv}
            {' '}
            % ABV
          </span>
          .
        </>
      );
    } else {
      message = (
        <>
          This subtracts
          {' '}
          <span className="font-bold">
            {Math.abs(abvChange)}
            % ABV
          </span>
          {' '}
          from your beverage, resulting in a beverage with
          {' '}
          <span className="font-bold">
            {resultingAbv}
            % ABV
          </span>
          .
        </>
      );
    }

    setResult({
      type: 'success',
      messages: [message],
    });
  }, [beverageVolume, beverageAbv, additionVolume, additionAbv]);

  return (
    <>
      <div className="inline-grid grid-cols-2 gap-4">
        <GridInputGroup
          labelText="Beverage Volume"
          inputType="tel"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBeverageVolume(e.currentTarget.value)}
        />
        <GridInputGroup
          labelText="Beverage ABV"
          inputType="tel"
          dimension="%"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBeverageAbv(e.currentTarget.value)}
        />
        <GridInputGroup
          labelText="Addition Volume"
          inputType="tel"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAdditionVolume(e.currentTarget.value)}
        />
        <GridInputGroup
          labelText="Addition ABV"
          inputType="tel"
          dimension="%"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAdditionAbv(e.currentTarget.value)}
        />
      </div>
      <ButtonAlertGroup
        result={result}
        calculateCallback={calculate}
      />
    </>
  );
}

const Backsweetening: Calculator = {
  navItem: {
    title: 'Backsweetening',
    href: '/backsweetening',
  },
  Intro,
  Notes,
  Form,
  sources: [
    {
      title: 'Home Brew Talk Forums',
      href: 'https://www.homebrewtalk.com/threads/backsweetenings-impact-on-abv.395642/#post-4982612',
    },
  ],
};

export default Backsweetening;
