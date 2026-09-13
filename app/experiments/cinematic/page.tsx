import CinematicJourney from "@/components/CinematicJourney";
import { pageMetadata } from "@/lib/seo";
export const metadata = {
  ...pageMetadata({
    title: "Cinematic Experiment — Raphael Martinez",
    description: "An optional image-sequence scroll experiment.",
    path: "/experiments/cinematic",
  }),
  robots: { index: false, follow: true },
};
export default function Experiment() {
  return <CinematicJourney />;
}
