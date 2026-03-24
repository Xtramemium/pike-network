"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./bar-hero-nav.module.css";

export function BarHeroNav({ phoneDisplay, phoneE164 }) {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { href: "#menu", label: "Меню" },
    { href: "#gallery", label: "Галерея" },
    { href: "#contacts", label: "Контакты" },
  ];

  useEffect(() => {
    if (!isOpen) {
      document.body.style.removeProperty("overflow");
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.removeProperty("overflow");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen((current) => !current);
  };

  return (
    <>
      <div className={styles.desktopRow}>
        <Link href="/" className={styles.backLink}>
          Ко всей сети
        </Link>

        <nav className={styles.desktopNav} aria-label="Разделы страницы бара">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className={styles.phoneInline} href={`tel:${phoneE164}`}>
          {phoneDisplay}
        </a>
      </div>

      <div className={styles.mobileRow}>
        <Link href="/" className={styles.backLink}>
          Ко всей сети
        </Link>

        <button
          type="button"
          className={styles.menuToggle}
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-controls="bar-mobile-nav"
          aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        className={`${styles.mobileOverlay} ${isOpen ? styles.mobileOverlayOpen : ""}`}
        onClick={closeMenu}
        aria-hidden={!isOpen}
      />

      <aside
        id="bar-mobile-nav"
        className={`${styles.mobilePanel} ${isOpen ? styles.mobilePanelOpen : ""}`}
      >
        <div className={styles.mobileHeader}>
          <p>Навигация</p>
          <button
            type="button"
            className={styles.closeButton}
            onClick={closeMenu}
            aria-label="Закрыть меню"
          >
            ×
          </button>
        </div>

        <div className={styles.mobileBody}>
          <nav className={styles.mobileNav} aria-label="Мобильная навигация по бару">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={styles.mobileNavItem}
              >
                <span className={styles.mobileNavIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.mobileNavLabel}>{item.label}</span>
              </a>
            ))}
          </nav>

          <a className={styles.mobilePhone} href={`tel:${phoneE164}`} onClick={closeMenu}>
            <span className={styles.mobilePhoneLabel}>Бронь и контакт</span>
            <span className={styles.mobilePhoneValue}>{phoneDisplay}</span>
          </a>
        </div>
      </aside>
    </>
  );
}
