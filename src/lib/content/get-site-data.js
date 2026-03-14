import { mockSiteData } from "./mock-site-data";

export async function getSiteData() {
  return mockSiteData;
}

export async function getBars() {
  return mockSiteData.bars;
}

export async function getBarBySlug(slug) {
  return mockSiteData.bars.find((bar) => bar.slug === slug) ?? null;
}
