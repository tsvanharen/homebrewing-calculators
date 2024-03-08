import React, { ReactNode, useCallback, useState } from 'react';
import Calculator, { CalculationResult } from 'types/Calculator';
import GridInputGroup from 'components/GridInputGroup';
import ButtonAlertGroup from 'components/ButtonAlertGroup';

function Intro() {
  return (
    <p>
      Use this tool to determine the number of bottles you need to package your beverage.
    </p>
  );
}

function Form() {
  const [beverageVolumeGal, setBeverageVolumeGal] = useState('');
  const [bottleSizeFlOz, setBottleSizeFlOz] = useState('');

  const [result, setResult] = useState<CalculationResult | undefined>();

  const calculate = useCallback(() => {
    const batchVolume = parseFloat(beverageVolumeGal.trim());
    const bottleVolume = parseFloat(bottleSizeFlOz.trim());
    const errorMessages: ReactNode[] = [];

    if (Number.isNaN(batchVolume) || batchVolume <= 0.0) {
      errorMessages.push(<>Enter a positive numeric beverage volume in gallons.</>);
    }

    if (Number.isNaN(bottleVolume) || bottleVolume <= 0.0) {
      errorMessages.push(<>Enter a positive numeric bottle size in fluid ounces.</>);
    }

    if (errorMessages.length) {
      setResult({
        type: 'error',
        messages: errorMessages,
      });
      return;
    }

    const bottlesNeeded = Math.ceil((batchVolume * 128.0) / bottleVolume);
    const suffix = (bottlesNeeded !== 1) ? 's' : '';

    let bottleDescription = `${bottleVolume} fluid ounce bottle`;

    if (bottleVolume === 22) {
      bottleDescription = 'bomber';
    }

    setResult({
      type: 'success',
      messages: [(
        <>
          You will need
          {' '}
          <span className="font-bold">
            {bottlesNeeded}
            {' '}
            {bottleDescription}
            {suffix}
          </span>
          {' '}
          to bottle your
          {' '}
          <span className="font-bold">
            {batchVolume}
            {' '}
            gallon
          </span>
          {' '}
          batch.
        </>
      )],
    });
  }, [beverageVolumeGal, bottleSizeFlOz]);

  return (
    <>
      <div className="inline-grid grid-cols-1 gap-4">
        <GridInputGroup
          labelText="Beverage Volume"
          inputType="tel"
          dimension="gallons"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBeverageVolumeGal(e.currentTarget.value)}
        />

        <GridInputGroup
          labelText="Bottle Size"
          inputType="tel"
          dimension="fluid ounces"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBottleSizeFlOz(e.currentTarget.value)}
        />
      </div>

      <ButtonAlertGroup
        result={result}
        calculateCallback={calculate}
      />
    </>
  );
}

const Bottles: Calculator = {
  navItem: {
    title: 'Bottles',
    href: '/',
  },
  Intro,
  Form,
};

export default Bottles;
