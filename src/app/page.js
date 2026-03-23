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
              <p className={styles.heroSubtitle}>{network.hero.subtitle}</p>
              <p className={styles.heroDescription}>{network.hero.description}</p>

              <div className={styles.actions}>
                <a className={styles.primaryAction} href="#bars">
                  Выбрать бар
                </a>
                <a
                  className={styles.secondaryAction}
                  href={`tel:${network.phoneE164}`}
                >
                  Позвонить
                </a>
              </div>
            </div>
          </div>
        </div>
      </HeroMedia>

      <main className={styles.main}>
        <section id="bars" className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionKicker}>Точки сети</p>
            <h2>Сначала выберите свою локацию, затем переходите внутрь бара</h2>
            <p>
              Блок работает как понятный навигатор по сети: пользователь сразу
              видит все доступные бары и понимает, что именно у него есть на
              выбор.
            </p>
          </div>
          <NetworkPointsSection bars={bars} />
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionKicker}>Платформа</p>
            <h2>Что уже закладываем в архитектуру сети</h2>
            <p>
              Мы не пытаемся натянуть один лендинг на две точки. Здесь уже
              разведены роли главной страницы и локальных страниц баров.
            </p>
          </div>
          <div className={styles.pillarGrid}>
            {network.pillars.map((pillar) => (
              <article key={pillar.title} className={styles.pillarCard}>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionKicker}>Во всех точках</p>
            <h2>Общий сценарий сети, который не теряется между локациями</h2>
            <p>
              Даже когда страницы точек отличаются по контенту, пользователь
              всё равно должен узнавать единый бренд и базовый опыт Щуки.
            </p>
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

        <section id="call" className={`${styles.section} ${styles.ctaSection}`}>
          <div className={styles.ctaCard}>
            <div>
              <p className={styles.sectionKicker}>Общий CTA</p>
              <h2>{network.cta.title}</h2>
              <p>{network.cta.description}</p>
            </div>
            <div className={styles.ctaActions}>
              <a className={styles.primaryAction} href={`tel:${network.phoneE164}`}>
                {network.phoneDisplay}
              </a>
              <a className={styles.secondaryAction} href="#bars">
                Перейти к выбору бара
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter network={network} bars={bars} />
    </div>
  );
}
