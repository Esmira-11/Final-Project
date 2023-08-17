import React from "react";
import Layout from "../../components/Layout";
import "./adminprofile.scss";
import avatar from "../../assets/images/avatar-3.png";
import { useAuth } from "../../context/auth";
import CreateProduct from "../../components/Admin/CreateProduct/CreateProduct";
// import { Link } from 'react-router-dom'
import Detail from "../DetailPage/Detail";
import CreateCategory from "../../components/Admin/CreateCategory/CreateCategory";
import Users from "../../components/Admin/Users/Users";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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

function AdminProfile() {
  const [auth, setAuth] = useAuth();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout>
      <div className="admin-profile">
        <div className="admin-profile-container">
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
              <Tab label="Users" {...a11yProps(1)} />
              <Tab label="Category" {...a11yProps(2)} />
              <Tab label="Pet Category" {...a11yProps(3)} />
              <Tab label="Product" {...a11yProps(4)} />
              <Tab label="Announcement" {...a11yProps(5)} />
              <Tab label="Messages" {...a11yProps(6)} />
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
              <Users/>
            </TabPanel>
            <TabPanel className="tabpanel" value={value} index={2}>
              <CreateCategory/>
            </TabPanel>
            <TabPanel className="tabpanel" value={value} index={3}>
              
            </TabPanel>
            <TabPanel className="tabpanel" value={value} index={4}>
              <CreateProduct/>
            </TabPanel>
            <TabPanel className="tabpanel" value={value} index={5}>
              Announcement
            </TabPanel>
            <TabPanel className="tabpanel" value={value} index={6}>
              Messages
            </TabPanel>
          </Box>
        </div>
      </div>
    </Layout>
  );
}

export default AdminProfile;
