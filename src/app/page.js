import Image from "next/image";
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
    <div className={styles.page}>
      <JsonLd data={buildNetworkSchema(siteData)} />

      <HeroMedia media={network.hero.media} priority variant="immersive">
        <div className={styles.heroInner}>
          <div className={styles.heroBrand}>
            <Image
              src={network.logoUrl}
              alt="Р›РѕРіРѕС‚РёРї СЃРµС‚Рё Р‘Р°СЂ Р©СѓРєР°"
              fill
              sizes="108px"
              className={styles.heroBrandImage}
            />
          </div>

          <div className={styles.heroStage}>
            <div className={styles.heroCopy}>
            <div className={styles.logoWrap}>
              <Image
                src={network.logoUrl}
                alt="Логотип сети Бар Щука"
                fill
                sizes="108px"
                className={styles.logo}
              />
            </div>
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

        <section className={styles.section}>
          <div className={styles.journeyWrap}>
            <div className={styles.sectionHeading}>
              <p className={styles.sectionKicker}>Сценарий</p>
              <h2>Как пользователь двигается по сети</h2>
            </div>
            <ol className={styles.journeyList}>
              {network.journey.map((step) => (
                <li key={step} className={styles.journeyItem}>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionKicker}>FAQ</p>
            <h2>Коротко отвечаем на базовые вопросы о сети</h2>
          </div>
          <div className={styles.faqGrid}>
            {network.faq.map((item) => (
              <article key={item.question} className={styles.faqCard}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
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
