import { useState } from "react";
import styled from "styled-components";
import BGIMG from "../assets/images/main-bg.webp";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { VscGithub } from "react-icons/vsc";
import Node1 from "../assets/images/node1.webp";
import Node2 from "../assets/images/node2.webp";
import Node3 from "../assets/images/node3.webp";
import Node4 from "../assets/images/node4.webp";
import TabImg1 from "../assets/images/demo-img.webp";
import TabImg2 from "../assets/images/demo-img2.webp";
import TabImg3 from "../assets/images/demo-img3.webp";
import TabImg4 from "../assets/images/demo-img4.webp";
import Logo from "../assets/images/nav.webp";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Home() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <StyledHome>
        <div className="home-container">
          <div className="img-container">
            <img src={BGIMG} alt="" />
          </div>
        </div>

        <div className="content">
          <div className="buttons">
            <div className="border">
              <div className="email">
                <MdEmail className="email-icon" />
                <p>Sign Up with Email</p>
              </div>
            </div>

            <div className="border">
              <div className="google">
                <FcGoogle className="email-icon" />
                <p>Sign Up with Google</p>
              </div>
            </div>

            <div className="border">
              {" "}
              <div className="github">
                <VscGithub className="email-icon" />
                <p>Sign Up with Github</p>
              </div>
            </div>
          </div>
        </div>

        <NodeStyled>
          <h2>Node Introduction</h2>

          <div className="cards">
            <Card sx={{ minWidth: 200 }}>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img src={Node1} alt="" style={{ maxWidth: "70px" }} />
                <h4>40+</h4>
                <p>Data Centers</p>
              </CardContent>
            </Card>

            <Card sx={{ minWidth: 200 }}>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img src={Node2} alt="" style={{ maxWidth: "70px" }} />
                <h4>100+</h4>
                <p>Pop nodes</p>
              </CardContent>
            </Card>

            <Card sx={{ minWidth: 200 }}>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img src={Node3} alt="" style={{ maxWidth: "70px" }} />
                <h4>10Tbps</h4>
                <p>Backbone Network</p>
              </CardContent>
            </Card>

            <Card sx={{ minWidth: 200 }}>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img src={Node4} alt="" style={{ maxWidth: "70px" }} />
                <h4>300+</h4>
                <p>Operators Connected</p>
              </CardContent>
            </Card>
          </div>
        </NodeStyled>

        <PlatformStyled>
          <h2>Platform Introduction + Advantages</h2>

          <div className="tabs">
            <Box
              sx={{
                maxWidth: { xs: 320, sm: 480 },
                bgcolor: "background.paper",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable prevent tabs example"
              >
                <Tab label="PC+Mobile terminal" />
                <Tab label="Customized Configurations" />
                <Tab label="Deploy with one-click" />
                <Tab label="Transparent Cost" />
              </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
              <img
                src={TabImg1}
                alt="Tab 1"
                style={{ maxWidth: "500px", height: "auto" }}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <img
                src={TabImg2}
                alt="Tab 2"
                style={{ maxWidth: "500px", height: "auto" }}
              />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <img
                src={TabImg3}
                alt="Tab 3"
                style={{ maxWidth: "500px", height: "auto" }}
              />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <img
                src={TabImg4}
                alt="Tab 4"
                style={{ maxWidth: "500px", height: "auto" }}
              />
            </TabPanel>
          </div>
        </PlatformStyled>

        <PricingStyled>
          <h2>More resources, less cost</h2>
          <div className="pricing-cards">
            <List
              sx={{ width: "100%", maxWidth: 600, bgcolor: "background.paper" }}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={Logo} />
                </ListItemAvatar>
                <ListItemText
                  primary="1 vCPU 2GB"
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "text.primary", display: "inline" }}
                      >
                        Computer
                      </Typography>
                    </>
                  }
                />

                <ListItemText
                  primary="1 vCPU 2GB"
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "text.primary", display: "inline" }}
                      >
                        Computer
                      </Typography>
                    </>
                  }
                />

                <ListItemText
                  primary="1 vCPU 2GB"
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "text.primary", display: "inline" }}
                      >
                        Computer
                      </Typography>
                    </>
                  }
                />
                <ListItemText primary="$8.0" />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={Logo} />
                </ListItemAvatar>
                <ListItemText
                  primary="1 vCPU 2GB"
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "text.primary", display: "inline" }}
                      >
                        Computer
                      </Typography>
                    </>
                  }
                />

                <ListItemText
                  primary="1 vCPU 2GB"
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "text.primary", display: "inline" }}
                      >
                        Computer
                      </Typography>
                    </>
                  }
                />

                <ListItemText
                  primary="1 vCPU 2GB"
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "text.primary", display: "inline" }}
                      >
                        Computer
                      </Typography>
                    </>
                  }
                />
                <ListItemText primary="$8.0" />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={Logo} />
                </ListItemAvatar>
                <ListItemText
                  primary="1 vCPU 2GB"
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "text.primary", display: "inline" }}
                      >
                        Computer
                      </Typography>
                    </>
                  }
                />

                <ListItemText
                  primary="1 vCPU 2GB"
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "text.primary", display: "inline" }}
                      >
                        Computer
                      </Typography>
                    </>
                  }
                />

                <ListItemText
                  primary="1 vCPU 2GB"
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "text.primary", display: "inline" }}
                      >
                        Computer
                      </Typography>
                    </>
                  }
                />
                <ListItemText primary="$8.0" />
              </ListItem>
            </List>
          </div>
        </PricingStyled>
      </StyledHome>
    </>
  );
}

const StyledHome = styled.div`
  min-height: var(--section-height);
  .img-container {
    position: relative;
    img {
      width: 100%;
      height: 500px;
      object-fit: cover;
    }
  }

  .content {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%;
    width: var(--section-width);
    margin: auto;
    hr {
      max-width: 20%;
    }
    h1,
    h4,
    h5 {
      color: white;
    }

    .buttons {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      margin-top: 66px;

      .border {
        width: 230px;
        height: 50px;
        background-color: white;
        border-radius: var(--m-radius);
      }

      .email,
      .google,
      .github {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        p {
          color: var(--primary-color);
        }

        .email-icon {
          width: 25px;
          height: 25px;
        }
      }
    }
  }

  @media (max-width: 640px) {
    .img-container {
      img {
        width: 100%;
        height: 750px;
        object-fit: cover;
      }
    }
    .content {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      left: 50%;
      .buttons {
        .border {
          width: 500px;
          height: 50px;
          background-color: white;
          border-radius: var(--m-radius);
        }
      }
    }
  }

  @media (min-width: 640px) and (max-width: 1024px) {
    .img-container {
      img {
        width: 100%;
        height: 650px;
        object-fit: cover;
      }
    }
    .content {
      position: absolute;
      top: 55%;
      transform: translate(-50%, -50%);
      left: 50%;
    }
  }
`;

const NodeStyled = styled.div`
  width: var(--section-width);
  margin: var(--section-margin) auto;

  h2 {
    text-align: center;
  }
  .cards {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 30px;
    h4 {
      color: var(--primary-color);
    }
  }

  @media (max-width: 640px) {
    .cards {
      justify-content: center;
    }
  }
`;

const PlatformStyled = styled.div`
  width: var(--section-width);
  margin: var(--section-margin) auto;

  h2 {
    text-align: center;
  }

  .tabs {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 60px;
  }
`;

const PricingStyled = styled.div`
  width: var(--section-width);
  margin: var(--section-margin) auto;
  /* display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem; */

  h2 {
    text-align: center;
  }

  .pricing-cards {
  }
`;
