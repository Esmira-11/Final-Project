import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import "./orders.scss"
import loadinggif from "../../assets/images/loading.gif";

function Orders() {
  const [userOrders, setUserOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [loading, setLoading] = useState(false);


  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://mern-project-server-oonq.onrender.com/api/order/get-user-orders")
      .then((response) => {
        setLoading(false);
        setUserOrders(response.data.orders);
      })
      .catch((error) => {
        setLoading(false);
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
    //   <div>
    //   <h2>Your Orders</h2>
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>Order ID</th>
    //         <th>Date</th>
    //         <th>Total Price</th>
    //         <th>Products</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {userOrders?.map((order) => (
    //         <tr key={order._id}>
    //           <td>{order._id}</td>
    //           <td>{new Date(order.createdAt).toLocaleDateString()}</td>
    //           <td>${order.totalPrice.toFixed(2)}</td>
    //           <td>
    //             <ul>
    //               {order.products.map((product) => (
    //                 <li key={product.product._id}>
    //                   {product.product.name} x{product.quantity}
    //                 </li>
    //               ))}
    //             </ul>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
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
        <div className="favorite-table">
        {userOrders?.length ? (
          <TableContainer className="table" component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className="thead">
                <TableRow>
                  <TableCell className="thcell">Date</TableCell>
                  <TableCell className="thcell">Total</TableCell>
                  <TableCell className="thcell">Details</TableCell>
                  {/* <TableCell className="thcell">Size</TableCell>
                  <TableCell className="thcell">Description</TableCell>
                  <TableCell className="thcell">Action</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {userOrders?.map((row) => (
                  <>
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
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
                        src={`https://mern-project-server-oonq.onrender.com/api/product/product-photo/${product.product}`}
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
        </>)}
      
    </>
  );
}

export default Orders;
