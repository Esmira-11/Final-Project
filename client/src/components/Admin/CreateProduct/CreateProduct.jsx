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

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [petcategories, setPetCategories] = useState([]);
  const [petcategory, setPetCategory] = useState("");
  const [size, setSize] = useState("");
  const [photo, setPhoto] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("petcategory", petcategory);
      productData.append("size", size);
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
    setSize("");
    setPhoto("");
  };

  const handleChangeSize = (event) => {
    setSize(event.target.value);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
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
  }, [categories]);

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
  }, [petcategories]);

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

          <Box className="select-box" sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Size</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={size}
                label="size"
                onChange={handleChangeSize}
              >
                <MenuItem key={0} value={"Small"}>
                  Small
                </MenuItem>
                <MenuItem key={1} value={"Medium"}>
                  Medium
                </MenuItem>
                <MenuItem key={2} value={"Large"}>
                  Large
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <div className="form-btn">
            <button type="submit" onClick={handleCreate}>
              Create
            </button>
          </div>
        </div>

        {/* <div style={{width:'150px', height:'150px'}} className="photo">
          {
            photo && (
              <img style={{width:'100%', height:'100%'}} src={URL.createObjectURL(photo)} alt="product photo" />
            )
          }
        </div> */}
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default CreateProduct;
