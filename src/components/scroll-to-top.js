"use client";

import { useEffect, useState } from "react";
import styles from "./scroll-to-top.module.css";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const heroSection = document.querySelector("[data-hero-section='true']");
      const threshold = heroSection
        ? Math.max(heroSection.getBoundingClientRect().height - 120, 160)
        : window.innerHeight * 0.9;

      setIsVisible(window.scrollY > threshold);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  function handleClick() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <button
      type="button"
      className={`${styles.button} ${isVisible ? styles.visible : ""}`}
      onClick={handleClick}
      aria-label="Наверх"
    >
      <span className={styles.icon} aria-hidden="true">
        ↑
      </span>
    </button>
  );
}
