import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "./createcategory.scss";
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

function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState(null)
  const [updatedName, setUpdatedName] = useState("")
  const [selectedDelete, setSelectedDelete] = useState(0)

  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/category/all-categories"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/category/create-category",
        {
          name,
        }
      );
      if (data?.success) {
        toast.success(`${data.category.name} is created!`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
      console.log("Form submitted:", { name });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }

    setName("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(`http://localhost:5000/api/category/update-category/${selected._id}`,
      {name: updatedName})
      if(data.success){
        toast.success(`${updatedName} is updated`)
        setSelected(null)
        setUpdatedName("")
        setOpenEdit(false),
        getAllCategory()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const handleDelete = async(id) => {
    try {
      const {data} = await axios.delete(`http://localhost:5000/api/category/delete-category/${id}`)
      if(data.success){
        toast.success(`Category deleted`);
        setSelectedDelete(0);
        getAllCategory()
        handleClose()
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    borderRadius:'15px',
    backgroundColor:' #fffaf5',
    color:'#2f4f4f',
    boxShadow: 24,
    p: 4,
    border:'none'
  };


  return (
    <>
      <div className="create-category">
        <div className="form-section">
          <div className="form-title">
            <h3>Create new category</h3>
          </div>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Category name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>

        <TableContainer className="table" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="thead">
              <TableRow>
                <TableCell className="thcell">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <button onClick={() => {
                      setOpenEdit(true) ; 
                      setUpdatedName(row.name);
                      setSelected(row)
                      }} className="btn btn-primary">
                      Edit
                    </button>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <button className="btn btn-primary"
                     onClick={()=>{setOpen(true); setSelectedDelete(row._id)}}>Delete</button>
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
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:'center',fontSize:'20px'}}>
              Are you sure ?
            </Typography>
            <div className="btns" style={{display:'flex',justifyContent:'space-between',paddingTop:'20px'}}>
            <Button className="subbtn" onClick={handleClose} variant="text" style={{background: '#2f4f4f',color: '#fffaf5'}}>Cancel</Button>
            <Button onClick={()=>{handleDelete(selectedDelete)}} className="subbtn" variant="text" style={{background: '#2f4f4f',color: '#fffaf5'}}>Delete</Button>

            </div>
           
            
          </Box>
        </Modal>

        <Modal
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:'center',fontSize:'20px'}}>
            <form onSubmit={handleUpdate}>
                <input
                  style={{width:'80%',padding:'15px',fontSize:'17px', borderRadius:'15px',border:'none',outline:'none',background:'rgba(47, 79, 79, 0.2)'}}
                  type="text"
                  // placeholder="Category name"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                />
            </form>
            </Typography>
            <div className="btns" style={{display:'flex',justifyContent:'space-between',paddingTop:'20px'}}>
            <Button className="subbtn" onClick={handleCloseEdit} variant="text" style={{background: '#2f4f4f',color: '#fffaf5'}}>Cancel</Button>
            <Button onClick={handleUpdate} className="subbtn" variant="text" style={{background: '#2f4f4f',color: '#fffaf5'}}>Update</Button>

            </div>

          </Box>
        </Modal>
      </div>
      <Toaster position="top-right" />
    </>
  );
}

export default CreateCategory;
