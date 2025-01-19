import { useMemo } from "react";
import { getIcon, getOSName } from "../../components/Icons";
import { useGetImagesQuery } from "../../redux/apis/instances";
import { sortByCharacterPriority } from "../../utils/helpers";
import { Dropdown } from "antd";
import { TbChevronDown } from "react-icons/tb";

function formatOSName(name, family) {
  return name.replace(new RegExp(`^${getOSName(family)}\\s`, "i"), "");
}

const ImageSelect = ({ value, onValueChange }) => {
  const { data, isLoading } = useGetImagesQuery();

  const groupedData = useMemo(() => {
    const sorted = sortByCharacterPriority(data, "family", "u") || [];
    return sorted?.reduce((acc, item) => {
      const existingGroup = acc.find((group) => group.family === item.family);

      if (existingGroup) {
        existingGroup.versions.push(item);
      } else {
        acc.push({ family: item.family, versions: [item] });
      }

      return acc;
    }, []);
  }, [data]);

  if (isLoading) {
    return (
      <div className="grid-layout">
        {Array.from({ length: 14 }).map((_, index) => (
          <div
            key={index}
            className="grid-item animate-pulse"
            style={{ backgroundColor: "#d1d5db", height: "100px" }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid-layout">
      {groupedData?.map((item) => {
        const { Icon, color } = getIcon(item.family);

        if (item.versions.length === 1) {
          const image = item.versions[0];
          return (
            <div
              key={image.id}
              className={`grid-item ${value === image.id ? "active" : ""}`}
              onClick={() => onValueChange(image.id)}
              style={{ flexDirection: "column" }}
            >
              <Icon color={color} size={30} />
              <div
                className="content"
                style={{ textAlign: "center", marginTop: "5px" }}
              >
                {getOSName(image.family)}
              </div>
              <span style={{ fontSize: "11px", color: "#71717a" }}>
                ({formatOSName(image.name, item.family)})
              </span>
            </div>
          );
        }

        return (
          <ImageDropdown
            key={item.family}
            image={item}
            value={value}
            onValueChange={onValueChange}
          />
        );
      })}
    </div>
  );
};

export default ImageSelect;

function ImageDropdown({ image, value, onValueChange }) {
  const { Icon, color } = getIcon(image.family);

  const isSelected = useMemo(() => {
    return image.versions.some((v) => v.id === value);
  }, [value, image]);

  const selectedVersion = useMemo(() => {
    return image.versions.find((v) => v.id === value) || image.versions[0];
  }, [image, value]);

  const items = useMemo(() => {
    return image.versions.map((v) => ({
      key: v.id,
      label: v.name,
      icon: <Icon color={color} />,
      onClick: () => onValueChange(v.id),
    }));
  }, [image, color, onValueChange]);

  return (
    <Dropdown
      trigger={["click"]}
      destroyPopupOnHide={!isSelected}
      menu={{
        defaultActiveFirst: true,
        selectable: true,
        defaultSelectedKeys: [value],
        items,
      }}
    >
      <div
        className={`grid-item ${isSelected ? "active" : ""}`}
        style={{ flexDirection: "column" }}
      >
        <Icon color={color} size={30} />
        <div
          className="content"
          style={{ textAlign: "center", marginTop: "5px" }}
        >
          {getOSName(image.family)}
        </div>
        <span style={{ fontSize: "11px", color: "#71717a" }}>
          ({formatOSName(selectedVersion.name, image.family)})
          <TbChevronDown size={12} style={{ marginLeft: "4px" }} />
        </span>
      </div>
    </Dropdown>
  );
}
