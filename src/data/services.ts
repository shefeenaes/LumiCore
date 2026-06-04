import type { Service } from "@/types";
import BuildingIcon from "@/components/ui/icons/BuildingIcon";
import LockIcon from "@/components/ui/icons/LockIcon";
import DoorIcon from "@/components/ui/icons/DoorIcon";
import WindowIcon from "@/components/ui/icons/WindowIcon";

export const services: Service[] = [
  {
    id: "kitchens",
    title: "Kitchens",
    description: "Designed for daily use, built for long-term performance",
    image: "/images/services/kitchen.png",
    icon: BuildingIcon,
    category: "kitchen",
  },
  {
    id: "wardrobes",
    title: "Wardrobes & Closets",
    description: "Structured storage that stays organized over time",
    image: "/images/services/closet.png",
    icon: LockIcon,
    category: "closet",
  },
  {
    id: "doors",
    title: "Wooden Doors",
    description: "Precise finishes that hold up with everyday use",
    image: "/images/services/door.png",
    icon: DoorIcon,
    category: "door",
  },
  {
    id: "windows",
    title: "Premium Window Systems",
    description: "Sealed systems for better comfort and control",
    image: "/images/services/window.jpg",
    icon: WindowIcon,
    category: "upvc-windows",
  },
];
