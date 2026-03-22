import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroMedia } from "@/components/hero-media";
import { JsonLd } from "@/components/json-ld";
import { BarHeroNav } from "@/components/bar-hero-nav";
import { SiteFooter } from "@/components/site-footer";
import { getBarBySlug, getBars, getSiteData } from "@/lib/content/get-site-data";
import { siteUrl } from "@/lib/site-url";
import styles from "./page.module.css";

function formatHeroLocation(bar) {
  return bar.addressLine.replace(/^ул\.?\s*/i, "");
}

function formatHeroEyebrow(bar) {
  return `Бар · ${bar.city}`;
}

function buildBarSchema(bar) {
  return {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    name: `${bar.name} ${bar.locationLabel}`,
    description: bar.seo.description,
    telephone: bar.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: bar.addressLine,
      addressLocality: bar.city,
      addressCountry: "RU",
    },
    url: `${siteUrl}/bars/${bar.slug}`,
  };
}

export async function generateStaticParams() {
  const bars = await getBars();
  return bars.map((bar) => ({ slug: bar.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const bar = await getBarBySlug(slug);

  if (!bar) {
    return {
      title: "Бар не найден",
    };
  }

  return {
    title: bar.seo.title,
    description: bar.seo.description,
  };
}

export default async function BarPage({ params }) {
  const { slug } = await params;
  const [siteData, bar] = await Promise.all([getSiteData(), getBarBySlug(slug)]);

  if (!bar) {
    notFound();
  }

  const heroEyebrow = formatHeroEyebrow(bar);
  const heroLocation = formatHeroLocation(bar);

  return (
    <div className={styles.page}>
      <JsonLd data={buildBarSchema(bar)} />

      <HeroMedia media={bar.hero} priority variant="immersive">
        <div className={styles.heroInner}>
          <div className={styles.heroTopline}>
            <BarHeroNav
              phoneDisplay={bar.phoneDisplay}
              phoneE164={bar.phoneE164}
            />
          </div>

          <div className={styles.heroBrand}>
            <Image
              src={siteData.network.logoUrl}
              alt={siteData.network.displayName}
              fill
              sizes="84px"
              className={styles.heroBrandImage}
            />
          </div>

          <div className={styles.heroStage}>
            <div className={styles.heroCopy}>
            <p className={styles.kicker}>{heroEyebrow}</p>
            <h1>{bar.name.replace(/^Бар\s+/i, "")}</h1>
            <p className={styles.heroLocation}>{heroLocation}</p>

            <div className={styles.heroMeta}>
              {bar.hours.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className={styles.actions}>
              <a className={styles.primaryAction} href="#menu">
                Меню
              </a>
              <a className={styles.secondaryAction} href={`tel:${bar.phoneE164}`}>
                Позвонить
              </a>
            </div>
          </div>
          </div>
        </div>
      </HeroMedia>

      <main className={styles.main}>
        <section className={styles.section}>
          <div className={styles.overviewCard}>
            <div>
              <p className={styles.sectionKicker}>О точке</p>
              <h2>{bar.shortLabel}</h2>
              <p>{bar.summary}</p>
            </div>

            <ul className={styles.factsList}>
              <li>
                <span>Адрес</span>
                <strong>{bar.addressLine}</strong>
              </li>
              <li>
                <span>Телефон</span>
                <strong>{bar.phoneDisplay}</strong>
              </li>
              <li>
                <span>График</span>
                <strong>{bar.hours.join(" / ")}</strong>
              </li>
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.identityCard}>
            <div className={styles.sectionHeading}>
              <p className={styles.sectionKicker}>Почему идти сюда</p>
              <h2>Локальная подача у точки уже выражена отдельно</h2>
              <p>
                Это важный переход от старого single-bar сценария: теперь у
                каждой страницы есть своя интонация, свои преимущества и свой
                визуальный ритм.
              </p>
            </div>
            <div className={styles.identityGrid}>
              {bar.features.map((feature) => (
                <article key={feature} className={styles.identityItem}>
                  <span>Локально</span>
                  <strong>{feature}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.bestForCard}>
            <div className={styles.sectionHeading}>
              <p className={styles.sectionKicker}>Сценарии</p>
              <h2>Для чего подходит именно эта точка</h2>
            </div>
            <ul className={styles.bestForList}>
              {bar.bestFor.map((item) => (
                <li key={item} className={styles.bestForItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="menu" className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionKicker}>Меню</p>
            <h2>Структура уже готова под заменяемые разделы и PDF</h2>
          </div>
          <div className={styles.cardGrid}>
            {bar.menuLinks.map((item) => (
              <article key={item.title} className={styles.infoCard}>
                <p className={styles.infoCardStatus}>{item.status}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noreferrer">
                    Открыть
                  </a>
                ) : (
                  <span className={styles.placeholderLink}>Скоро подключим ссылку</span>
                )}
              </article>
            ))}
          </div>
          <div className={styles.previewChips}>
            {bar.menuPreview.map((preview) => (
              <span key={preview.name} className={styles.previewChip}>
                <strong>{preview.name}</strong>
                <em>{preview.note}</em>
              </span>
            ))}
          </div>
        </section>

        <section id="events" className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionKicker}>События</p>
            <h2>У каждой точки свой собственный контентный сценарий</h2>
          </div>
          <div className={styles.cardGrid}>
            {bar.events.map((event) => (
              <article key={event.title} className={styles.infoCard}>
                <p className={styles.infoCardStatus}>Локально для точки</p>
                <p className={styles.eventTiming}>{event.timing}</p>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="gallery" className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionKicker}>Галерея</p>
            <h2>Визуальная атмосфера бара</h2>
          </div>
          <div className={styles.galleryGrid}>
            {bar.gallery.map((image, index) => (
              <figure key={image.src} className={styles.galleryItem}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  className={styles.galleryImage}
                  priority={index < 2}
                />
              </figure>
            ))}
          </div>
        </section>

        <section
          id="contacts"
          className={`${styles.section} ${styles.contactsSection}`}
        >
          <div className={styles.contactsCard}>
            <div>
              <p className={styles.sectionKicker}>Контакты</p>
              <h2>Простая логика записи: пока только звонок</h2>
              <p className={styles.contactsCopy}>
                На этом этапе оставляем самый понятный сценарий: телефон, адрес
                и переход на карту. Формы и бронирование можно добавить позже
                отдельным этапом.
              </p>
            </div>

            <div className={styles.contactsGrid}>
              <article className={styles.contactTile}>
                <span>Адрес</span>
                <strong>{bar.addressLine}</strong>
                <a href={bar.mapUrl} target="_blank" rel="noreferrer">
                  Открыть на карте
                </a>
              </article>
              <article className={styles.contactTile}>
                <span>Телефон</span>
                <strong>{bar.phoneDisplay}</strong>
                <a href={`tel:${bar.phoneE164}`}>Позвонить</a>
              </article>
              <article className={styles.contactTile}>
                <span>Часы работы</span>
                <strong>{bar.hours[0]}</strong>
                <strong>{bar.hours[1]}</strong>
              </article>
              <article className={styles.contactTile}>
                <span>Соцсети</span>
                <div className={styles.socialLinks}>
                  {bar.socialLinks.map((social) => (
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
              </article>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter network={siteData.network} bars={siteData.bars} />
    </div>
  );
}
