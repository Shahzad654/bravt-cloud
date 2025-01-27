import { TbServerBolt } from "react-icons/tb";
import { LuZap } from "react-icons/lu";
import { useGetPlansQuery } from "../../redux/apis/instances";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useGetSessionQuery } from "../../redux/apis/auth";
import { BlurFade } from "./BlurFade";

const Pricing = () => {
  const { data: user } = useGetSessionQuery();
  const { data, isLoading } = useGetPlansQuery("atl");
  const plans = useMemo(() => data?.slice(0, 3), [data]);

  return (
    <section
      id="pricing"
      className="container flex flex-col items-center mt-12"
    >
      <BlurFade
        delay={0.25}
        className="text-4xl font-bold text-center drop-shadow-xl sm:text-5xl lg:text-7xl xl:text-8xl lg:leading-normal xl:leading-normal"
      >
        Pay as you use
      </BlurFade>

      <BlurFade
        delay={0.5}
        className="max-w-lg mt-6 font-medium text-center text-zinc-500 sm:text-lg lg:text-xl"
      >
        Deploy powerful VMs instantly. Pay only for what you use, with our
        simple credit system.
      </BlurFade>

      <div className="container grid grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 gap-10 mx-auto mt-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="relative overflow-hidden border shadow-xl border-zinc-100 bg-gradient-to-b from-white to-zinc-50 rounded-3xl animate-pulse"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-32 h-8 rounded-lg bg-zinc-200" />
                    <div className="w-10 h-10 rounded-lg bg-zinc-200" />
                  </div>
                  <div className="px-8 py-6 mb-8 -mx-8 bg-zinc-100">
                    <div className="w-24 h-4 mb-3 rounded bg-zinc-200" />
                    <div className="w-48 h-6 rounded bg-zinc-200" />
                  </div>
                  <div className="mb-8">
                    <div className="flex items-baseline">
                      <div className="w-20 h-12 rounded bg-zinc-200" />
                      <div className="w-24 h-6 ml-2 rounded bg-zinc-200" />
                    </div>
                    <div className="h-5 mt-2 rounded bg-zinc-200 w-36" />
                  </div>
                  <div className="mb-8 space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center">
                        <div className="w-6 h-6 mr-3 rounded-full bg-zinc-200" />
                        <div className="w-full h-4 rounded bg-zinc-200" />
                      </div>
                    ))}
                  </div>
                  <div className="w-full bg-zinc-200 h-14 rounded-xl" />
                </div>
              </div>
            ))
          : plans?.map((plan, index) => (
              <BlurFade
                key={plan.id}
                delay={(index + 1) * 0.25}
                className="relative overflow-hidden border shadow-xl border-zinc-100 bg-gradient-to-b from-white to-zinc-50 rounded-3xl"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold text-zinc-900">
                      {plan.plan}
                    </h3>
                    <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-lg text-primary">
                      <TbServerBolt className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="px-8 py-6 mb-8 -mx-8 bg-blue-50">
                    <p className="text-sm font-medium tracking-wide uppercase text-primary">
                      Specifications
                    </p>
                    <p className="mt-2 text-lg font-medium text-zinc-900">
                      {plan.vcpu_count} vCPU • {plan.ram / 1024}GB RAM •{" "}
                      {plan.disk} GB NVMe
                    </p>
                  </div>
                  <div className="mb-8">
                    <div className="flex items-baseline">
                      <span className="text-5xl font-extrabold text-zinc-900">
                        {plan.hourlyCost}
                      </span>
                      <span className="ml-2 text-xl text-zinc-600">
                        credits/hour
                      </span>
                    </div>
                    <p className="text-zinc-600 ">
                      or {plan.monthlyCost} credits/month
                    </p>
                  </div>
                  <ul className="mb-8 space-y-4">
                    {[
                      "Custom OS",
                      "Unlimited Snapshots",
                      "24/7 Premium Support",
                      "Unlimited Firewall Groups",
                      "Private Network",
                    ]?.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-zinc-600"
                      >
                        <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-3 bg-blue-100 rounded-full text-primary">
                          <LuZap className="w-4 h-4" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={
                      user
                        ? `/instance/deploy?selected_plan=${plan.id}`
                        : "/login"
                    }
                  >
                    <div className="flex items-center justify-center w-full px-8 py-3 text-lg font-semibold text-white transition-colors duration-200 shadow-lg grow bg-gradient-to-r from-primary to-indigo-500 rounded-xl hover:from-primary hover:to-primary hover:shadow-xl">
                      Deploy Now
                    </div>
                  </Link>
                </div>
              </BlurFade>
            ))}
      </div>
    </section>
  );
};

export default Pricing;
