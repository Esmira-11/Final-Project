import React, { useEffect, useState } from "react";
import toast,{ Toaster }  from "react-hot-toast";
import axios from "axios";
import "./createcategory.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/category/all-categories"
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, [categories]);

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

        {/* <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((item) => (
              <>
                <tr
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    color: "#2f4f4f",
                  }}
                >
                  <td style={{ fontSize: "20px" }} key={item._id}>
                    {item.name}
                  </td>
                  <td style={{ paddingTop: "5px" }}>
                    <button
                      style={{
                        background: "#d5e5e9",
                        color: "#2f4f4f",
                        border: "none",
                      }}
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table> */}

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
                  <button
                      className="btn btn-primary"
                    >
                      Edit
                  </button>
                  </TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
      </div>
      <Toaster position="top-right"/>
      
    </>
  );
}

export default CreateCategory;
