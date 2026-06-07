import type { PortfolioItem } from "@/types";
import { CDN } from "@/lib/cloudinary";

export const portfolioItems: PortfolioItem[] = [
  {
    id: "p1",
    src: CDN.portfolio.p1,
    alt: "Modern luxury kitchen with wood cabinets and marble island",
    category: "kitchen",
    span: "feature",
  },
  {
    id: "p2",
    src: CDN.portfolio.p2,
    alt: "White uPVC windows and doors installation",
    category: "upvc-windows",
    span: "normal",
  },
  {
    id: "p3",
    src: CDN.portfolio.p3,
    alt: "Grey minimalist kitchen with island",
    category: "kitchen",
    span: "normal",
  },
  {
    id: "p4",
    src: CDN.portfolio.p4,
    alt: "Bright contemporary living room with luxury finishes",
    category: "all",
    span: "wide",
  },
  {
    id: "p5",
    src: CDN.portfolio.p5,
    alt: "Custom walk-in wardrobe with integrated lighting",
    category: "closet",
    span: "wide",
  },
  {
    id: "p6",
    src: CDN.portfolio.p6,
    alt: "Classic arched wooden door with ornate detail",
    category: "door",
    span: "normal",
  },
  {
    id: "p7",
    src: CDN.portfolio.p7,
    alt: "Luxury wooden panelled door entry",
    category: "door",
    span: "normal",
  },
];
