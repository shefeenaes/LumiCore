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
    description: "Manufactured in-house. Installed with precision. One accountable team.",
    icon: <PrecisionIcon />,
  },
];

export function ApproachSection() {
  return (
    <section id="about" aria-label="The Ideal Factory Approach">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-0">
            {/* Left title */}
            <div className="lg:pe-10">
              <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                The Ideal Factory
                <br />
                Approach
              </h2>
            </div>

            {/* Right: 2×2 grid of approach items */}
            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {approaches.map((item, i) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex h-full flex-col gap-3 border-white/10 py-6 sm:border-e sm:px-6"
                >
                  <div className="text-primary">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-white">{item.description}</p>
                </motion.article>
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
    <svg width="33" height="30" viewBox="0 0 33 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.45834 10.0835C8.01266 10.0835 10.0833 8.01281 10.0833 5.4585C10.0833 2.90418 8.01266 0.833496 5.45834 0.833496C2.90403 0.833496 0.833344 2.90418 0.833344 5.4585C0.833344 8.01281 2.90403 10.0835 5.45834 10.0835Z"
        stroke="#57B7C0"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.25 5.4585H23.9583C24.7761 5.4585 25.5603 5.78335 26.1386 6.36158C26.7168 6.93982 27.0417 7.72408 27.0417 8.54183V19.3335"
        stroke="#57B7C0"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.875 10.0835L16.25 5.4585L20.875 0.833496"
        stroke="#57B7C0"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.0417 28.5835C29.596 28.5835 31.6667 26.5128 31.6667 23.9585C31.6667 21.4042 29.596 19.3335 27.0417 19.3335C24.4874 19.3335 22.4167 21.4042 22.4167 23.9585C22.4167 26.5128 24.4874 28.5835 27.0417 28.5835Z"
        stroke="#57B7C0"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.25 23.9585H8.54171C7.72396 23.9585 6.9397 23.6336 6.36146 23.0554C5.78322 22.4772 5.45837 21.6929 5.45837 20.8752V10.0835"
        stroke="#57B7C0"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.625 19.3335L16.25 23.9585L11.625 28.5835"
        stroke="#57B7C0"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CoordinatedDesignIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.2306 7.83359L10.2126 1.81562C9.58054 1.18661 8.72512 0.833496 7.83341 0.833496C6.9417 0.833496 6.08627 1.18661 5.45421 1.81562L1.81544 5.45439C1.18643 6.08645 0.833313 6.94188 0.833313 7.83359C0.833313 8.7253 1.18643 9.58073 1.81544 10.2128L7.83341 16.2308M9.23293 6.43406L12.032 3.63501M23.2282 20.4293L26.0273 17.6303M21.8287 13.4317L27.8466 19.4497C29.1622 20.7652 29.1622 22.8925 27.8466 24.2081L24.2079 27.8468C22.8923 29.1624 20.765 29.1624 19.4495 27.8468L13.4315 21.8289M19.0296 5.03453L24.6277 10.6326M27.6703 7.57048C28.4103 6.83072 28.826 5.82732 28.8262 4.78102C28.8263 3.73471 28.4108 2.73121 27.671 1.99126C26.9312 1.25132 25.9278 0.83555 24.8815 0.835419C23.8352 0.835288 22.8317 1.25081 22.0918 1.99056L3.4137 20.6729C3.08876 20.9968 2.84845 21.3958 2.71394 21.8345L0.865159 27.9252C0.828989 28.0462 0.826257 28.1748 0.857254 28.2973C0.88825 28.4197 0.951819 28.5315 1.04121 28.6208C1.13061 28.71 1.2425 28.7734 1.36501 28.8042C1.48752 28.835 1.61609 28.8321 1.73707 28.7957L7.82921 26.9483C8.2675 26.815 8.66637 26.5762 8.99082 26.2528L27.6703 7.57048Z"
        stroke="#57B7C0"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AfterSalesIcon() {
  return (
    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.4132 7.46835C20.1308 7.75654 19.9725 8.14398 19.9725 8.54752C19.9725 8.95106 20.1308 9.3385 20.4132 9.62669L22.8799 12.0934C23.1681 12.3758 23.5555 12.534 23.9591 12.534C24.3626 12.534 24.7501 12.3758 25.0382 12.0934L29.8266 7.30648C30.32 6.81006 31.1571 6.96731 31.3421 7.64256C31.8079 9.33666 31.7816 11.1284 31.2662 12.8081C30.7509 14.4877 29.7678 15.9859 28.432 17.1273C27.0963 18.2686 25.4631 19.0059 23.7236 19.253C21.9841 19.5 20.2102 19.2465 18.6095 18.5221L6.4149 30.7167C5.80158 31.3298 4.96983 31.6742 4.10262 31.674C3.23541 31.6739 2.40378 31.3292 1.79067 30.7159C1.17756 30.1026 0.833199 29.2708 0.833344 28.4036C0.833488 27.5364 1.17813 26.7048 1.79144 26.0917L13.986 13.8971C13.2617 12.2964 13.0082 10.5225 13.2552 8.78301C13.5022 7.04349 14.2395 5.41031 15.3809 4.07455C16.5222 2.7388 18.0204 1.75572 19.7001 1.24037C21.3797 0.725013 23.1715 0.698689 24.8656 1.16448C25.5408 1.34948 25.6981 2.18506 25.2032 2.68148L20.4132 7.46835Z"
        stroke="#57B7C0"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PrecisionIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.7083 20.8752H14.7237M20.875 20.8752H20.8904M8.54165 20.8752H8.55706M0.833313 25.5002C0.833313 26.3179 1.15816 27.1022 1.7364 27.6804C2.31464 28.2586 3.0989 28.5835 3.91665 28.5835H25.5C26.3177 28.5835 27.102 28.2586 27.6802 27.6804C28.2585 27.1022 28.5833 26.3179 28.5833 25.5002V9.31266C28.5835 9.17438 28.5464 9.0386 28.476 8.91956C28.4056 8.80052 28.3045 8.70261 28.1833 8.63608C28.0621 8.56955 27.9252 8.53686 27.787 8.54144C27.6488 8.54601 27.5143 8.58768 27.3978 8.66208L20.5189 13.0466C20.4023 13.121 20.2679 13.1626 20.1296 13.1672C19.9914 13.1718 19.8545 13.1391 19.7333 13.0726C19.6121 13.0061 19.511 12.9081 19.4406 12.7891C19.3702 12.6701 19.3332 12.5343 19.3333 12.396V9.31266C19.3335 9.17438 19.2964 9.0386 19.226 8.91956C19.1557 8.80052 19.0545 8.70261 18.9333 8.63608C18.8121 8.56955 18.6752 8.53686 18.537 8.54144C18.3988 8.54601 18.2643 8.58768 18.1478 8.66208L11.2704 13.0466C11.1538 13.1214 11.0192 13.1634 10.8808 13.1682C10.7423 13.173 10.6052 13.1403 10.4837 13.0738C10.3622 13.0072 10.2609 12.9091 10.1905 12.7898C10.12 12.6706 10.083 12.5345 10.0833 12.396V3.91683C10.0833 3.09908 9.75846 2.31482 9.18022 1.73658C8.60199 1.15835 7.81773 0.833496 6.99998 0.833496H3.91665C3.0989 0.833496 2.31464 1.15835 1.7364 1.73658C1.15816 2.31482 0.833313 3.09908 0.833313 3.91683V25.5002Z"
        stroke="#57B7C0"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
