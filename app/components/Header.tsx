"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed w-full transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}`}
    >
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1
          className={`text-2xl font-bold transition-colors duration-300 ${isScrolled ? "text-gray-900" : "text-white"}`}
        >
          Fadi Kurdahi
        </h1>
        <ul className="flex space-x-4 md:space-x-6">
          {["About", "Education", "Awards", "Research", "Publications", "Media", "Contact"].map((item) => (
            <li key={item}>
              <Link
                href={`#${item.toLowerCase()}`}
                className={`transition-colors duration-300 ${isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-200 hover:text-white"}`}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

