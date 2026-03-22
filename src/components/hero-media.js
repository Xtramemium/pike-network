"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./hero-media.module.css";

export function HeroMedia({
  media,
  children,
  priority = false,
  className = "",
  variant = "default",
}) {
  const [shouldUseVideo, setShouldUseVideo] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updatePreference = () => {
      setShouldUseVideo(!reducedMotionQuery.matches);
    };

    updatePreference();
    reducedMotionQuery.addEventListener("change", updatePreference);

    return () => {
      reducedMotionQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  const variantClassName =
    variant === "showcase"
      ? styles.showcase
      : variant === "immersive"
        ? styles.immersive
        : styles.defaultVariant;
  const heroClassName = [styles.hero, variantClassName, className]
    .filter(Boolean)
    .join(" ");
  const isShowcaseVideo =
    (variant === "showcase" || variant === "immersive") &&
    media.kind === "video" &&
    media.videoUrl;
  const showVideo =
    isShowcaseVideo || (media.kind === "video" && media.videoUrl && shouldUseVideo);
  const fallbackImageUrl = media.posterUrl || media.imageUrl;

  return (
    <section className={heroClassName} data-hero-section="true">
      <div className={styles.mediaLayer}>
        {showVideo ? (
          <video
            className={styles.video}
            autoPlay
            loop
            muted
            playsInline
            preload={isShowcaseVideo ? "auto" : "metadata"}
            poster={isShowcaseVideo ? undefined : media.posterUrl}
            src={media.videoUrl}
            disablePictureInPicture
            aria-hidden="true"
          />
        ) : fallbackImageUrl ? (
          <Image
            src={fallbackImageUrl}
            alt=""
            fill
            priority={priority}
            sizes="100vw"
            className={styles.image}
          />
        ) : null}
      </div>
      <div className={styles.scrim} />
      <div className={styles.content}>{children}</div>
    </section>
  );
}
