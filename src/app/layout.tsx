import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "L&H HomeLab",
  description: "I immerse myself in interesting things",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <GoogleAnalytics gaId="G-4QS4W9PF83" />
      </body>
    </html>
  );
}
