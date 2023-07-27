import React from 'react'
import './team.scss'
import member1 from '../../assets/images/member-1.png'
import member2 from '../../assets/images/member-2.png'
import member3 from '../../assets/images/member-3.png'
import member4 from '../../assets/images/member-4.png'

function Team() {
  return (
    <div className="team-section">
        <div className="team-section-title">
            <h3>Team Members</h3>
        </div>
        <div className="team-section-content">
            <h2>Our Team at <span>Your Service</span></h2>
        </div>
        <div className="team-section-cards">
            <div className="team-section-cards-box">
                <div className="team-section-card">
                    <div className="team-section-card-top">
                        <img src={member1} alt="member-1" />
                    </div>
                    <div className="team-section-card-bottom">
                        <div className="team-section-card-bottom-name">
                            <h3>Jackson Web</h3>
                        </div>
                        <div className="team-section-card-bottom-content">
                            <p>Team Manager</p>
                        </div>
                    </div>
                </div>
                <div className="team-section-card">
                    <div className="team-section-card-top">
                        <img src={member2} alt="member-2" />
                    </div>
                    <div className="team-section-card-bottom">
                        <div className="team-section-card-bottom-name">
                            <h3>Noah Alows</h3>
                        </div>
                        <div className="team-section-card-bottom-content">
                            <p>Founder and CEO</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="team-section-cards-box">
                <div className="team-section-card">
                    <div className="team-section-card-top">
                        <img src={member3} alt="member-3" />
                    </div>
                    <div className="team-section-card-bottom">
                        <div className="team-section-card-bottom-name">
                            <h3>Monica Burke</h3>
                        </div>
                        <div className="team-section-card-bottom-content">
                            <p>Campaign Coordinator</p>
                        </div>
                    </div>
                </div>
                <div className="team-section-card">
                    <div className="team-section-card-top">
                        <img src={member4} alt="member-4" />
                    </div>
                    <div className="team-section-card-bottom">
                        <div className="team-section-card-bottom-name">
                            <h3>Lucas Marry</h3>
                        </div>
                        <div className="team-section-card-bottom-content">
                            <p>Assistant</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Team