"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import styles from "./bar-gallery.module.css";

export function BarGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stageMediaRef = useRef(null);

  function scrollToIndex(index, behavior = "smooth") {
    const stageMedia = stageMediaRef.current;

    if (!stageMedia) {
      return;
    }

    stageMedia.scrollTo({
      left: stageMedia.clientWidth * index,
      behavior,
    });
  }

  function goToIndex(index, behavior = "smooth") {
    setActiveIndex(index);
    scrollToIndex(index, behavior);
  }

  function showPrev() {
    const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    goToIndex(nextIndex);
  }

  function showNext() {
    const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    goToIndex(nextIndex);
  }

  function handleScroll(event) {
    const stageMedia = event.currentTarget;
    const slideWidth = stageMedia.clientWidth;

    if (!slideWidth) {
      return;
    }

    const nextIndex = Math.round(stageMedia.scrollLeft / slideWidth);

    if (nextIndex !== activeIndex) {
      setActiveIndex(nextIndex);
    }
  }

  return (
    <div className={styles.shell}>
      <div className={styles.stage}>
        <div
          ref={stageMediaRef}
          className={styles.stageMedia}
          onScroll={handleScroll}
        >
          {images.map((image, index) => (
            <div
              key={image.src}
              className={styles.stageSlide}
              aria-current={index === activeIndex ? "true" : "false"}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 759px) 100vw, (max-width: 1160px) 90vw, 1160px"
                className={styles.stageImage}
                priority={index < 2}
              />
            </div>
          ))}
        </div>

        <div className={styles.stageTopline}>
          <div className={styles.counter}>
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className={styles.counterDivider}>/</span>
            <span>{String(images.length).padStart(2, "0")}</span>
          </div>
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.navButton}
            onClick={showPrev}
            aria-label="Предыдущее фото"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className={styles.navButton}
            onClick={showNext}
            aria-label="Следующее фото"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div className={styles.thumbRail} aria-label="Навигация по галерее">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className={`${styles.thumbButton} ${index === activeIndex ? styles.thumbButtonActive : ""}`}
            onClick={() => goToIndex(index)}
            aria-label={`Открыть фото ${index + 1}`}
            aria-pressed={index === activeIndex}
          >
            <span className={styles.thumbIndex}>{String(index + 1).padStart(2, "0")}</span>
            <span className={styles.thumbPreview}>
              <Image
                src={image.src}
                alt=""
                fill
                sizes="120px"
                className={styles.thumbImage}
              />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
