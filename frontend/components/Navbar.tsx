"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldAlert, Menu, X, LayoutDashboard, Stethoscope, FileSearch, Scale } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Symptom Triage", href: "/triage", icon: Stethoscope },
    { name: "Coverage Check", href: "/coverage-check", icon: FileSearch },
    { name: "Dispute Claim", href: "/dispute", icon: Scale },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  ];

  const activeLinkClass = "text-indigo-700 bg-indigo-50 border-indigo-600 font-bold";
  const inactiveLinkClass = "text-slate-700 hover:text-indigo-600 hover:bg-slate-50 border-transparent";

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 mr-8 group">
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 p-2 rounded-xl text-white shadow-md shadow-indigo-100 group-hover:scale-105 transition duration-200">
                <ShieldAlert className="h-5 w-5 text-teal-400" />
              </div>
              <span className="text-xl font-extrabold tracking-tight flex items-center">
                <span className="text-[#3B5CCC]">Claim</span>
                <span className="text-[#14B8A6]">Sure</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold border-b-2 transition ${
                      isActive ? activeLinkClass : inactiveLinkClass
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none transition"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-50 py-3 px-4 space-y-2 shadow-inner">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  isActive ? "bg-indigo-50 text-indigo-700" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Icon className="h-5 w-5" />
                {link.name}
              </Link>
            );
          })}

        </div>
      )}
    </nav>
  );
}
