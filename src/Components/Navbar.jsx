import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/Rewatch", label: "Rewatch" },
  { to: "/Booking", label: "Booking" },
];

const linkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium ${
    isActive ? "bg-slate-700 text-white" : "text-slate-300 hover:text-white"
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-slate-900">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-bold text-white">
          🎬 Doomsday<span className="text-amber-400">Ready</span>
        </Link>

        {/* Desktop */}
        <div className="hidden gap-1 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          className="text-2xl text-white md:hidden"
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="flex flex-col gap-1 px-4 pb-3 md:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setOpen(false)}
              className={linkClass}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}