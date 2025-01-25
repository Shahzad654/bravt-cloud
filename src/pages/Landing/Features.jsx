import { MdSecurity } from "react-icons/md";
import { TbSettingsAutomation } from "react-icons/tb";
import { PiChartLineUpBold } from "react-icons/pi";
import {
  TbServerBolt,
  TbCurrencyDollar,
  TbChartArcs,
  TbHeadset,
  TbBolt,
} from "react-icons/tb";

import { cn } from "../../utils/helpers";
import { BlurFade } from "./BlurFade";

const features = [
  {
    title: "Instant VM Deployment",
    description:
      "Deploy virtual machines in seconds with just a few clicks. No waiting, no hassle.",
    icon: TbServerBolt,
  },
  {
    title: "Pay-As-You-Use Pricing",
    description:
      "Only pay for what you use. Our credit-based system ensures you never overpay.",
    icon: TbCurrencyDollar,
  },
  {
    title: "Real-Time Monitoring",
    description:
      "Monitor your server performance in real-time with detailed analytics and insights.",
    icon: TbChartArcs,
  },
  {
    title: "Enterprise-Grade Security",
    description:
      "Protect your data and applications with advanced security features and encryption.",
    icon: MdSecurity,
  },
  {
    title: "Auto-Scaling",
    description:
      "Automatically scale your resources up or down based on demand, ensuring optimal performance.",
    icon: PiChartLineUpBold,
  },
  {
    title: "24/7 Expert Support",
    description:
      "Get round-the-clock support from our team of experts to resolve issues quickly.",
    icon: TbHeadset,
  },
  {
    title: "Customizable Configurations",
    description:
      "Tailor your server settings to meet your specific needs with flexible configuration options.",
    icon: TbSettingsAutomation,
  },
  {
    title: "Blazing Fast Performance",
    description:
      "Experience lightning-fast server performance with our optimized infrastructure.",
    icon: TbBolt,
  },
];

const Features = () => {
  return (
    <section
      id="product"
      className="container flex flex-col items-center mt-20"
    >
      <BlurFade
        delay={0.25}
        className="text-4xl font-bold text-center drop-shadow-xl sm:text-5xl lg:text-7xl xl:text-8xl lg:leading-normal xl:leading-normal"
      >
        Enterprise-Grade Infrastructure
      </BlurFade>

      <BlurFade
        delay={0.5}
        className="max-w-lg mt-6 font-medium text-center text-zinc-500 sm:text-lg lg:text-xl"
      >
        Deploy and scale virtual machines effortlessly with a platform built for
        reliability and performance.
      </BlurFade>

      <div className="grid grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4 relative z-10 mt-8">
        {features.map((feature, index) => (
          <Feature key={feature.title} index={index} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default Features;

const Feature = ({ title, description, icon: Icon, index }) => {
  return (
    <BlurFade
      delay={(index + 1) * 0.25}
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature",
        (index === 0 || index === 4) && "lg:border-l",
        index < 4 && "lg:border-b"
      )}
    >
      {index < 4 && (
        <div className="absolute inset-0 w-full h-full transition duration-200 opacity-0 pointer-events-none group-hover/feature:!opacity-100 bg-gradient-to-t from-neutral-100 to-transparent" />
      )}
      {index >= 4 && (
        <div className="absolute inset-0 w-full h-full transition duration-200 opacity-0 pointer-events-none group-hover/feature:!opacity-100 bg-gradient-to-b from-neutral-100 to-transparent" />
      )}
      <div className="relative z-10 px-10 mb-4 text-neutral-600 group-hover/feature:text-primary">
        <Icon size={28} />
      </div>
      <div className="relative z-10 px-10 mb-2 text-lg font-bold">
        <div className="absolute inset-y-0 left-0 w-1 h-6 transition-all duration-200 origin-center rounded-tr-full rounded-br-full group-hover/feature:h-8 bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500" />
        <span className="inline-block transition duration-200 group-hover/feature:translate-x-2 text-neutral-800">
          {title}
        </span>
      </div>
      <p className="relative z-10 max-w-xs px-10 text-sm text-neutral-600">
        {description}
      </p>
    </BlurFade>
  );
};
