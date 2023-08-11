import React from 'react'
import './announcement.scss'
import Layout from '../../components/Layout'

function Announcement() {
  return (
    <>
    <Layout>
        <div className="announcement-page">
            <div className="announcement-page-container">
                <div className="announcement-page-container-top">
                    <div className="announcement-page-title">
                        <h2>ANNOUNCEMENTS</h2>
                    </div>
                    <div className="announcement-page-content">
                        <p>If you come across any pets that stand out with their collars, you can keep them safe and share their photos and related information as a post. We hope that the owners will soon be reunited with their beloved pets.</p>
                    </div>
                </div>
                <div className="announcement-page-container-center">
                    <div className="announcement-page-container-center-left">
                        <div className="filters">
                            <h3>All Posts</h3>
                        </div>
                        <div className="filters">
                            <h3>My Posts</h3>
                        </div>
                    </div>
                    <div className="announcement-page-container-center-right">
                        <button>Create New Post</button>
                    </div>
                </div>
                <div className="announcement-page-container-bottom">
                    <div className="announcement-card">
                        <div className="announcement-card-img">
                            <img src="" alt="" />
                        </div>
                        <div className="announcement-card-detail">
                            <p></p>
                        </div>
                    </div>
                    <div className="announcement-card">
                        <div className="announcement-card-img">
                            <img src="" alt="" />
                        </div>
                        <div className="announcement-card-detail">
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
    </>
  )
}

export default Announcement