export type NavItem = {
  label: string;
  href: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  category: PortfolioCategory;
};

export type PortfolioCategory = "all" | "kitchen" | "door" | "closet" | "upvc-windows";

export type PortfolioItem = {
  id: string;
  src: string;
  alt: string;
  category: PortfolioCategory;
  span?: "tall" | "wide" | "normal";
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

export type Approach = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

export type DesignStep = {
  id: string;
  icon: string;
  label: string;
};

export type WhyItem = {
  id: string;
  text: string;
};

export type FooterSection = {
  heading: string;
  links: { label: string; href: string }[];
};
