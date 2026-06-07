import type { Service } from "@/types";
import BuildingIcon from "@/components/ui/icons/BuildingIcon";
import LockIcon from "@/components/ui/icons/LockIcon";
import DoorIcon from "@/components/ui/icons/DoorIcon";
import WindowIcon from "@/components/ui/icons/WindowIcon";
import { CDN } from "@/lib/cloudinary";

export const services: Service[] = [
  {
    id: "kitchens",
    title: "Kitchens",
    description: "Designed for daily use, built for long-term performance",
    image: CDN.services.kitchen,
    icon: BuildingIcon,
    category: "kitchen",
  },
  {
    id: "wardrobes",
    title: "Wardrobes & Closets",
    description: "Structured storage that stays organized over time",
    image: CDN.services.closet,
    icon: LockIcon,
    category: "closet",
  },
  {
    id: "doors",
    title: "Wooden Doors",
    description: "Precise finishes that hold up with everyday use",
    image: CDN.services.door,
    icon: DoorIcon,
    category: "door",
  },
  {
    id: "windows",
    title: "Premium Window Systems",
    description: "Sealed systems for better comfort and control",
    image: CDN.services.window,
    icon: WindowIcon,
    category: "upvc-windows",
  },
];
