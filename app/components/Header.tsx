"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import { Merriweather } from 'next/font/google';
import { Briefcase, Lightbulb, Mail, MapPin, GraduationCap, Award, Video, FileText, User } from "lucide-react";

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  display: 'swap',
});

const menuItems = [
  { name: "About", icon: User },
  { name: "Appointments", icon: Briefcase },
  { name: "Education", icon: GraduationCap },
  { name: "Awards", icon: Award },
  { name: "Research", icon: Lightbulb },
  { name: "Publications", icon: FileText },
  { name: "Media", icon: Video },
  { name: "Contact", icon: Mail },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed w-full transition-all duration-300 z-50 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className={`text-2xl transition-colors duration-300 ${merriweather.className} ${isScrolled ? "text-gray-900" : "text-white"}`}>
          Fadi Kurdahi
        </h1>
        <button className={`md:hidden text-3xl p-2 transition-colors duration-300 ${isScrolled ? "text-gray-900" : "text-white"}`} onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
        <ul className={`absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-lg md:shadow-none p-6 md:p-0 rounded-lg ${isOpen ? "flex flex-col space-y-4" : "hidden"} md:flex md:flex-row md:space-x-6`}>
          {menuItems.map(({ name, icon: Icon }) => (
            <li key={name}>
              <Link
                href={`#${name.toLowerCase()}`}
                className={`flex items-center space-x-2 transition-colors duration-300 ${isScrolled ? "md:text-gray-900 hover:text-gray-700" : "md:text-white hover:text-gray-300"} text-gray-900 hover:text-gray-700 md:text-inherit`}
              >
                <Icon className="w-5 h-5" />
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}