"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { whatsappUrl } from "@/lib/site";
import { Icon } from "./Icons";

const navItems = [
  ["Home", "#home"], ["About Us", "#about"], ["Products", "#products"], ["Export", "#export"], ["Quality", "#quality"], ["Certifications", "#certifications"], ["Contact Us", "#contact"],
] as const;

type HeaderBusiness = { email: string; phones: readonly string[]; location: string; assets: { logo: string }; whatsapp: string };
export function Header({ business }: { business: HeaderBusiness }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return <header className="site-header">
    <div className="topbar"><div className="wrap topbar-inner"><a href={`mailto:${business.email}`}><Icon name="mail" size={15} />{business.email}</a><a href="tel:+919827642435"><Icon name="phone" size={15} />{business.phones[0]}</a><a className="topbar-second-phone" href="tel:+917489168059">{business.phones[1]}</a><span><Icon name="pin" size={15} />{business.location}</span></div></div>
    <div className="nav-shell"><div className="wrap nav"><Link href="#home" className="logo" onClick={close}><Image src={business.assets.logo} width={68} height={68} alt="SAMIRAQ GLOBAL logo" priority /><span><strong>SAMIRAQ</strong><small>GLOBAL</small></span></Link><nav className={open ? "nav-links open" : "nav-links"} aria-label="Primary navigation">{navItems.map(([label, href]) => <Link key={href} href={href} onClick={close}>{label}</Link>)}<a className="button button-small nav-mobile-cta" href="#inquiry" onClick={close}>Get a Quote</a></nav><div className="nav-actions"><a className="button button-small desktop-cta" href="#inquiry">Get a Quote</a><button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}><Icon name={open ? "close" : "menu"} /></button></div></div></div>
  </header>;
}
