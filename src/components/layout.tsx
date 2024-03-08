import React from 'react';
import { Outlet } from 'react-router-dom';
import TabNav from './TabNav';

export default function Layout() {
  return (
    <>
      <main>
        <h1>Homebrewing Calculators</h1>
        <TabNav />
        <Outlet />
      </main>
      <footer className="text-center text-sm py-4">
        Copyright &copy; 2016 -
        {' '}
        {new Date().getFullYear()}
        {' '}
        Timothy S. Van Haren
      </footer>
    </>
  );
}
