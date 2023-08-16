import React from "react";
import Layout from "../../components/Layout";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Card from "../../components/Card/Card";
import './userprofile.scss'
import avatar from "../../assets/images/avatar-3.png"
import { useAuth } from "../../context/auth";

function UserProfile() {
  const [auth, setAuth] = useAuth();

  return (
    <Layout>
      <div className="user-profile">
        <div className="user-profile-container">
          <Tabs id='tab'>
            <TabList className='tabname'>
              <Tab className='tabtitle'>Profile</Tab>
              <Tab className='tabtitle'>Favorites</Tab>
            </TabList>

            <TabPanel className='user-panel'>
                <div className="user-detail-container">
                    <div className="user-detail" width='100%' height='100%'>
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
            <TabPanel className='user-panel'>
              <div className="user-favorites" width='100%' height='100%'>
                {/* <div className="cards"> */}
                    <Card/>
                {/* </div> */}
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}

export default UserProfile;
