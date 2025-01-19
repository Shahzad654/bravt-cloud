import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { IoIosGift } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["Home", "Products", "Locations", "About", "Doc"].map((text) => (
          <ListItem key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Sign In", "Sign Up"].map((text) => (
          <ListItem key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <StyledNavbar>
        <div className="logo-container">
          <img src={Logo} alt="" />
        </div>

        <div className="nav-links">
          {/* <Link to="/" className="link">
            Home
          </Link>
          <Link to="/" className="link">
            Product
          </Link>
          <Link to="/" className="link">
            Location
          </Link>
          <Link to="/" className="link">
            About Us
          </Link>
          <Link to="/" className="link">
            Docs
          </Link> */}

          <Link to="/signup" className="link">
            Home
          </Link>
          <Link to="/" className="link">
            Product
          </Link>
        </div>

        <div className="nav-buttons">
          <button className="outline-btn">Sign In</button>
          <button className="contained-btn">
            <IoIosGift className="gift-icon" />
            Sign Up
          </button>
        </div>

        <div className="mobile-menu">
          <GiHamburgerMenu className="ham-icon" onClick={toggleDrawer(true)} />
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </div>
      </StyledNavbar>
    </>
  );
}

const StyledNavbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  width: var(--section-width);
  min-height: var(--nav-height);
  margin: auto;

  .logo-container {
    img {
      max-width: 150px;
      height: auto;
    }
  }

  .nav-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    font-size: 1.1rem;
    .link {
      color: black;
      text-decoration: none;
      font-weight: bold;
    }
  }

  .nav-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .mobile-menu {
    display: none;
  }

  @media (max-width: 720px) {
    .nav-links,
    .nav-buttons {
      display: none;
    }
    .mobile-menu {
      display: block;
      .ham-icon {
        width: 22px;
        height: 22px;
        cursor: pointer;
      }
    }
  }

  @media (min-width: 720px) and (max-width: 1090px) {
    justify-content: center;
  }
`;
