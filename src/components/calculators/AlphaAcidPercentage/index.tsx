import Calculator, { CalculationResult } from 'types/Calculator';
import React, { ReactNode, useCallback, useState } from 'react';
import ButtonAlertGroup from 'components/ButtonAlertGroup';
import GridInputGroup from 'components/GridInputGroup';

function Intro() {
  return (
    <>
      <p>
        This tool is useful when a recipe calls for a hop with a specific alpha acid percentage, but the hops you have available have a different alpha hop percentage.  This tool provides the hop weight you should use to impart the same potential alpha acid units from the recipe.
      </p>
      <p>
        Note that the resulting hop weight will be in the same dimension as the recipe&apos;s hop weight that you enter (ounces, grams, etc.).
      </p>
    </>
  );
}

function Form() {
  const [recipeAlphaAcidPercentage, setRecipeAlphaAcidPercentage] = useState('');
  const [recipeHopWeight, setRecipeHopWeight] = useState('');
  const [yourAlphaAcidPercentage, setYourAlphaAcidPercentage] = useState('');
  const [result, setResult] = useState<CalculationResult | undefined>();

  const calculate = useCallback(() => {
    const recipeAlphaAcidPerc = parseFloat(recipeAlphaAcidPercentage.trim());
    const recipeWeight = parseFloat(recipeHopWeight);
    const yourAlphaAcidPerc = parseFloat(yourAlphaAcidPercentage);

    const errorMessages: ReactNode[] = [];

    if (Number.isNaN(recipeAlphaAcidPerc) || recipeAlphaAcidPerc <= 0.0) {
      errorMessages.push(<>Enter a positive numeric alpha acid percentage for the recipe&apos;s hops.</>);
    }

    if (Number.isNaN(recipeWeight) || recipeWeight <= 0.0) {
      errorMessages.push(<>Enter a positive numeric weight for the recipe&apos;s hops.</>);
    }

    if (Number.isNaN(yourAlphaAcidPerc) || yourAlphaAcidPerc <= 0.0) {
      errorMessages.push(<>Enter a positive numeric alpha acid percentage for your recipe&apos;s hops.</>);
    }

    if (errorMessages.length) {
      setResult({
        type: 'error',
        messages: errorMessages,
      });
      return;
    }

    const yourWeight = (recipeAlphaAcidPerc * recipeWeight) / yourAlphaAcidPerc;

    const message = (
      <>
        You will need
        {' '}
        <span className="font-bold">
          {yourWeight}
          {' '}
          ounces, grams, etc.
        </span>
        {' '}
        of this hop to impart the potential acid acid units of bitterness that your recipe calls for.
      </>
    );

    setResult({
      type: 'success',
      messages: [message],
    });
  }, [recipeAlphaAcidPercentage, recipeHopWeight, yourAlphaAcidPercentage]);

  return (
    <>
      <div className="inline-grid grid-cols-2 gap-4">
        <GridInputGroup
          labelText="Recipe's Alpha Acid Percentage"
          inputType="tel"
          dimension="%"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecipeAlphaAcidPercentage(e.currentTarget.value)}
        />
        <GridInputGroup
          labelText="Recipe's Weight"
          inputType="tel"
          dimension="ounces, grams, etc."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecipeHopWeight(e.currentTarget.value)}
        />
        <GridInputGroup
          labelText="Your Alpha Acid Percentage"
          inputType="tel"
          dimension="%"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setYourAlphaAcidPercentage(e.currentTarget.value)}
        />
      </div>
      <ButtonAlertGroup
        result={result}
        calculateCallback={calculate}
      />
    </>
  );
}

const AlphaAcidPercentage: Calculator = {
  navItem: {
    title: 'Alpha Acid Percentage',
    href: '/alpha-acid-percentage',
  },
  Intro,
  Form,
  sources: [
    {
      title: 'How to Brew, Chapter 5',
      linkChildren: (
        <>
          <span className="italic">How to Brew</span>
          , Chapter 5
        </>
      ),
      href: 'http://howtobrew.com/book/section-1/hops/hop-bittering-calculations',
    },
    {
      title: 'Brew Your Own',
      href: 'http://byo.com/hops/item/122-alpha-hop-soup-figuring-bitterness-ibus-aaus-and-hbus',
    },
    {
      title: 'What are Alpha Acids, AAU&apos;s, HBU&apos;s, and IBU&apos;s?',
      linkChildren: (<span className="italic">What are Alpha Acids, AAU&apos;s, HBU&apos;s, and IBU&apos;s?</span>),
      href: 'https://www.midwestsupplies.com/blogs/bottled-knowledge/what-are-alpha-acids-aaus-hbus-and-ibus',
    },
  ],
};

export default AlphaAcidPercentage;
