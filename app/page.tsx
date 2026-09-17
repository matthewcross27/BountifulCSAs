import { LandingPage } from "@/components/landing/LandingPage";
import { parseDirection } from "@/components/landing/directions";

// `searchParams` is only read for the TEMPORARY visual-direction explorer.
// Removing the explorer means removing this prop and the parse call with it.
export default async function Home({ searchParams }: PageProps<"/">) {
  const { ui } = await searchParams;
  return <LandingPage direction={parseDirection(ui)} />;
}
