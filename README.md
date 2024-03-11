# Homebrewing Calculators

This is a collection of calculators related to making beer, mead, cider, and wine that is hosted at [fermentationsciences.xyz](https://fermentationsciences.xyz).

[![build/deploy](https://github.com/tsvanharen/homebrewing-calculators/actions/workflows/deploy.yml/badge.svg)](https://github.com/tsvanharen/homebrewing-calculators/actions/workflows/deploy.yml)

## Tech

* React
  
  I used Create React App to quickly generate some boilerplate. 
  
  Note: I should have used Vite, Next.js, etc., as CRA is now abandonware.  There are some out of the box issues with CRA, like:
  * Lack of support for TypeScript path aliases. This comment mentions the solution that I used in this project:  https://github.com/facebook/create-react-app/issues/12047#issuecomment-1374821527.  This is the actual solution:  https://create-react-app.dev/docs/importing-a-component/#absolute-imports.
  * Lack of support in general and potential security concerns, as CRA has not been updated in over a year at the time of this writing.

* TypeScript
* Tailwind CSS
  * Setup guide for Tailwind CSS with Create React App:  https://tailwindcss.com/docs/guides/create-react-app.
* React Router
  * https://create-react-app.dev/docs/adding-a-router/
  * https://github.com/remix-run/react-router/blob/dev/examples/basic
* Hosting
  * GitHub Pages with custom domain

## Roadmap

* Add calculation to alpha acid percentage calculator to account for the use case when you want to know the alpha acid percentage contribution of the hops you have, rather than the weight
* Round the values that are calculated (good unit test case here)
* Add prettier (https://prettier.io/docs/en/install)
* Add vitest (https://blog.ori.co/migrating-a-cra-project-to-vitejs)
* Add semantic release (https://semantic-release.gitbook.io/semantic-release/usage/installation#installation)
* Responsiveness
* Add storybook and its build output
