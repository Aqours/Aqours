import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: [
        "/assets/alipay.jpg",
        "/assets/wechat-pay.jpg",
        "/magic/",
        "/blackboard/",
        "/laboratory/",
      ],
    },
  };
}
