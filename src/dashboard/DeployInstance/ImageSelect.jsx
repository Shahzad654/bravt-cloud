import { useEffect } from "react";
import { Icons } from "../../components/Icons";
import { useGetImagesQuery } from "../../redux/apis/apiSlice";

const ImageSelect = ({ value, onValueChange }) => {
  const { data, isLoading } = useGetImagesQuery();

  useEffect(() => {
    if (data?.length && !value) {
      onValueChange(data[0].id);
    }
  }, [data, value, onValueChange]);

  return (
    <>
      <h4 style={{ marginTop: "20px" }}>Operating system</h4>

      <div className="grid-layout">
        {isLoading
          ? Array.from({ length: 38 }).map((_, index) => (
              <div
                key={index}
                className="grid-item animate-pulse"
                style={{ backgroundColor: "#d1d5db", height: "100px" }}
              />
            ))
          : data.map((image) => {
              const { icon: Icon, color } = Icons[image.family];
              return (
                <div
                  key={image.id}
                  className={`grid-item ${value === image.id ? "active" : ""}`}
                  onClick={() => onValueChange(image.id)}
                  style={{ flexDirection: "column" }}
                >
                  <Icon color={color} size={28} />
                  <div className="content" style={{ textAlign: "center" }}>
                    {image.name}
                  </div>
                </div>
              );
            })}
      </div>
    </>
  );
};

export default ImageSelect;
