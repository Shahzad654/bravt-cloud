import { OrbEffect } from "./OrbEffect";
import { Link } from "react-router-dom";
import { BlurFade } from "./BlurFade";
import { useGetSessionQuery } from "../../redux/apis/auth";

export default function Hero() {
  const { daza: user } = useGetSessionQuery();

  return (
    <section
      id="home"
      className="py-12 pb-0 overflow-hidden sm:py-24 md:py-32 fade-bottom"
    >
      <div className="relative px-6 py-16 overflow-hidden md:py-28 lg:py-36">
        <div className="container flex flex-col gap-16 mx-auto lg:gap-28">
          <div className="flex flex-col items-center text-center">
            <BlurFade
              delay={0.25}
              className="text-4xl font-bold drop-shadow-xl sm:text-5xl lg:text-7xl xl:text-8xl lg:leading-normal xl:leading-normal"
            >
              Build Cloud Servers Instantly - Simple, Powerful, Yours
            </BlurFade>

            <BlurFade
              delay={0.5}
              className="max-w-lg mt-6 font-medium text-zinc-500 sm:text-lg lg:text-xl"
            >
              Launch, scale, and manage cloud servers effortlessly. Experience
              performance and reliability like never before.
            </BlurFade>

            <BlurFade
              delay={0.75}
              className="relative z-10 flex flex-col items-center w-full mt-6 space-y-3 lg:mt-8"
            >
              <Link
                to={user ? "/instance" : "/login"}
                className="px-4 py-2 text-white rounded-md bg-gradient-to-b from-brand to-brand/80 hover:from-brand/90 hover:to-brand/70"
              >
                Get Started
              </Link>
            </BlurFade>

            <OrbEffect />
          </div>
        </div>
      </div>
    </section>
  );
}
