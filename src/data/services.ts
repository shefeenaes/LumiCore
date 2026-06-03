import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "kitchens",
    title: "Kitchens",
    description: "Designed for daily use, built for long-term performance",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop&q=80",
    icon: "building",
    category: "kitchen",
  },
  {
    id: "wardrobes",
    title: "Wardrobes & Closets",
    description: "Structured storage that stays organized over time",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80",
    icon: "lock",
    category: "closet",
  },
  {
    id: "doors",
    title: "Wooden Doors",
    description: "Precise finishes that hold up with everyday use",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&auto=format&fit=crop&q=80",
    icon: "door",
    category: "door",
  },
  {
    id: "windows",
    title: "Premium Window Systems",
    description: "Sealed systems for better comfort and control",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80",
    icon: "window",
    category: "upvc-windows",
  },
];
