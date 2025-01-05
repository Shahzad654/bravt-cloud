import { useEffect, useState } from "react";
import styled from "styled-components";
import { Breadcrumb, Layout } from "antd";
import DashSidebar from "../components/DashSidebar";
import DashHeader from "../components/DashHeader";
import ReactCountryFlag from "react-country-flag";
import { useDispatch, useSelector } from "react-redux";
import { getRegions } from "../redux/apis/regionsSlice";
import { getImages } from "../redux/apis/imagesSlice";
import { Icons } from "../components/icons";

const { Content } = Layout;

const DeployInstance = () => {
  const dispatch = useDispatch();

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [activeSystem, setActiveSystem] = useState(null);

  const { regions, status: regionsStatus } = useSelector(
    (state) => state.regions
  );

  const { images, status: imagesStatus } = useSelector((state) => state.images);

  useEffect(() => {
    dispatch(getRegions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <DashSidebar />
      <Layout style={{ padding: "0 16px", backgroundColor: "white" }}>
        <DashHeader />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            style={{
              margin: "16px 0",
              fontSize: "var(--m-heading)",
              color: "black",
              fontWeight: "500",
            }}
          >
            Deploy New Instance
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: "white",
              borderRadius: "8px",
            }}
          >
            <PageContent>
              <h4>Regions</h4>
              <div className="grid-layout">
                {regionsStatus === "loading"
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
                        className={`grid-item ${selectedRegion === region.id ? "active" : ""}`}
                        onClick={() => setSelectedRegion(region.id)}
                      >
                        <ReactCountryFlag
                          svg
                          className="flag"
                          countryCode={region.country}
                          style={{ width: "36px", height: "36px" }}
                        />
                        <div className="content">
                          {region.city} <sub>({region.country})</sub>
                        </div>
                      </div>
                    ))}
              </div>

              <h4 style={{ marginTop: "40px" }}>System Images</h4>

              <div className="grid-layout">
                {images.map((image) => {
                  const { icon: Icon, color } = Icons[image.family];
                  return (
                    <div
                      key={image.id}
                      style={{ flexDirection: "column" }}
                      className={`grid-item ${activeSystem === image.id ? "active" : ""}`}
                      onClick={() => setActiveSystem(image.id)}
                    >
                      <Icon color={color} size={36} />
                      <div className="content" style={{ textAlign: "center" }}>
                        {image.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </PageContent>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DeployInstance;

const PageContent = styled.div`
  .grid-layout {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(1, minmax(0, 1fr));

    @media (min-width: 640px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: 768px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    @media (min-width: 1280px) {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }

    .grid-item {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      width: full;
      padding: 16px 8px;
      min-height: 100px;
      border-radius: 5%;
      border: 2px solid #d1d5db;
      cursor: pointer;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      transition-property: color, background-color, border-color;
      text-decoration-color; fill, stroke;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 300ms;

      .content {
        font-weight: bold;
        font-size: 16px;
        sub {
          color: #52525b;
          font-size: 10px;
        }
      }

      &.active {
        background: #bfdbfe;
        border-color: var(--primary-color);
      }
    }
  }
`;
