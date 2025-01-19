// import Header from "./Header";
// import Hero from "./Hero";
// import Locations from "./Locations";
// import LazyWorldMap from "./LazyWorldMap";
import { Navigate } from "react-router-dom";
import { useGetSessionQuery } from "../../redux/apis/auth";

const Landing = () => {
  const { data } = useGetSessionQuery();

  return <Navigate to={data ? "/instance" : "/login"} replace />;

  // return (
  //   <div className="tailwind-layout">
  //     <Header />
  //     <Hero />
  //     <Locations />
  //     <LazyWorldMap />
  //   </div>
  // );
};

export default Landing;
