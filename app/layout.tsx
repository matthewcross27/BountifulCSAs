import type { Metadata } from "next";
import { Bricolage_Grotesque, Karla, Caveat, DM_Mono } from "next/font/google";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const karla = Karla({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const TITLE = "Bountiful - CSA software for regenerative farms";
const DESCRIPTION =
  "Bountiful runs the business side of your CSA - signups, recurring payments, a season forecast you can plant against, and the weekly note to members - so you spend those hours in the field instead. Join the waitlist for the 2026 season.";

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: "%s - Bountiful",
  },
  description: DESCRIPTION,
  applicationName: "Bountiful",
  openGraph: {
    type: "website",
    siteName: "Bountiful",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolageGrotesque.variable} ${karla.variable} ${caveat.variable} ${dmMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
