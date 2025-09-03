import { Outfit, Ovo } from "next/font/google";

export const ovo = Ovo({
  subsets: ["latin"],
  weight: ["400"],
});

export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});