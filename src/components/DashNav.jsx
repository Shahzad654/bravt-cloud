import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { IoIosGift } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { MdEmail } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GrLanguage } from "react-icons/gr";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa6";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["Home", "Products", "Locations", "About", "Doc"].map(
          (text, index) => (
            <ListItem key={text}>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
      <Divider />
      <List>
        {["Sign In", "Sign Up"].map((text, index) => (
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
          <Link to="/" className="link">
            <div className="icon-border">
              <MdEmail className="icon" />
            </div>
            Messages
          </Link>
          <Link to="/" className="link">
            <div className="icon-border">
              <IoDocumentTextOutline className="icon" />
            </div>
            Docs
          </Link>
          <Link to="/" className="link">
            <div className="icon-border">
              <GrLanguage className="icon" />
            </div>
            English
          </Link>
          <Link to="/" className="link">
            <div className="icon-border">
              <RiMoneyDollarCircleLine className="icon" />
            </div>
            0.00
          </Link>
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
  /* box-shadow: 0px 4px 10px rgba(214, 213, 213, 0.3); */

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
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 500;
      .icon-border {
        width: 32px;
        height: 32px;
        background-color: var(--bg-color);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 3px;
      }

      .icon {
        width: 20px;
        height: 20px;
      }
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
