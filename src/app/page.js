import { HeroMedia } from "@/components/hero-media";
import { JsonLd } from "@/components/json-ld";
import { NetworkPointsSection } from "@/components/network-points";
import { SiteFooter } from "@/components/site-footer";
import { getSiteData } from "@/lib/content/get-site-data";
import { siteUrl } from "@/lib/site-url";
import styles from "./page.module.css";

function buildNetworkSchema(siteData) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteData.network.displayName,
    description: siteData.network.seo.description,
    url: siteUrl,
  };
}

export default async function HomePage() {
  const siteData = await getSiteData();
  const { network, bars } = siteData;

  return (
    <div id="page-top" className={styles.page}>
      <JsonLd data={buildNetworkSchema(siteData)} />

      <HeroMedia media={network.hero.media} priority variant="immersive">
        <div className={styles.heroInner}>
          <div className={styles.heroStage}>
            <div className={styles.heroCopy}>
              <h1>{network.hero.title}</h1>

              <div className={styles.actions}>
                <a className={styles.primaryAction} href="#bars">
                  Выбрать бар
                </a>
                <div className={styles.heroUtilityActions}>
                  <a
                    className={styles.secondaryAction}
                    href={network.mapSearchUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Все бары сети
                  </a>
                  <a
                    className={`${styles.secondaryAction} ${styles.phoneAction}`}
                    href={`tel:${network.phoneE164}`}
                  >
                    Позвонить
                  </a>
                </div>
              </div>

              <p className={styles.heroDescription}>{network.hero.description}</p>
            </div>
          </div>
        </div>
      </HeroMedia>

      <main className={styles.main}>
        <section id="bars" className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionKicker}>Точки сети</p>
            <h2>Сначала выберите свою локацию</h2>
            <p>Откройте нужный бар, чтобы посмотреть меню, события и контакты.</p>
          </div>
          <NetworkPointsSection bars={bars} />
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionKicker}>Во всех точках</p>
            <h2>Что вы найдете в каждой точке</h2>
            <p>Базовый сценарий везде один: матч, еда, напитки и быстрый контакт.</p>
          </div>
          <div className={styles.commonGrid}>
            {network.commonFormats.map((item) => (
              <article key={item.title} className={styles.commonCard}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter network={network} />
    </div>
  );
}
