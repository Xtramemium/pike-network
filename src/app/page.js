import Image from "next/image";
import Link from "next/link";
import { HeroMedia } from "@/components/hero-media";
import { JsonLd } from "@/components/json-ld";
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

      <HeroMedia media={network.hero.media} priority variant="showcase">
        <div className={styles.heroInner}>
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
      </HeroMedia>

      <main className={styles.main}>
        <section id="bars" className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionKicker}>Точки сети</p>
            <h2>Выберите нужную точку и переходите сразу к её странице</h2>
            <p>
              Каталог локаций вынесен в отдельную секцию, чтобы главный экран
              оставался простым, а список баров можно было спокойно расширять
              без перегрузки интерфейса.
            </p>
          </div>

          <div className={styles.cardGrid}>
            {bars.map((bar, index) => (
              <article key={bar.slug} className={styles.barCard}>
                <div className={styles.cardMedia}>
                  <Image
                    src={bar.hero.imageUrl}
                    alt={bar.shortLabel}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    className={styles.cardImage}
                  />
                  <div className={styles.cardMediaScrim} />
                  <p className={styles.cardMediaLabel}>{bar.locationLabel}</p>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardTopline}>
                    <p className={styles.cardEyebrow}>{bar.name}</p>
                    <span className={styles.cardNumber}>
                      0{index + 1}
                    </span>
                  </div>
                  <h3>{bar.shortLabel}</h3>
                  <p className={styles.cardAddress}>{bar.addressLine}</p>
                  <p className={styles.cardSummary}>{bar.summary}</p>
                  <ul className={styles.cardTags}>
                    <li>Свои события</li>
                    <li>Локальное меню</li>
                    <li>Отдельная страница</li>
                  </ul>
                  <Link href={`/bars/${bar.slug}`} className={styles.cardLink}>
                    Открыть страницу бара
                  </Link>
                </div>
              </article>
            ))}
          </div>
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
