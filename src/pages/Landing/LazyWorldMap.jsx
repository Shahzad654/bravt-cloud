import { Suspense, lazy } from "react";

// import loadableVisibility from "react-loadable-visibility/loadable-components";

const WorldMap = lazy(() => import("./WorldMap"));

const LazyWorldMap = () => {
  return (
    <div className="mt-8 container mx-auto">
      <Suspense
        fallback={
          <div className="w-full aspect-[2/1] bg-zinc-100 animate-pulse rounded-lg relative" />
        }
      >
        <WorldMap />
      </Suspense>
    </div>
  );
};

export default LazyWorldMap;
