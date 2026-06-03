"use client";

import { motion } from "framer-motion";

type ApproachItem = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const approaches: ApproachItem[] = [
  {
    id: "multiple-systems",
    title: "Multiple Interior Systems",
    description:
      "One Factory. Kitchens, wardrobes, doors, and premium window systems—manufactured together in one facility for coordinated villa interiors.",
    icon: <MultipleSystemsIcon />,
  },
  {
    id: "coordinated-design",
    title: "Coordinated Design",
    description:
      "Our designers ensure that kitchens, closets, doors, & window systems complement each other in style & proportion.",
    icon: <CoordinatedDesignIcon />,
  },
  {
    id: "after-sales",
    title: "After-Sales Support & Maintenance",
    description:
      "Our team installs every product with precision to ensure the final result reflects the original design.",
    icon: <AfterSalesIcon />,
  },
  {
    id: "precision-manufacturing",
    title: "Precision Manufacturing & Installation",
    description:
      "Manufactured in-house. Installed with precision. One accountable team.",
    icon: <PrecisionIcon />,
  },
];

export function ApproachSection() {
  return (
    <section
      className="bg-[#111] px-4 pb-20 sm:px-6 lg:px-8"
      id="about"
      aria-label="The Ideal Factory Approach"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-brand-dark-card p-8 sm:p-10"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left title */}
            <div className="flex items-start lg:items-center">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                The Ideal Factory Approach
              </h2>
            </div>

            {/* Right: 2×2 grid of approach items */}
            <div className="grid grid-cols-1 gap-6 border-l border-white/10 pl-8 sm:grid-cols-2 lg:col-span-2">
              {approaches.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`flex flex-col gap-3 ${
                    i % 2 === 1 ? "border-l border-white/10 pl-6" : ""
                  }`}
                >
                  <div className="text-brand-teal">{item.icon}</div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MultipleSystemsIcon() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path d="M6 3v6m6-6v6m6-6v6" strokeLinecap="round" />
      <path d="M3 9h18" strokeLinecap="round" />
      <path d="M5 9v12h14V9" />
      <path d="M10 13h4v8h-4z" />
    </svg>
  );
}

function CoordinatedDesignIcon() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path d="M12 3l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" strokeLinejoin="round" />
    </svg>
  );
}

function AfterSalesIcon() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PrecisionIcon() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinejoin="round" />
      <polyline points="9 22 9 12 15 12 15 22" strokeLinejoin="round" />
    </svg>
  );
}
