"use client";

import Link from "next/link";
import styles from "./network-points.module.css";

const DESKTOP_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

function supportsDesktopPointer() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia(DESKTOP_POINTER_QUERY).matches
  );
}

function updatePointerDepth(event) {
  if (event.pointerType && event.pointerType !== "mouse") {
    return;
  }

  if (!supportsDesktopPointer()) {
    return;
  }

  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const ratioX = x / rect.width - 0.5;
  const ratioY = y / rect.height - 0.5;

  card.style.setProperty("--press-x", `${x}px`);
  card.style.setProperty("--press-y", `${y}px`);
  card.style.setProperty("--press-rotate-x", `${(-ratioY * 6.8).toFixed(2)}deg`);
  card.style.setProperty("--press-rotate-y", `${(ratioX * 8.4).toFixed(2)}deg`);
}

function resetPointerDepth(event) {
  const card = event.currentTarget;

  card.style.setProperty("--press-x", "50%");
  card.style.setProperty("--press-y", "50%");
  card.style.setProperty("--press-rotate-x", "0deg");
  card.style.setProperty("--press-rotate-y", "0deg");
}

export function NetworkPointsSection({ bars }) {
  const barsCountLabel =
    bars.length === 1
      ? "1 локация"
      : bars.length < 5
        ? `${bars.length} локации`
        : `${bars.length} локаций`;

  return (
    <div className={styles.pointsShell}>
      <div className={styles.pointsHeader}>
        <p className={styles.pointsKicker}>Выбор бара</p>
        <div className={styles.pointsMeta}>
          <span className={styles.pointsCount}>{barsCountLabel}</span>
          <p className={styles.pointsHint}>Выберите точку и откройте страницу бара.</p>
        </div>
      </div>

      <div className={styles.pointsRail} aria-label="Точки сети">
        {bars.map((bar, index) => (
          <Link
            key={bar.slug}
            href={`/bars/${bar.slug}`}
            className={styles.pointOption}
            onPointerMove={updatePointerDepth}
            onPointerLeave={resetPointerDepth}
          >
            <span className={styles.pointOptionTopline}>
              <span className={styles.pointOptionIndex}>Бар {String(index + 1).padStart(2, "0")}</span>
              <span className={styles.pointOptionCta}>Открыть</span>
            </span>
            <span className={styles.pointOptionName}>{bar.shortLabel}</span>
            <span className={styles.pointOptionAddress}>{bar.addressLine}</span>
            <span className={styles.pointOptionMeta}>Меню, события и контакты</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
