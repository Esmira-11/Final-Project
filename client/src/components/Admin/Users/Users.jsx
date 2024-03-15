import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./users.scss";
function Users() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDelete, setSelectedDelete] = useState(0);

  const handleClose = () => setOpen(false);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        "https://mern-project-server-oonq.onrender.com/api/user/all-users"
      );
      if (data?.success) {
        setUsers(data?.users);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting users");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://mern-project-server-oonq.onrender.com/api/user/delete-user/${id}`
      );
      if (data.success) {
        toast.success(`User deleted`);
        setSelectedDelete(0);
        getAllUsers();
        handleClose();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

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
      <div className="users">
        <TableContainer className="table" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="thead">
              <TableRow>
                <TableCell className="thcell">Username</TableCell>
                <TableCell className="thcell">Email</TableCell>
                <TableCell className="thcell">Role</TableCell>
                <TableCell className="thcell">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.username}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.email}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.role === 1 ? "Admin" : "User"}
                  </TableCell>
                  {/* <TableCell component="th" scope="row">
                    <button onClick={() => {
                      setOpenEdit(true) ; 
                      setUpdatedName(row.name);
                      setSelected(row)
                      }} className="btn btn-primary">
                      Edit
                    </button>
                  </TableCell> */}
                  <TableCell component="th" scope="row">
                    <button
                      className="btn btn-primary"
                      id="delete"
                      onClick={() => {
                        setOpen(true);
                        setSelectedDelete(row._id);
                      }}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

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
      </div>
    </>
  );
}

export default Users;
