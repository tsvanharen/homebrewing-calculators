import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Calculators } from "types/Calculator";

export default function Nav() {
  const { pathname } = useLocation();
  const navItems = Calculators.map((calc) => calc.navItem);

  return (
    <nav>
      <ul className="flex list-none m-0 gap-8 items-end">
        {navItems.map((navItem) => {
          let currentAStyles = "text-slate-600";

          if (navItem.href === pathname) {
            currentAStyles = "text-fuchsia-700";
          }

          return (
            <li
              key={navItem.href}
              className="block py-1 indent-0 before:mr-0 text-center"
            >
              <Link
                to={navItem.href}
                title={navItem.title}
                className={`hover:no-underline hover:text-fuchsia-900 md:text-base text-sm ${currentAStyles}`}
              >
                {navItem.linkChildren ? navItem.linkChildren : navItem.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
