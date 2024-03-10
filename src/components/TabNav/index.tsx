import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calculators } from 'types/Calculator';

export default function TabNav() {
  const { pathname } = useLocation();
  let navItems = Calculators.map((calc) => calc.navItem);
  navItems = [{ title: 'Home', href: '/' }, ...navItems];

  return (
    <nav>
      <ul className="flex px-4 list-none ml-0">
        {
          navItems.map((navItem) => {
            let currentLiStyles = '';
            let currentAStyles = '';

            if (navItem.href === pathname) {
              currentLiStyles = 'border-slate-400 border-b-white z-20 hover:bg-white';
              currentAStyles = 'text-slate-900';
            }

            return (
              <li
                key={navItem.href}
                className={`border-2 border-slate-200 py-1 px-4 rounded-t-md -mb-[0.125rem] mx-1 indent-0 before:mr-0 hover:bg-slate-200 ${currentLiStyles}`}
              >
                <Link
                  to={navItem.href}
                  title={navItem.title}
                  className={`hover:no-underline text-slate-600 ${currentAStyles}`}
                >
                  {navItem.linkChildren ? navItem.linkChildren : navItem.title}
                </Link>
              </li>
            );
          })
        }
      </ul>
    </nav>
  );
}
