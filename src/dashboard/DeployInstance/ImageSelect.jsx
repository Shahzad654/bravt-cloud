import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getImages } from "../../redux/apis/imagesSlice";
import { Icons } from "../../components/Icons";

const ImageSelect = ({ value, onValueChange }) => {
  const dispatch = useDispatch();
  const { images, status } = useSelector((state) => state.images);

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  useEffect(() => {
    if (images.length && !value) {
      onValueChange(images[0].id);
    }
  }, [images, value, onValueChange]);

  return (
    <>
      <h4 style={{ marginTop: "20px" }}>Operating system</h4>

      <div className="grid-layout">
        {status === "loading"
          ? Array.from({ length: 38 }).map((_, index) => (
              <div
                key={index}
                className="grid-item animate-pulse"
                style={{ backgroundColor: "#d1d5db", height: "100px" }}
              />
            ))
          : images.map((image) => {
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
