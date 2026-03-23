import Link from "next/link";
import styles from "./site-footer.module.css";

export function SiteFooter({ network, bars }) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.frame}>
        <div className={styles.lead}>
          <div className={styles.leadCopy}>
            <p className={styles.kicker}>Барная сеть</p>
            <h2>{network.displayName}</h2>
            <p className={styles.summary}>
              Две точки, один характер и понятный финальный блок: адреса, часы
              работы, звонок и быстрый переход к каждой локации.
            </p>
          </div>

          <div className={styles.leadActions}>
            <a className={styles.primaryContact} href={`tel:${network.phoneE164}`}>
              {network.phoneDisplay}
            </a>

            <div className={styles.socials} aria-label="Соцсети сети">
              {network.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.locationsSection}>
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>Локации</p>
            <p className={styles.sectionHint}>
              У каждой точки свой адрес, карта и страница бара, но контакт
              остаётся общим и понятным.
            </p>
          </div>

          <div className={styles.locationsGrid}>
            {bars.map((bar) => (
              <article key={bar.slug} className={styles.locationEntry}>
                <div className={styles.locationTopline}>
                  <h3>{bar.shortLabel}</h3>
                  <Link href={`/bars/${bar.slug}`} className={styles.inlineLink}>
                    Страница бара
                  </Link>
                </div>

                <p className={styles.address}>{bar.addressLine}</p>

                <ul className={styles.hoursList}>
                  {bar.hours.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div className={styles.locationActions}>
                  <a href={bar.mapUrl} target="_blank" rel="noreferrer">
                    На карте
                  </a>
                  <a href={`tel:${bar.phoneE164}`}>Позвонить</a>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.bottomRow}>
          <p>{`© ${year} ${network.displayName}`}</p>
          <Link href="#page-top" className={styles.inlineLink}>
            Наверх
          </Link>
        </div>
      </div>
    </footer>
  );
}
