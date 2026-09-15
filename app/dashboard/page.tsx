import { Suspense } from "react";
import type { Metadata } from "next";
import { DashboardApp } from "@/components/dashboard/DashboardApp";

export const metadata: Metadata = {
  title: "Farmer dashboard",
  description: "The farmer's side of Bountiful: this week's box, the roster, and payments.",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardApp />
    </Suspense>
  );
}
