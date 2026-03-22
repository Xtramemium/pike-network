import Link from "next/link";
import styles from "./network-points.module.css";

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
          <p className={styles.pointsHint}>
            Выберите удобную локацию и переходите сразу на страницу бара.
          </p>
        </div>
      </div>

      <div className={styles.pointsRail} aria-label="Точки сети">
        {bars.map((bar, index) => (
          <Link
            key={bar.slug}
            href={`/bars/${bar.slug}`}
            className={styles.pointOption}
          >
            <span className={styles.pointOptionTopline}>
              <span className={styles.pointOptionIndex}>Бар {String(index + 1).padStart(2, "0")}</span>
              <span className={styles.pointOptionCta}>Открыть</span>
            </span>
            <span className={styles.pointOptionName}>{bar.shortLabel}</span>
            <span className={styles.pointOptionAddress}>{bar.addressLine}</span>
            <span className={styles.pointOptionMeta}>Страница бара, меню, события и контакты</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
