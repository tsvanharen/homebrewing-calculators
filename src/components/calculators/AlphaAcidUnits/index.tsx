import Calculator, { CalculationResult } from "types/Calculator";
import React, { ReactNode, useCallback, useState } from "react";
import ButtonAlertGroup from "components/ButtonAlertGroup";
import GridInputGroup from "components/GridInputGroup";

function Intro() {
  return (
    <p>
      Use this tool to determine the resulting weight in ounces or alpha acid
      units (AAU) needed for your hops.
    </p>
  );
}

function Notes() {
  return (
    <p>
      The alpha acid percentage is required. Leave the field blank that you need
      to calculate. Note that the resulting values are rounded to two decimal
      places.
    </p>
  );
}

function Form() {
  const [alphaAcidPercentage, setAlphaAcidPercentage] = useState("");
  const [hopWeightOz, setHopWeightOz] = useState("");
  const [alphaAcidUnits, setAlphaAcidUnits] = useState("");
  const [result, setResult] = useState<CalculationResult | undefined>();

  const calculate = useCallback(() => {
    const hasHopWeightOz = hopWeightOz.trim();
    const hasAlphaAcidUnits = alphaAcidUnits.trim();

    const alphaAcidPerc = parseFloat(alphaAcidPercentage.trim());
    const hopWeight = parseFloat(hasHopWeightOz);
    const aaus = parseFloat(hasAlphaAcidUnits);

    const errorMessages: ReactNode[] = [];

    if (Number.isNaN(alphaAcidPerc) || alphaAcidPerc <= 0.0) {
      errorMessages.push(<>Enter a positive numeric alpha acid percentage.</>);
    }

    if (hasHopWeightOz && hasAlphaAcidUnits) {
      errorMessages.push(
        <>
          Enter either hop weight in ounces or alpha acid units, but not both.
        </>,
      );
    } else if (hasHopWeightOz && !hasAlphaAcidUnits) {
      if (Number.isNaN(hopWeight) || hopWeight <= 0.0) {
        errorMessages.push(<>Enter a positive numeric hop weight in ounces.</>);
      }
    } else if (!hasHopWeightOz && hasAlphaAcidUnits) {
      if (Number.isNaN(aaus) || aaus <= 0.0) {
        errorMessages.push(
          <>Enter a positive numeric value for alpha acid units.</>,
        );
      }
    } else {
      // (!hasHopWeightOz && !hasAlphaAcidUnits)
      errorMessages.push(
        <>Enter either hop weight in ounces or alpha acid units.</>,
      );
    }

    if (errorMessages.length) {
      setResult({
        type: "error",
        messages: errorMessages,
      });
      return;
    }

    let message: ReactNode;

    // AAUs = % alpha x oz.
    if (!hasHopWeightOz && hasAlphaAcidUnits) {
      // calculate weight in ounces
      const calcHopWeightOz = aaus / alphaAcidPerc;
      message = (
        <>
          With this alpha acid percentage and AAU value, you need{" "}
          <span className="font-bold">{calcHopWeightOz.toFixed(2)} ounces</span>{" "}
          of hops.
        </>
      );
    } else {
      // calculate AAUs
      const calcAlphaAcidUnits = alphaAcidPerc * hopWeight;
      message = (
        <>
          With this alpha acid percentage and weight in hops, your hops
          potentially contribute{" "}
          <span className="font-bold">{calcAlphaAcidUnits.toFixed(2)} AAU</span>{" "}
          of bitterness.
        </>
      );
    }

    setResult({
      type: "success",
      messages: [message],
    });
  }, [alphaAcidPercentage, hopWeightOz, alphaAcidUnits]);

  return (
    <>
      <div className="inline-grid grid-cols-2 gap-4">
        <GridInputGroup
          labelText="Hop Alpha Acid"
          inputType="tel"
          dimension="%"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAlphaAcidPercentage(e.currentTarget.value)
          }
        />
        {/* spacer element */}
        <div />
        <GridInputGroup
          labelText="Hop Weight"
          inputType="tel"
          dimension="ounces"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setHopWeightOz(e.currentTarget.value)
          }
        />
        <GridInputGroup
          labelText="Alpha Acid Units"
          inputType="tel"
          dimension="AAUs"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAlphaAcidUnits(e.currentTarget.value)
          }
        />
      </div>
      <ButtonAlertGroup result={result} calculateCallback={calculate} />
    </>
  );
}

const AlphaAcidUnits: Calculator = {
  navItem: {
    title: "Alpha Acid Units",
    href: "/alpha-acid-units",
  },
  Intro,
  Notes,
  Form,
  sources: [
    {
      title: "How to Brew, Chapter 5",
      linkChildren: (
        <>
          <span className="italic">How to Brew</span>, Chapter 5
        </>
      ),
      href: "http://howtobrew.com/book/section-1/hops/hop-bittering-calculations",
    },
    {
      title: "Brew Your Own",
      href: "http://byo.com/hops/item/122-alpha-hop-soup-figuring-bitterness-ibus-aaus-and-hbus",
    },
    {
      title: "What are Alpha Acids, AAU&apos;s, HBU&apos;s, and IBU&apos;s?",
      linkChildren: (
        <span className="italic">
          What are Alpha Acids, AAU&apos;s, HBU&apos;s, and IBU&apos;s?
        </span>
      ),
      href: "https://www.midwestsupplies.com/blogs/bottled-knowledge/what-are-alpha-acids-aaus-hbus-and-ibus",
    },
  ],
};

export default AlphaAcidUnits;
