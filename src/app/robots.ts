import type { MetadataRoute } from "next";
import { allowIndexing } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  if (allowIndexing) {
    return {
      rules: {
        userAgent: "*",
        allow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
