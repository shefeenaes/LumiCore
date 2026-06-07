const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "dtqevpvs4";
const BASE = `https://res.cloudinary.com/${CLOUD}`;

export const cldImg = (id: string, t = "f_auto,q_auto") => `${BASE}/image/upload/${t}/${id}`;

export const cldVideo = (id: string, t = "vc_auto,q_auto") => `${BASE}/video/upload/${t}/${id}`;

// All project assets — import CDN.xxx wherever you'd use a local /images/ path
export const CDN = {
  logo: cldImg("lumicore/brand/logo"),
  logoIcon: cldImg("lumicore/brand/logo-icon"),
  marbleBg: cldImg("lumicore/interior/marble-bg"),
  villaReveal: cldImg("lumicore/interior/villa-reveal"),
  footerBg: cldImg("lumicore/layout/footer-bg"),
  designCtaBg: cldImg("lumicore/design-cta/bg"),
  videoPoster: cldImg("lumicore/problem/video-poster"),
  customerJourney: cldVideo("lumicore/problem/customer-journey"),
  bgVideo: cldVideo("lumicore/hero/bg-video"),
  villa3d: cldImg("lumicore/why-choose/villa-3d"),
  portfolio: {
    p1: cldImg("lumicore/portfolio/project-01"),
    p2: cldImg("lumicore/portfolio/project-02"),
    p3: cldImg("lumicore/portfolio/project-03"),
    p4: cldImg("lumicore/portfolio/project-04"),
    p5: cldImg("lumicore/portfolio/project-05"),
    p6: cldImg("lumicore/portfolio/project-06"),
    p7: cldImg("lumicore/portfolio/project-07"),
    sectionBg: cldImg("lumicore/portfolio/section-bg"),
  },
  services: {
    kitchen: cldImg("lumicore/services/kitchen"),
    closet: cldImg("lumicore/services/closet"),
    door: cldImg("lumicore/services/door"),
    window: cldImg("lumicore/services/window"),
  },
} as const;
