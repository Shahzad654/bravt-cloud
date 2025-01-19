import { BlurFade } from "./BlurFade";

const Locations = () => {
  return (
    <div className="flex container flex-col items-center text-center mt-8">
      <BlurFade
        delay={0.25}
        inView
        className="text-4xl font-bold drop-shadow-xl sm:text-5xl lg:text-7xl xl:text-8xl lg:leading-normal xl:leading-normal"
      >
        Connect. Deploy. Grow - Globally
      </BlurFade>

      <BlurFade
        inView
        delay={0.5}
        className="max-w-lg font-medium text-zinc-500 sm:text-lg lg:text-xl mt-6"
      >
        Start deploying your High Performance Cloud VPS worldwide. Reduce
        latency, with our Cloud VPS located near your users and equipped with
        local BGP access.
      </BlurFade>
    </div>
  );
};

export default Locations;
