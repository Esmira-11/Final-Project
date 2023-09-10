import React, { useEffect, useState } from 'react'
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
import axios from 'axios'

function Orders() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        axios
          .get("http://localhost:5000/api/order/get-all-orders")
          .then((response) => {
            setOrders(response.data.orders);
          })
          .catch((error) => {
            console.error("Failed to fetch user orders");
          });
      }, []);

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
        borderRadius: "15px",
        backgroundColor: " #fffaf5",
        color: "#2f4f4f",
        boxShadow: 24,
        width:"500px",
        p: 4,
        border: "none",
      };

  return (
    <>
    <div className="favorite-table">
        {orders?.length ? (
          <TableContainer className="table" component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className="thead">
                <TableRow>
                  <TableCell className="thcell">Username</TableCell>
                  <TableCell className="thcell">User Email</TableCell>
                  <TableCell className="thcell">Date</TableCell>
                  <TableCell className="thcell">Total</TableCell>
                  <TableCell className="thcell">Details</TableCell>
                  {/* <TableCell className="thcell">Size</TableCell>
                  <TableCell className="thcell">Description</TableCell>
                  <TableCell className="thcell">Action</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.map((row) => (
                  <>
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                         <TableCell component="th" scope="row">
                        {row.user.username}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.user.email}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {formatDate(row.createdAt)}
                      </TableCell>

                      <TableCell component="th" scope="row">
                        {row.totalPrice}
                      </TableCell>

                      <TableCell component="th" scope="row">
                        <button
                          id="details"
                          className="btn btn-primary orderbtn"
                          onClick={() => {setSelectedOrder(row);handleOpen();}}
                          // onClick={() => {
                          //   removeFromFavorites(row.product._id);
                          // }}
                        >
                          All Details
                        </button>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <h4>Your Orders Box Empty</h4>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {selectedOrder && (
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ textAlign: "center", fontSize: "20px" }}
            >
              <div className="more-details">
                <div className="more-details-content" style={{textAlign:'left'}}>
                  <p>Total Price: {selectedOrder.totalPrice}</p> 
                  <p>Country: {selectedOrder.shippingDetails?.country}</p>
                  <p>City: {selectedOrder.shippingDetails?.city}</p>
                  <p>Street: {selectedOrder.shippingDetails?.street}</p>
                  <p>Zip Code: {selectedOrder.shippingDetails?.zipcode}</p> 
                </div>
                <hr />
                <div className="shipping-products">
                  <h3 style={{fontWeight:700, paddingBottom:'10px'}}>Ordered Products:</h3>
                  <ul>
                    {selectedOrder.products?.map((product) => (
                      <li key={product.product._id}>
                        <img
                        style={{width:'50px', height:'50px'}}
                        src={`http://localhost:5000/api/product/product-photo/${product.product}`}
                        alt="shop-item-img"
                        />
                        {product.product.name} x{product.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Typography>
            <div
              className="btns"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems:'center',
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
            </div>
          </Box>
         )} 
      </Modal>
    </>
  )
}

export default Orders