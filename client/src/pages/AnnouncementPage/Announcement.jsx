import React, { useEffect, useState } from "react";
import "./announcement.scss";
import Layout from "../../components/Layout";

function Announcement() {
  const [step, setStep] = useState(0);
  const [page, setpage] = useState(0);
  const [photo, setPhoto] = useState("");

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

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
                <p>
                  If you come across any pets that stand out with their collars,
                  you can keep them safe and share their photos and related
                  information as a post. We hope that the owners will soon be
                  reunited with their beloved pets. Or if you have a question
                  about your favorite animal, you can share it as a post. So you
                  can connect with other users
                </p>
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
                <button
                  onClick={() => {
                    setStep(1);
                  }}
                >
                  Create New Post
                </button>
              </div>
            </div>
            <div
              className="announcement-page-container-bottom"
              style={{ paddingBottom: "70px" }}
            >
              {/* <div className="announcement-card">
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
                    </div> */}
              {step === 1 && (
                <>
                  <div className="announce-type-page">
                    <div className="announce-type-page-container">
                      <div className="announce-type-head">
                        <h2>Choose Announcement Type</h2>
                      </div>
                      <div className="btns">
                        <button
                          className="announce-type"
                          onClick={() => {
                            nextStep();
                            setpage(1);
                          }}
                        >
                          Found
                        </button>
                        <button
                          className="announce-type"
                          onClick={() => {
                            nextStep();
                            setpage(2);
                          }}
                        >
                          Question
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  {page === 1 && (
                    <>
                      <div className="announce-form">
                        <div className="announce-form-container">
                          <form action="" className="form">
                            <div className="form-title">
                              <h3>Create Announcement</h3>
                            </div>

                            <div className="upload-photo">
                              <label>
                                {photo ? photo.name : "Upload photo"}
                                <input
                                  type="file"
                                  name="photo"
                                  accept="image/*"
                                  //   onChange={(e) => setPhoto(e.target.files[0])}
                                  hidden
                                />
                              </label>
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                placeholder="Where the pet was found"
                                // value={name}
                                // onChange={(e) => setName(e.target.value)}
                              />
                            </div>

                            <div className="form-group">
                              <textarea
                                style={{
                                  height: "170px",
                                  resize: "vertical",
                                  fontSize: "18px",
                                }}
                                // value={description}
                                placeholder="Please write more detailed information. This can make it easier for the owner to find the pet"
                                // onChange={(e) => setDescription(e.target.value)}
                              />
                            </div>

                            <div className="form-group">
                              <input
                                type="text"
                                placeholder="Contact info"
                                // value={name}
                                // onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                            <div className="form-btn">
                              <button onClick={prevStep}>Previous</button>
                              <button type="submit">Create</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </>
                  )}
                  {page === 2 && (
                    <>
                      <div className="announce-form">
                        <div className="announce-form-container">
                          <form action="" className="form">
                            <div className="form-title">
                              <h3>Please enter your question about your pet</h3>
                            </div>
                            <div className="form-group">
                              <textarea
                                style={{
                                  height: "200px",
                                  resize: "vertical",
                                  fontSize: "20px",
                                }}
                                // value={description}
                                placeholder="Question..."
                                // onChange={(e) => setDescription(e.target.value)}
                              />
                            </div>
                            <div className="form-btn">
                              <button onClick={prevStep}>Previous</button>
                              <button type="submit">Create</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </>
                  )}
                  {/* <h2>Found Pet Form</h2>
                        <button onClick={prevStep}>Previous</button>
                        <button onClick={nextStep}>Next</button> */}
                </>
              )}
              {step === 3 && (
                <>
                  <div>
                    <h2>Question Form</h2>
                    <button onClick={prevStep}>Previous</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Announcement;
