import Link from "next/link";
import styles from "./site-footer.module.css";

export function SiteFooter({ network, bars }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandBlock}>
          <p className={styles.kicker}>Барная сеть</p>
          <h2>{network.displayName}</h2>
          <p className={styles.copy}>
            Основа уже готова под будущую CMS: общий бренд, отдельные страницы
            точек и URL-адресуемые медиа.
          </p>
          <a className={styles.phone} href={`tel:${network.phoneE164}`}>
            {network.phoneDisplay}
          </a>
        </div>

        <div className={styles.column}>
          <p className={styles.kicker}>Локации</p>
          <ul className={styles.list}>
            {bars.map((bar) => (
              <li key={bar.slug}>
                <Link href={`/bars/${bar.slug}`}>{bar.shortLabel}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <p className={styles.kicker}>Соцсети</p>
          <ul className={styles.list}>
            {network.socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noreferrer">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
