"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./bar-hero-nav.module.css";

export function BarHeroNav({ phoneDisplay, phoneE164 }) {
  const [isOpen, setIsOpen] = useState(false);

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
          <a href="#menu">Меню</a>
          <a href="#events">События</a>
          <a href="#gallery">Галерея</a>
          <a href="#contacts">Контакты</a>
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

        <nav className={styles.mobileNav} aria-label="Мобильная навигация по бару">
          <a href="#menu" onClick={closeMenu}>
            Меню
          </a>
          <a href="#events" onClick={closeMenu}>
            События
          </a>
          <a href="#gallery" onClick={closeMenu}>
            Галерея
          </a>
          <a href="#contacts" onClick={closeMenu}>
            Контакты
          </a>
        </nav>

        <a className={styles.mobilePhone} href={`tel:${phoneE164}`} onClick={closeMenu}>
          {phoneDisplay}
        </a>
      </aside>
    </>
  );
}
