import { useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import { useGetRegionsQuery } from "../../redux/apis/apiSlice";

const RegionsSelect = ({ value, onValueChange }) => {
  const { data, isLoading } = useGetRegionsQuery();

  useEffect(() => {
    if (data?.length && !value) {
      onValueChange(data[0].id);
    }
  }, [data, value, onValueChange]);

  return (
    <>
      <h4>Regions</h4>
      <div className="grid-layout">
        {isLoading
          ? Array.from({ length: 32 }).map((_, index) => (
              <div
                key={index}
                className="grid-item animate-pulse"
                style={{ backgroundColor: "#d1d5db" }}
              >
                <div style={{ width: "36px", height: "36px" }} />
              </div>
            ))
          : data.map((region) => (
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
