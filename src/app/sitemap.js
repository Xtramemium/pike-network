import { getBars } from "@/lib/content/get-site-data";
import { siteUrl } from "@/lib/site-url";

export default async function sitemap() {
  const bars = await getBars();

  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...bars.map((bar) => ({
      url: `${siteUrl}/bars/${bar.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
    })),
  ];
}
