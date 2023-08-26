import React, { useEffect, useState } from "react";
import "./announcement.scss";
import Layout from "../../components/Layout";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";


function Announcement() {
  const [step, setStep] = useState(0);
  const [page, setpage] = useState(0);
  const [photo, setPhoto] = useState("");
  const [question, setQuestion] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");


  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("location", location);
      productData.append("description", description);
      productData.append("contactInfo", contact);
      productData.append("photo", photo);

      const { data } = await axios.post(
        "http://localhost:5000/api/announcement/create-announcement",
        productData
      );
      if (data?.success) {
        toast.success("Product Created Successfully");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
    setLocation("");
    setDescription("");
    setContact("");
    setPhoto("");
    setStep(0);
    // getAllProducts();
  };


  const handleCreateQuestion = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/announcement/create-question",
        { description: question }
      );
      if (data?.success) {
        toast.success("Question Created Successfully");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
    setQuestion("");
    setStep(0);
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
                          <form action="" className="form" onSubmit={handleCreateAnnouncement}>
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
                                  onChange={(e) => setPhoto(e.target.files[0])}
                                  hidden
                                />
                              </label>
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                placeholder="Where the pet was found"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                              />
                            </div>

                            <div className="form-group">
                              <textarea
                                style={{
                                  height: "170px",
                                  resize: "vertical",
                                  fontSize: "18px",
                                }}
                                value={description}
                                placeholder="Please write more detailed information. This can make it easier for the owner to find the pet"
                                onChange={(e) => setDescription(e.target.value)}
                              />
                            </div>

                            <div className="form-group">
                              <input
                                type="text"
                                placeholder="Contact info"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
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
                          <form action="" className="form" onSubmit={handleCreateQuestion}>
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
                                value={question}
                                placeholder="Question..."
                                onChange={(e) => setQuestion(e.target.value)}                              />
                            </div>
                            <div className="form-btn">
                              <button onClick={prevStep}>Previous</button>
                              <button type="submit" >Create</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Layout>
      <Toaster position="bottom-right" />
    </>
  );
}

export default Announcement;
