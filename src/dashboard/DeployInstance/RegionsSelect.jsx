import { useEffect, useMemo, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useGetRegionsQuery } from "../../redux/apis/instances";
import { Flex, Tabs } from "antd";
import { getCountryName, sortByCharacterPriority } from "../../utils/helpers";

const RegionsSelect = ({ value, onValueChange }) => {
  const [continent, setContinent] = useState("Europe");
  const { data, isLoading } = useGetRegionsQuery();

  const regionsByContinent = useMemo(() => {
    return sortByCharacterPriority(
      data?.filter((region) => region.continent === continent),
      "country",
      "u"
    );
  }, [data, continent]);

  useEffect(() => {
    if (regionsByContinent?.length && !value) {
      onValueChange(regionsByContinent[0].id);
    }
  }, [regionsByContinent, value, onValueChange]);

  const continents = useMemo(() => {
    return Array.from(
      new Set(data?.map((region) => region.continent) || []).values()
    ).map((c) => ({
      key: c,
      label: c,
    }));
  }, [data]);

  return (
    <>
      <h4>Regions</h4>

      {isLoading ? (
        <Tabs
          activeKey="0"
          items={Array.from({ length: 6 }).map((_, i) => ({
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
          ? Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="grid-item animate-pulse"
                style={{ backgroundColor: "#d1d5db" }}
              >
                <div style={{ width: "28px", height: "28px" }} />
              </div>
            ))
          : regionsByContinent.map((region) => (
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
