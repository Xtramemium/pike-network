"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./age-gate.module.css";
import { AGE_GATE_SESSION_KEY, LEGAL_AGE } from "@/lib/age-gate";

const EXIT_DURATION_MS = 520;

function blockScroll(shouldBlock) {
  if (typeof document === "undefined") {
    return undefined;
  }

  const htmlOverflow = document.documentElement.style.overflow;
  const bodyOverflow = document.body.style.overflow;

  if (shouldBlock) {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }

  return () => {
    document.documentElement.style.overflow = htmlOverflow;
    document.body.style.overflow = bodyOverflow;
  };
}

export function AgeGate() {
  const [status, setStatus] = useState("checking");
  const exitTimeoutRef = useRef(null);

  useEffect(() => {
    const isSessionApproved = window.sessionStorage.getItem(AGE_GATE_SESSION_KEY);

    if (isSessionApproved === "verified") {
      document.documentElement.dataset.ageGate = "approved";
      setStatus("approved");
      return undefined;
    }

    delete document.documentElement.dataset.ageGate;
    setStatus("gate");

    return undefined;
  }, []);

  useEffect(() => {
    return () => {
      if (exitTimeoutRef.current) {
        window.clearTimeout(exitTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => blockScroll(status !== "approved"), [status]);

  if (status === "approved") {
    return null;
  }

  function handleConfirm() {
    if (status === "closing") {
      return;
    }

    window.sessionStorage.setItem(AGE_GATE_SESSION_KEY, "verified");
    setStatus("closing");

    exitTimeoutRef.current = window.setTimeout(() => {
      document.documentElement.dataset.ageGate = "approved";
      setStatus("approved");
    }, EXIT_DURATION_MS);
  }

  function handleExit() {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.replace("https://yandex.ru/");
  }

  return (
    <div
      className={`${styles.overlay} ${
        status === "closing" ? styles.overlayClosing : ""
      }`}
      data-age-gate-overlay="true"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
    >
      <div className={styles.backdrop} />
      <section className={styles.panel}>
        <p className={styles.kicker}>18+</p>
        <div className={styles.brand}>ЩУКА</div>
        <h1 id="age-gate-title" className={styles.title}>
          Добро пожаловать
        </h1>
        <p className={styles.description}>
          Сайт содержит информацию об алкогольной продукции и предназначен
          только для лиц старше {LEGAL_AGE} лет.
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primaryAction}
            onClick={handleConfirm}
          >
            Мне есть 18
          </button>
          <button
            type="button"
            className={styles.secondaryAction}
            onClick={handleExit}
          >
            Мне нет 18
          </button>
        </div>

        <p className={styles.footer}>Пожалуйста, употребляйте ответственно.</p>
      </section>
    </div>
  );
}
