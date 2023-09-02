import React, { useEffect, useState } from "react";
import "./announcement.scss";
import Layout from "../../components/Layout";
import toast, { Toaster } from "react-hot-toast";
import Avatar from "@mui/material/Avatar";
import avatar1 from "../../assets/images/avatar-2.png";
import axios from "axios";

function Announcement() {
  const [step, setStep] = useState(0);
  const [page, setpage] = useState(0);
  const [photo, setPhoto] = useState("");
  const [question, setQuestion] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [type, setType] = useState('');


  const filteredAnnouncements = async () => {
    try {
      const {data} = await axios.post("http://localhost:5000/api/announcement/announcement-filters",{
          type
      })
      setAnnouncements(data?.announcements)
      // console.log(data.announcements)
      // console.log(announcements)
    } catch (error) {
      console.log(error)
    }
  }

  const getAllAnnouncement = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/announcement/all-announcement"
      );
      setAnnouncements(data.announcement);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  // useEffect(() => {
  //   getAllAnnouncement();
  // }, []);

  
  useEffect(() => {
    if(type != ''){
      filteredAnnouncements();
    } else{
      getAllAnnouncement();
    }
  }, [type]);

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
    getAllAnnouncement();
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
    getAllAnnouncement();
  };

  //   function formatDate(dateString) {
  //     const date = new Date(dateString);

  //     const year = date.getFullYear();
  //     const month = String(date.getMonth() + 1).padStart(2, '0');
  //     const day = String(date.getDate()).padStart(2, '0');
  //     const hours = String(date.getHours()).padStart(2, '0');
  //     const minutes = String(date.getMinutes()).padStart(2, '0');

  //     return `${year}-${month}-${day} ${hours}:${minutes}`;
  //   }

  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );

    return formattedDate;
  }

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
                  <h3
                    onClick={() => {
                      setStep(0);
                      setType('')
                    }}
                  >
                    All Posts
                  </h3>
                </div>
                <div className="filters">
                <h3
                    onClick={() => {
                      setStep(0);
                      setType('question')
                    }}
                  >
                    Questions
                  </h3>
                </div>
                <div className="filters">
                <h3
                    onClick={() => {
                      setStep(0);
                      setType('found')
                    }}
                  >
                    Found
                  </h3>
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
              {step === 0 && (
                <>
                {announcements?.map(
                    (item) =>
                      item.type === "question" && (
                        <>
                          <div className="announcement-card" key={item._id}>
                            <div className="announcement-card-container">
                              <div className="user">
                                <div className="user-avatar">
                                  <Avatar className="avatar" alt="Remy Sharp" src={ '' ||`data:${item.user.avatar.contentType};base64,${item.user.avatar.data}`} />
                                </div>
                                <div className="user-name">
                                  <h3>{item.user.username}</h3>
                                </div>
                              </div>
                              <div className="question">
                                <p>{item.description}</p>
                              </div>
                              <div className="question-details">
                                <div className="date">
                                  <p>{formatDate(item.createdAt)}</p>
                                </div>
                                <div className="icon">
                                  <p>{item.comments.length} <span>replies</span></p>
                                </div>
                              </div>
                              <div className="comment-box">
                                <div className="comment-box-left">
                                <Avatar className="miniavatar" alt="Remy Sharp" src={'' || `data:image/png;base64,${item.user.avatar?.data}`}  />
                                </div>
                                <div className="comment-box-right">
                                  <input type="text" placeholder="your reply"/>
                                </div>
                                <button className="icon">
                                  <i className="fa-solid fa-comment-dots"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      )
                  )}
                {announcements?.map(
                    (item) =>
                      item.type === "found" && (
                        <>
                          <div className="announcement-card" key={item._id}>
                            <div className="announcement-card-container" >
                              <div className="user">
                                <div className="user-avatar">
                                <Avatar className="avatar" alt="Remy Sharp" src={'' || `data:${item.user.avatar.contentType};base64,${item.user.avatar.data}`}  />
                                </div>
                                <div className="user-name">
                                  <h3>{item.user.username}</h3>
                                </div>
                              </div>
                              <div className="question">
                                <p>{item.description}</p>
                              </div>
                              <div className="location">
                                <p>Location : {item.location}</p>
                              </div>
                              <div className="contactInfo">
                                <p>Contact : {item.contactInfo}</p>
                              </div>
                              <div className="announce-img">
                                <img src={`http://localhost:5000/api/announcement/announcement-photo/${item._id}`} alt="announcement-img" />
                              </div>
                              <div className="question-details">
                                <div className="date">
                                  <p>{formatDate(item.createdAt)}</p>
                                </div>
                              </div>
                              <div className="comment-box">
                                <div className="comment-box-left">
                                <Avatar className="miniavatar" alt="Remy Sharp" src={'' || `data:${item.user.avatar.contentType};base64,${item.user.avatar.data}`}  />
                                </div>
                                <div className="comment-box-right">
                                  <input type="text" placeholder="your reply"/>
                                </div>
                                <button className="icon">
                                  <i className="fa-solid fa-comment-dots"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      )
                  )}
                </>
              )}
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
                          <form
                            action=""
                            className="form"
                            onSubmit={handleCreateAnnouncement}
                          >
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
                          <form
                            action=""
                            className="form"
                            onSubmit={handleCreateQuestion}
                          >
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
                                onChange={(e) => setQuestion(e.target.value)}
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
