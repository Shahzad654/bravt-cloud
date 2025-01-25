import { useRef } from "react";
import { REGIONS } from "../../data/regions";
import { BlurFade } from "./BlurFade";
import { motion } from "motion/react";
import { Tooltip } from "antd";
import { getCountryName } from "../../utils/helpers";
import ReactCountryFlag from "react-country-flag";
import WorldMapImage from "../../assets/images/world-map.svg";

const Locations = () => {
  const svgRef = useRef(null);

  const projectPoint = (lat, lng) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  return (
    <section
      id="locations"
      className="container flex flex-col items-center mt-8 text-center"
    >
      <BlurFade
        delay={0.25}
        className="text-4xl font-bold drop-shadow-xl sm:text-5xl lg:text-7xl xl:text-8xl lg:leading-normal xl:leading-normal"
      >
        Connect. Deploy. Grow - Globally
      </BlurFade>

      <BlurFade
        delay={0.5}
        className="max-w-lg mt-6 font-medium text-zinc-500 sm:text-lg lg:text-xl"
      >
        Start deploying your High Performance Cloud VPS worldwide. Reduce
        latency, with our Cloud VPS located near your users and equipped with
        local BGP access.
      </BlurFade>

      <BlurFade
        delay={0.75}
        className="w-full aspect-[2/1] bg-white relative font-sans mt-2"
      >
        <img
          alt="world map"
          height="495"
          width="1056"
          draggable={false}
          src={WorldMapImage}
          className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        />
        <svg
          ref={svgRef}
          viewBox="0 0 800 400"
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
        >
          <motion.g
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3,
                },
              },
            }}
          >
            {Object.values(REGIONS).map((dot, i) => {
              const point = projectPoint(dot.coords.lat, dot.coords.lng);
              return (
                <motion.g
                  key={`points-group-${i}`}
                  variants={{
                    hidden: { opacity: 0, scale: 0 },
                    show: { opacity: 1, scale: 1 },
                  }}
                >
                  <Tooltip
                    title={
                      <div
                        style={{
                          color: "black",
                          display: "flex",
                          alignItems: "center",
                          columnGap: "10px",
                        }}
                      >
                        <ReactCountryFlag
                          svg
                          countryCode={dot.countryCode}
                          style={{
                            flexShrink: 0,
                            width: "28px",
                            height: "28px",
                          }}
                        />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <span style={{ margin: 0, padding: 0 }}>
                            {dot.city}
                          </span>
                          <span
                            style={{
                              color: "gray",
                              fontSize: "10px",
                              margin: 0,
                              padding: 0,
                            }}
                          >
                            ({getCountryName(dot.countryCode)})
                          </span>
                        </div>
                      </div>
                    }
                    color="white"
                  >
                    <circle
                      r="3"
                      cx={point.x}
                      cy={point.y}
                      fill="var(--primary-color)"
                      className="cursor-pointer pointer-events-auto"
                    />
                  </Tooltip>
                  <motion.circle
                    r="2"
                    cx={point.x}
                    cy={point.y}
                    fill="var(--primary-color)"
                    opacity="0.5"
                    className="pointer-events-none"
                    animate={{
                      r: [2, 8],
                      opacity: [0.5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.g>
              );
            })}
          </motion.g>
        </svg>
      </BlurFade>
    </section>
  );
};

export default Locations;
