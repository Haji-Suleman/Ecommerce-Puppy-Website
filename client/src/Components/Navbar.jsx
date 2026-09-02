import { useState } from "react";
import "./Navbar.css";

import doglogo from "../assets/PuppyPad Logo.svg"
import arrow from "../assets/arrow.svg"
const NAV_LINKS = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Guarantee", href: "#guarantee" },
    { label: "FAQ", href: "#faq" },
    { label: "Reviews", href: "#reviews" },
];

export default function Navbar({ brand = "PuppyPad", ctaHref = "#product-section" }) {
    const [open, setOpen] = useState(false);

    return (
        <nav className={`pp-navbar-wrap ${open ? "pp-navbar--open" : ""}`}>
            <div className="pp-navbar">
                <a href="#top" className="pp-navbar__logo" aria-label={brand}>
                    <img src={doglogo} alt={brand} />
                </a>

                <ul className="pp-navbar__links">
                    {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                            <a href={link.href}>{link.label}</a>
                        </li>
                    ))}
                </ul>

                <a className="pp-navbar__cta" href={ctaHref}>
                    <span>Choose Bundle</span>
                    <span className="pp-navbar__cta-icon">
                        <img src={arrow} alt="" />
                    </span>
                </a>

                <button
                    className="pp-navbar__burger"
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                >

                </button>
            </div>

            <div className="pp-navbar__mobile-panel">
                {NAV_LINKS.map((link) => (
                    <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                        {link.label}
                    </a>
                ))}
            </div>
        </nav>
    );
}