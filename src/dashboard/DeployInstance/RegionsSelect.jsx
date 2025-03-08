import { useEffect, useMemo, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useGetRegionsQuery } from "../../redux/apis/instances";
import { Flex, Tabs } from "antd";
import { getCountryName, sortByCharacterPriority } from "../../utils/helpers";

const RegionsSelect = ({ value, onValueChange }) => {
  const [continent, setContinent] = useState("All Locations");
  const { data, isLoading } = useGetRegionsQuery();

  const sortedRegions = useMemo(() => {
    if (!data) return [];

    const regions =
      continent === "All Locations"
        ? data
        : data.filter((region) => region.continent === continent);

    return sortByCharacterPriority(regions, "country", "u");
  }, [data, continent]);

  useEffect(() => {
    if (sortedRegions?.length && !value) {
      onValueChange(sortedRegions[0].id);
    }
  }, [sortedRegions, value, onValueChange]);

  const continents = useMemo(() => {
    if (!data) return [];

    const uniqueContinents = Array.from(
      new Set(data.map((region) => region.continent))
    );

    return [
      { key: "All Locations", label: "All Locations" },
      ...uniqueContinents.map((c) => ({
        key: c,
        label: c,
      })),
    ];
  }, [data]);

  return (
    <>
      <h4>Regions</h4>

      {isLoading ? (
        <Tabs
          activeKey="0"
          items={Array.from({ length: 7 }).map((_, i) => ({
            key: i.toString(),
            label: (
              <div
                className="animate-pulse"
                style={{
                  backgroundColor: "#d1d5db",
                  height: "22px",
                  width: "55px",
                  borderRadius: "5px",
                }}
              />
            ),
          }))}
        />
      ) : (
        <Tabs
          activeKey={continent}
          onChange={setContinent}
          items={continents}
        />
      )}

      <div className="grid-layout">
        {isLoading
          ? Array.from({ length: 32 }).map((_, index) => (
              <div
                key={index}
                className="grid-item animate-pulse"
                style={{ backgroundColor: "#d1d5db" }}
              >
                <div style={{ width: "28px", height: "28px" }} />
              </div>
            ))
          : sortedRegions.map((region) => (
              <div
                key={region.id}
                className={`grid-item ${value === region.id ? "active" : ""}`}
                onClick={() => onValueChange(region.id)}
                style={{
                  justifyContent: "space-between",
                  paddingLeft: "18px",
                  paddingRight: "18px",
                }}
              >
                <Flex gap={12} align="center">
                  <ReactCountryFlag
                    svg
                    className="flag"
                    countryCode={region.country}
                    style={{ width: "28px", height: "28px" }}
                  />
                  <div className="content">{region.city}</div>
                </Flex>
                <span
                  style={{
                    fontSize: "11px",
                    color: "gray",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  ({getCountryName(region.country)})
                </span>
              </div>
            ))}
      </div>
    </>
  );
};

export default RegionsSelect;
