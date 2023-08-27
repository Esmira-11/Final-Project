import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Card from "../../components/Card/Card";
import "./userprofile.scss";
import avatar from "../../assets/images/avatar-3.png";
import { useAuth } from "../../context/auth";
import FavoritesPage from "../FavoritesPage/FavoritesPage";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Post from "../../components/UserAnnouncement/Post";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function UserProfile() {
  const [auth, setAuth] = useAuth();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout>
      <div className="user-profile">
        <div className="user-profile-container">
          <Box
            className="box"
            sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex" }}
          >
            <Tabs
              className="tabs"
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: "divider" }}
            >
              <Tab label="Profile" {...a11yProps(0)} />
              <Tab label="Favorites" {...a11yProps(1)} />
              <Tab label="Posts" {...a11yProps(2)} />
              {/* <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} /> */}
            </Tabs>
            <TabPanel className="tabpanel user-panel" value={value} index={0}>
              <div className="user-detail-container">
                <div className="user-detail" width="100%" height="100%">
                  <div className="user-detail-img">
                    <img src={avatar} alt="" />
                  </div>
                  <div className="user-detail-info">
                    <div className="user-name">
                      <h3>{auth.user.username}</h3>
                    </div>
                    <div className="user-email">
                      <h4>{auth.user.email}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel className="tabpanel" value={value} index={1}>
              <div className="user-favorites" width="100%" height="100%">
                <FavoritesPage />
              </div>
            </TabPanel>
            <TabPanel className="tabpanel" value={value} index={2}>
              <Post/>
            </TabPanel>
            {/* <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel> */}
          </Box>
        </div>
      </div>
    </Layout>
  );
}

export default UserProfile;
