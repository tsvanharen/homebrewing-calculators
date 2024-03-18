import React from "react";
import { Link, Outlet } from "react-router-dom";
import Nav from "./components/Nav";

export default function Layout() {
  return (
    <>
      <header className="border-b-4 border-black pb-3 flex lg:flex-row items-center flex-col justify-center">
        <h1 className="lg:flex-grow font-semibold text-2xl uppercase whitespace-nowrap pb-2 lg:pb-0">
          <Link
            to="/"
            title="Home"
            className="text-inherit hover:text-fuchsia-900 hover:no-underline tracking-tight"
          >
            Fermentation Sciences
          </Link>
        </h1>
        <Nav />
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="text-center text-sm py-4">
        Copyright &copy; 2016 - {new Date().getFullYear()} Timothy S. Van Haren
      </footer>
    </>
  );
}
