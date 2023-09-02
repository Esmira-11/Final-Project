import React, { useState } from "react";
import Layout from "../../components/Layout";
import "./adminprofile.scss";
import toast, { Toaster } from "react-hot-toast";
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
import Post from "../../components/Admin/Posts/Post";
import Avatar from "@mui/material/Avatar";
import Modal from '@mui/material/Modal';
import axios from "axios";




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
  const [avatar, setAvatar] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const uploadAvatar = async (e) => {
    e.preventDefault();
    try {
      const userData = new FormData();
      userData.append("avatar", avatar);

      const { data } = await axios.post(
        "http://localhost:5000/api/user/upload-avatar",
        userData
      );
      if (data?.success) {
        toast.success("Avatar uploaded successfully");
      } else {
        toast.error();
      }
    } catch (error) {
      console.log(error);
      toast.error("Avatar upload failed");
    }
    setAvatar("");
    handleClose();
    window.location.reload();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    borderRadius: "15px",
    backgroundColor: "#fffaf5",
    color: "#2f4f4f",
    boxShadow: 24,
    p: 4,
    border: "none",
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
                <img src={`http://localhost:5000/api/user/user-avatar/${auth.user._id}`} alt="avatar" />
                </div>
                  <div className="update-photo">
                    <button onClick={() => {
                        setOpen(true);
                      }}>
                      <i className="fa-solid fa-cloud-arrow-up"></i>
                    </button>
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
              <Post/>
            </TabPanel>
            <TabPanel className="tabpanel" value={value} index={6}>
              Messages
            </TabPanel>
          </Box>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{
                    textAlign: "center",
                    paddingBottom: "10px",
                    fontSize: "25px",
                  }}>
            Upload Avatar
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form className="form" onSubmit={uploadAvatar}>
              <div className="upload" >
              <label>
              {avatar ? avatar.name : "select file"}
              <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  hidden
              />
              </label>
              </div>
              <div
              className="btns"
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "20px",
              }}
            >
              <button type="submit" 
                  style={{
                  padding: "13px",
                  fontSize: "18px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "700",
                  borderRadius: "8px",
                  background: "#2f4f4f",
                  color: "#fffaf5",
                  transition: "background-color 0.3s ease",
                }}>
                  Upload
                </button>
                <button
                onClick={handleClose}
                style={{
                  padding: "13px",
                  fontSize: "18px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "700",
                  borderRadius: "8px",
                  background: "#2f4f4f",
                  color: "#fffaf5",
                  transition: "background-color 0.3s ease",
                }}
              >
                Cancel
              </button>
            </div>
              
            </form>
          </Typography>
        </Box>
      </Modal>
      <Toaster position="bottom-right" />
    </Layout>
  );
}

export default AdminProfile;
