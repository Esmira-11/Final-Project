import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import avatar1 from "../../assets/images/avatar-2.png";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import loadinggif from "../../assets/images/loading.gif";

function Post() {
  const [myAnnouncements, setmyAnnouncements] = useState([]);
  const [selectedDelete, setSelectedDelete] = useState(0);
  const [auth, setAuth] = useAuth();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);


  const getMyAnnouncement = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://mern-project-server-oonq.onrender.com/api/announcement/user/${auth?.user._id}`
      );
      setmyAnnouncements(data.announcements);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getMyAnnouncement();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://mern-project-server-oonq.onrender.com/api/announcement/delete-announcement/${id}`
      );
      if (data.success) {
        toast.success(`Announcement deleted`);
        setSelectedDelete(0);
        getMyAnnouncement();
        handleClose();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    borderRadius: "15px",
    backgroundColor: " #fffaf5",
    color: "#2f4f4f",
    boxShadow: 24,
    p: 4,
    border: "none",
  };

  return (
    <>
    {loading ? (
      <div
        className="loading-container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <img
          src={loadinggif}
          alt="Loading GIF"
          className="loading-gif"
          width={420}
        />
      </div>
    ) : (
      <>
      <div className="posts">
      <>
        {myAnnouncements?.map(
          (item) =>
            item.type === "question" && (
              <>
                <div className="announcement-card" key={item._id}>
                  <div className="announcement-card-container">
                    <div className="user">
                      <div className="user-left">
                        <div className="user-avatar">
                          <Avatar
                            className="avatar"
                            alt="Remy Sharp"
                            src={
                              "" ||
                              `data:${item.user.avatar.contentType};base64,${item.user.avatar.data}`
                            }
                          />
                        </div>
                        <div className="user-name">
                          <h3>{item.user.username}</h3>
                        </div>
                      </div>
                      <div
                        className="user-right"
                        onClick={() => {
                          setOpen(true);
                          setSelectedDelete(item._id);
                        }}
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </div>
                    </div>
                    <div className="question">
                      <p>{item.description}</p>
                    </div>
                    <div className="question-details">
                      <div className="date">
                        <p>{formatDate(item.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
        )}
        {myAnnouncements?.map(
          (item) =>
            item.type === "found" && (
              <>
                <div className="announcement-card">
                  <div className="announcement-card-container">
                    <div className="user">
                      <div className="user-left">
                        <div className="user-avatar">
                          <Avatar
                            className="avatar"
                            alt="Remy Sharp"
                            src={
                              "" ||
                              `data:${item.user.avatar.contentType};base64,${item.user.avatar.data}`
                            }
                          />
                        </div>
                        <div className="user-name">
                          <h3>{item.user.username}</h3>
                        </div>
                      </div>
                      <div
                        className="user-right"
                        onClick={() => {
                          setOpen(true);
                          setSelectedDelete(item._id);
                        }}
                      >
                        <i className="fa-regular fa-trash-can"></i>
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
                      <img
                        src={`https://mern-project-server-oonq.onrender.com/api/announcement/announcement-photo/${item._id}`}
                        alt="announcement-img"
                      />
                    </div>
                    <div className="question-details">
                      <div className="date">
                        <p>{formatDate(item.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                      style={{ textAlign: "center", fontSize: "20px" }}
                    >
                      Are you sure ?
                    </Typography>
                    <div
                      className="btns"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingTop: "20px",
                      }}
                    >
                      <Button
                        className="subbtn"
                        onClick={handleClose}
                        variant="text"
                        style={{ background: "#2f4f4f", color: "#fffaf5" }}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          handleDelete(selectedDelete);
                        }}
                        className="subbtn"
                        variant="text"
                        style={{ background: "#2f4f4f", color: "#fffaf5" }}
                      >
                        Delete
                      </Button>
                    </div>
                  </Box>
                </Modal>
              </>
            )
        )}
      </>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
      </>)}
    
    </>
  );
}

export default Post;
