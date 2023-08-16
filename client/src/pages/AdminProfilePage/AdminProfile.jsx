import React from "react";
import Layout from "../../components/Layout";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import './adminprofile.scss'
import avatar from "../../assets/images/avatar-3.png"
import { useAuth } from "../../context/auth";
import CreateProduct from "../../components/Admin/CreateProduct/CreateProduct"
// import { Link } from 'react-router-dom'
import Detail from '../DetailPage/Detail'
import CreateCategory from "../../components/Admin/CreateCategory/CreateCategory";
import Users from "../../components/Admin/Users/Users";
function AdminProfile() {
  const [auth, setAuth] = useAuth();

  return (
    <Layout>
      {/* <div className="list-group">
        <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
          Profile
        </a>
        <Link to="/profile/admin/users" className="list-group-item list-group-item-action">
          Users
        </Link>
        <Link to="/profile/admin/create-category" className="list-group-item list-group-item-action">
          Create Category
        </Link>
        <Link to="/profile/admin/create-product" className="list-group-item list-group-item-action">
          Create Product
        </Link>
        <Link to="/profile/admin/create-announcement" className="list-group-item list-group-item-action">
          Create Announcement
        </Link>
        <Link to="/profile/admin/messages" className="list-group-item list-group-item-action">
          Messages
        </Link>
      </div> */}

      <div className="admin-profile">
        <div className="admin-profile-container">
          <Tabs id="tab">
            <TabList className="tabname">
              <Tab className="tabtitle">Profile</Tab>
              <Tab className="tabtitle">Users</Tab>
              <Tab className="tabtitle">Create Category</Tab>
              <Tab className="tabtitle">Create Product</Tab>
              <Tab className="tabtitle">Create Announcement</Tab>
              <Tab className="tabtitle">Messages</Tab>
            </TabList>

            <TabPanel className="user-panel">
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

            <TabPanel className="user-panel">
              <Users/>
            </TabPanel>

            <TabPanel className="user-panel">
              <CreateCategory/>
            </TabPanel>

            <TabPanel className="user-panel">
              <CreateProduct/>
            </TabPanel>

            <TabPanel className="user-panel">
              
            </TabPanel>

            <TabPanel className="user-panel">
              
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}

export default AdminProfile;
