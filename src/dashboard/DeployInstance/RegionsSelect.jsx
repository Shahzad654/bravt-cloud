import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getRegions } from "../../redux/apis/regionsSlice";
import { useEffect } from "react";
import ReactCountryFlag from "react-country-flag";

const RegionsSelect = ({ value, onValueChange }) => {
  const dispatch = useDispatch();
  const { regions, status } = useSelector((state) => state.regions);

  useEffect(() => {
    dispatch(getRegions());
  }, [dispatch]);

  useEffect(() => {
    if (regions.length && !value) {
      onValueChange(regions[0].id);
    }
  }, [regions, value, onValueChange]);

  return (
    <>
      <h4>Regions</h4>
      <div className="grid-layout">
        {status === "loading"
          ? Array.from({ length: 32 }).map((_, index) => (
              <div
                key={index}
                className="grid-item animate-pulse"
                style={{ backgroundColor: "#d1d5db" }}
              >
                <div style={{ width: "36px", height: "36px" }} />
              </div>
            ))
          : regions.map((region) => (
              <div
                key={region.id}
                className={`grid-item ${value === region.id ? "active" : ""}`}
                onClick={() => onValueChange(region.id)}
              >
                <ReactCountryFlag
                  svg
                  className="flag"
                  countryCode={region.country}
                  style={{ width: "28px", height: "28px" }}
                />
                <div className="content">
                  {region.city} <sub>({region.country})</sub>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default RegionsSelect;
