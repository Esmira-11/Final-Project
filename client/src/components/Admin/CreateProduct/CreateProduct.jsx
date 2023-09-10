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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./createproduct.scss";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
  let navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [petcategories, setPetCategories] = useState([]);
  const [petcategory, setPetCategory] = useState("");
  const [photo, setPhoto] = useState("");

  const [open, setOpen] = useState(false);
  const [selectedDelete, setSelectedDelete] = useState(0);

  const [selectedId, setSelectedId] = useState(0);
  const [openEdit, setOpenEdit] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setupdatedDescription] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState("");
  const [updatedPetCategory, setUpdatedPetCategory] = useState("");
  const [updatedPhoto, setUpdatedPhoto] = useState("");

  const handleClose = () => setOpen(false);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleUpdate = async () => {
    try {
      const productData = new FormData();
      productData.append("name", updatedName);
      productData.append("description", updatedDescription);
      productData.append("price", updatedPrice);
      productData.append("category", updatedCategory);
      productData.append("petcategory", updatedPetCategory);
      productData.append("photo", updatedPhoto);

      const { data } = await axios.put(
        `http://localhost:5000/api/product/update-product/${selectedId}`,
        productData
      );
      console.log(data);
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
    setUpdatedName("");
    setupdatedDescription("");
    setUpdatedPrice("");
    setUpdatedCategory("");
    setUpdatedPetCategory("");
    setUpdatedPhoto("");
    handleCloseEdit();
    getAllProducts();
  };

  const getSingleProduct = async (id) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/product/get-product/${id}`
      );
      console.log(data);
      setSelectedId(data.product._id);
      setUpdatedName(data.product.name);
      setupdatedDescription(data.product.description);
      setUpdatedPrice(data.product.price);
      setUpdatedCategory(data.product.category._id);
      setUpdatedPetCategory(data.product.petcategory._id);
      // setUpdatedPhoto()
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/product/delete-product/${id}`
      );
      if (data.success) {
        toast.success(`Product deleted`);
        setSelectedDelete(0);
        getAllProducts();
        handleClose();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/product/all-products"
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("petcategory", petcategory);
      productData.append("photo", photo);

      const { data } = await axios.post(
        "http://localhost:5000/api/product/create-product",
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setPetCategory("");
    setPhoto("");
    getAllProducts();
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeUpdatedPetCategory = (event) => {
    setUpdatedPetCategory(event.target.value);
  };

  const handleChangeUpdatedCategory = (event) => {
    setUpdatedCategory(event.target.value);
  };

  const handleChangePet = (event) => {
    setPetCategory(event.target.value);
  };

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

  const getAllPetCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/petcategory/all-petcategories"
      );
      if (data?.success) {
        setPetCategories(data?.petCategory);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting petcategory");
    }
  };

  useEffect(() => {
    getAllPetCategory();
  }, []);

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
    <div className="create-product">
      <div className="form-section">
        <div className="form-container">
          <div className="form-title">
            <h3>Create new product</h3>
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

          {/* <div  className="photo">
          {
            photo && (
              <img style={{width:'100%', height:'200px'}} src={URL.createObjectURL(photo)} alt="product photo" />
            )
          }
        </div> */}

          <div className="form-group">
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <textarea
              value={description}
              placeholder="Description..."
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group price">
            <input
              type="number"
              placeholder="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <Box className="select-box" sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={handleChange}
              >
                {categories?.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box className="select-box" sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Pet Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={petcategory}
                label="PetCategory"
                onChange={handleChangePet}
              >
                {petcategories?.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <div className="form-btn">
            <button type="submit" onClick={handleCreate}>
              Create
            </button>
          </div>
        </div>
      </div>

      <div className="products">
        <TableContainer className="table" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="thead">
              <TableRow>
                <TableCell className="thcell">Name</TableCell>
                <TableCell className="thcell">Photo</TableCell>
                <TableCell className="thcell">Price</TableCell>
                <TableCell className="thcell">Category</TableCell>
                <TableCell className="thcell">Pet</TableCell>
                <TableCell className="thcell">Description</TableCell>
                <TableCell className="thcell">Action</TableCell>
                <TableCell className="thcell">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row" width={110}>
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src={`http://localhost:5000/api/product/product-photo/${row._id}`}
                      alt="product-img"
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.price}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.category?.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.petcategory?.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.description?.substring(0,40)}...
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <button
                      onClick={() => {
                        setOpenEdit(true);
                        getSingleProduct(row._id);
                      }}
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <button
                      id="delete"
                      className="btn btn-primary"
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
      </div>

      <Toaster position="top-right" />

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

      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ backgroundColor: "#fffaf5", width: "40%" }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{
              fontSize: "20px",
              backgroundColor: " rgba(45, 146, 186, 0.2)",
              padding: "15px 40px 20px",
              borderRadius: "20px",
            }}
          >
            <div className="form-section">
              <div className="form-container">
                <div
                  className="form-title"
                  style={{
                    textAlign: "center",
                    paddingBottom: "10px",
                    fontSize: "25px",
                  }}
                >
                  <h3>Update product</h3>
                </div>
                <div
                  className="upload-photo"
                  style={{
                    cursor: "pointer",
                    borderRadius: "8px",
                    backgroundColor: "rgba(47, 79, 79, 0.2)",
                    padding: "10px",
                  }}
                >
                  <label>
                    {updatedPhoto ? updatedPhoto.name : "Upload photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setUpdatedPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                  {/* <div  className="photo">
                        {
                          updatedPhoto ? updatedPhoto.name : (
                            <img style={{width:'100%', height:'200px'}} src={`http://localhost:5000/api/product/product-photo/${selectedId}`} alt="product photo" />
                          )
                        }
                    </div> */}
                </div>
                <div className="form-group" style={{ paddingTop: "8px" }}>
                  <input
                    type="text"
                    placeholder="name"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    style={{
                      cursor: "pointer",
                      width: "100%",
                      padding: "15px",
                      fontSize: "17px",
                      border: "none",
                      outline: "none",
                      background: "rgba(47, 79, 79, 0.2)",
                      borderRadius: "8px",
                      color: "#2f4f4f",
                    }}
                  />
                </div>

                <div className="form-group" style={{ paddingTop: "8px" }}>
                  <textarea
                    value={updatedDescription}
                    placeholder="Description..."
                    onChange={(e) => setupdatedDescription(e.target.value)}
                    style={{
                      cursor: "pointer",
                      width: "100%",
                      padding: "15px",
                      fontSize: "17px",
                      border: "none",
                      outline: "none",
                      background: "rgba(47, 79, 79, 0.2)",
                      borderRadius: "8px",
                      color: "#2f4f4f",
                    }}
                  />
                </div>

                <div className="form-group price">
                  <input
                    type="number"
                    placeholder="price"
                    value={updatedPrice}
                    onChange={(e) => setUpdatedPrice(e.target.value)}
                    style={{
                      cursor: "pointer",
                      width: "100%",
                      padding: "15px",
                      fontSize: "17px",
                      border: "none",
                      outline: "none",
                      background: "rgba(47, 79, 79, 0.2)",
                      borderRadius: "8px",
                      color: "#2f4f4f",
                      // paddingTop: "3px",
                    }}
                  />
                </div>

                <Box
                  className="select-box"
                  sx={{ minWidth: 120, marginTop: "10px", borderRadius: "8px" }}
                >
                  <FormControl
                    fullWidth
                    style={{
                      background: "rgba(47, 79, 79, 0.2)",
                      borderRadius: "8px",
                      border: "none",
                      outline: "none",
                    }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={updatedCategory}
                      label="Category"
                      onChange={handleChangeUpdatedCategory}
                    >
                      {categories?.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box
                  className="select-box"
                  sx={{ minWidth: 120, marginTop: "10px", borderRadius: "8px" }}
                >
                  <FormControl
                    fullWidth
                    style={{
                      background: "rgba(47, 79, 79, 0.2)",
                      borderRadius: "8px",
                      border: "none",
                      outline: "none",
                    }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Pet Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={updatedPetCategory}
                      label="PetCategory"
                      onChange={handleChangeUpdatedPetCategory}
                    >
                      {petcategories?.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

              </div>
            </div>
            <div
              className="btns"
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "20px",
              }}
            >
              <button
                type="submit"
                onClick={handleUpdate}
                style={{
                  padding: "13px",
                  fontSize: "18px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "700",
                  borderRadius: "8px",
                  background: "#2f4f4f",
                  color: "#fffaf5",
                  transition: "background-color 0.3s ease",
                }}
              >
                Update
              </button>
              <button
                onClick={handleCloseEdit}
                style={{
                  padding: "13px",
                  fontSize: "18px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "700",
                  borderRadius: "8px",
                  background: "#2f4f4f",
                  color: "#fffaf5",
                  transition: "background-color 0.3s ease",
                }}
              >
                Cancel
              </button>
              {/* <Button className="subbtn" onClick={handleCloseEdit} variant="text" style={{background: '#2f4f4f',color: '#fffaf5'}}>Cancel</Button>
            <Button onClick={handleUpdate} className="subbtn" variant="text" style={{background: '#2f4f4f',color: '#fffaf5'}}>Update</Button> */}
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default CreateProduct;
