import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Breadcrumb, Layout } from "antd";
import DashSidebar from "../components/DashSidebar";
import DashHeader from "../components/DashHeader";
import ReactCountryFlag from "react-country-flag";
import { FaUbuntu, FaDebian } from "react-icons/fa6";
import { FaWindows, FaDocker, FaCpanel, FaCentos } from "react-icons/fa";
import { GrArchlinux } from "react-icons/gr";
import { SiRockylinux, SiAlmalinux, SiPlesk } from "react-icons/si";


const { Content } = Layout;

const DeployInstance = () => {
     const [selectedCountry, setSelectedCountry] = useState(null);
     const [activeSystem, setActiveSystem] = useState(null); 

     const handleCountrySelect = (countryCode) => {
       setSelectedCountry(countryCode);
     };

      

   
      const handleSystemClick = (system) => {
        setActiveSystem((prevSystem) =>
          prevSystem === system ? null : system
        );
      };
    

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
              <h4>Location</h4>
              <div className="countries">
                {[
                  "US",
                  "PK",
                  "BR",
                  "SA",
                  "FR",
                  "GR",
                  "JP",
                  "KR",
                  "PH",
                  "QA",
                  "GB",
                  "TR",
                  "RU",
                  "OM",
                  "MX",
                ].map((countryCode) => (
                  <div
                    key={countryCode}
                    className={`country ${selectedCountry === countryCode ? "active" : ""}`}
                    onClick={() => handleCountrySelect(countryCode)}
                  >
                    <ReactCountryFlag
                      countryCode={countryCode}
                      svg
                      style={{ width: "3rem", height: "3rem" }}
                      className="flag"
                    />
                    <div className="content">
                      <p>{countryCode}</p>
                    </div>
                  </div>
                ))}
              </div>
              <h4 style={{ marginTop: "40px" }}>System Images</h4>
              <div className="system-images">
                <div
                  className={`systme-container ${activeSystem === "ubuntu" ? "active" : ""}`}
                  onClick={() => handleSystemClick("ubuntu")}
                >
                  <FaUbuntu
                    style={{ width: "50px", height: "50px", color: "blue" }}
                  />
                  <div className="content">
                    <p>Ubuntu</p>
                  </div>
                </div>

                <div
                  className={`systme-container ${activeSystem === "debian" ? "active" : ""}`}
                  onClick={() => handleSystemClick("debian")}
                >
                  <FaDebian
                    style={{ width: "50px", height: "50px", color: "blue" }}
                  />
                  <div className="content">
                    <p>Debian</p>
                  </div>
                </div>

                <div
                  className={`systme-container ${activeSystem === "windows" ? "active" : ""}`}
                  onClick={() => handleSystemClick("windows")}
                >
                  <FaWindows
                    style={{ width: "50px", height: "50px", color: "blue" }}
                  />
                  <div className="content">
                    <p>Windows</p>
                  </div>
                </div>

                <div
                  className={`systme-container ${activeSystem === "archlinux" ? "active" : ""}`}
                  onClick={() => handleSystemClick("archlinux")}
                >
                  <GrArchlinux
                    style={{ width: "50px", height: "50px", color: "blue" }}
                  />
                  <div className="content">
                    <p>Arch Linux</p>
                  </div>
                </div>

                <div
                  className={`systme-container ${activeSystem === "docker" ? "active" : ""}`}
                  onClick={() => handleSystemClick("docker")}
                >
                  <FaDocker
                    style={{ width: "50px", height: "50px", color: "blue" }}
                  />
                  <div className="content">
                    <p>Docker</p>
                  </div>
                </div>

                <div
                  className={`systme-container ${activeSystem === "cpanel" ? "active" : ""}`}
                  onClick={() => handleSystemClick("cpanel")}
                >
                  <FaCpanel
                    style={{ width: "50px", height: "50px", color: "blue" }}
                  />
                  <div className="content">
                    <p>cPanel</p>
                  </div>
                </div>

                <div
                  className={`systme-container ${activeSystem === "rockylinux" ? "active" : ""}`}
                  onClick={() => handleSystemClick("rockylinux")}
                >
                  <SiRockylinux
                    style={{ width: "50px", height: "50px", color: "blue" }}
                  />
                  <div className="content">
                    <p>Rocky Linux</p>
                  </div>
                </div>

                <div
                  className={`systme-container ${activeSystem === "almalinux" ? "active" : ""}`}
                  onClick={() => handleSystemClick("almalinux")}
                >
                  <SiAlmalinux
                    style={{ width: "50px", height: "50px", color: "blue" }}
                  />
                  <div className="content">
                    <p>Alma Linux</p>
                  </div>
                </div>

                <div
                  className={`systme-container ${activeSystem === "centos" ? "active" : ""}`}
                  onClick={() => handleSystemClick("centos")}
                >
                  <FaCentos
                    style={{ width: "50px", height: "50px", color: "blue" }}
                  />
                  <div className="content">
                    <p>CentosOS</p>
                  </div>
                </div>

                <div
                  className={`systme-container ${activeSystem === "plesk" ? "active" : ""}`}
                  onClick={() => handleSystemClick("plesk")}
                >
                  <SiPlesk
                    style={{ width: "50px", height: "50px", color: "blue" }}
                  />
                  <div className="content">
                    <p>Plesk</p>
                  </div>
                </div>
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
  .countries {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
    .country {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      width: 170px;
      height: 100px;
      border-radius: 5%;
      border: 2px solid var(--primary-color);
      p {
        text-align: center;
        font-weight: bold;
      }

      &.active {
        border: 2px solid var(--primary-color);
        background-color: var(--primary-color);
      }
    }
  }

  .system-images {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;

    .systme-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      width: 170px;
      height: 100px;
      border-radius: 5%;
      border: 2px solid var(--primary-color);

      p{
        font-weight: bold;
      }

      &.active {
        background: var(--primary-color);
        color: white;
      }
    }
  }
`;
